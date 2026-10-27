import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocFromServer,
  Firestore,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with specific database ID (CRITICAL: skill mandate)
export const db: Firestore = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Google Auth Provider with Meet scopes
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/meetings.space.created');
provider.addScope('https://www.googleapis.com/auth/meetings.space.readonly');
provider.setCustomParameters({ prompt: 'select_account' });

// In-memory token cache for Google APIs
let cachedAccessToken: string | null = null;
let isSigningIn = false;

// User Profile & Role Types
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
  role: 'teacher' | 'admin' | 'super_admin';
  membershipStatus: 'free_preview' | 'active' | 'expired';
  createdAt?: string;
  updatedAt?: string;
}

// Test Firestore connection on boot (Mandated by Firebase Skill)
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firebase connection verified');
    return true;
  } catch (error: any) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or network restricted');
    }
    return false;
  }
}

// Error Handler adhering to FirestoreErrorInfo schema (Mandated by Firebase Skill)
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((p) => ({
        providerId: p.providerId,
        email: p.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Synchronizes user profile with Firestore and resolves server-enforced role and membership.
 * Founder email (amabrouk971@gmail.com) is automatically verified as super_admin.
 */
export async function syncUserProfile(user: FirebaseUser): Promise<UserProfile> {
  const isFounder = user.email?.toLowerCase() === 'amabrouk971@gmail.com';
  const userRef = doc(db, 'users', user.uid);

  try {
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const data = snap.data();
      const profile: UserProfile = {
        id: user.uid,
        email: user.email || '',
        name: user.displayName || data.name || (isFounder ? 'Dr Ahmed Mabrouk' : 'Teacher'),
        photoURL: user.photoURL || undefined,
        role: isFounder ? 'super_admin' : (data.role || 'teacher'),
        membershipStatus: isFounder ? 'active' : (data.membershipStatus || 'free_preview'),
        createdAt: data.createdAt,
        updatedAt: new Date().toISOString(),
      };

      // If founder, ensure admin document exists
      if (isFounder) {
        const adminRef = doc(db, 'admins', user.uid);
        await setDoc(adminRef, {
          email: user.email,
          role: 'super_admin',
          verifiedAt: new Date().toISOString(),
        }, { merge: true }).catch(() => {});
      }

      return profile;
    } else {
      // First-time registration
      const newProfile: UserProfile = {
        id: user.uid,
        email: user.email || '',
        name: user.displayName || (isFounder ? 'Dr Ahmed Mabrouk' : 'Teacher'),
        photoURL: user.photoURL || undefined,
        role: isFounder ? 'super_admin' : 'teacher',
        membershipStatus: isFounder ? 'active' : 'free_preview',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await setDoc(userRef, newProfile);

      if (isFounder) {
        const adminRef = doc(db, 'admins', user.uid);
        await setDoc(adminRef, {
          email: user.email,
          role: 'super_admin',
          verifiedAt: new Date().toISOString(),
        }, { merge: true }).catch(() => {});
      }

      return newProfile;
    }
  } catch (err) {
    console.warn('Profile sync fallback (offline/initialization):', err);
    // Safe graceful fallback
    return {
      id: user.uid,
      email: user.email || '',
      name: user.displayName || (isFounder ? 'Dr Ahmed Mabrouk' : 'Teacher'),
      photoURL: user.photoURL || undefined,
      role: isFounder ? 'super_admin' : 'teacher',
      membershipStatus: isFounder ? 'active' : 'free_preview',
    };
  }
}

// Auth listeners and methods
export const initAuth = (
  onAuthSuccess?: (user: FirebaseUser, token: string | null) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
    if (user) {
      if (onAuthSuccess) {
        onAuthSuccess(user, cachedAccessToken);
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: FirebaseUser; accessToken: string | null } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential?.accessToken) {
      cachedAccessToken = credential.accessToken;
    }
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
      console.log('Sign-in popup closed by user');
      return null;
    }
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
  cachedAccessToken = null;
};
