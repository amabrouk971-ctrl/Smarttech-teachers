# Authentication, Authorization (RBAC) & Security Hardening Plan

Comprehensive architectural specification for implementing verified Google Authentication, robust Role-Based Access Control (RBAC), subscription-based feature gating, and Firestore security rules hardening for SmartTech Teacher Academy—preserving the clean 100% Light Mode design.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following parameters have been confirmed based on your responses:

- **Admin & SEO Authorization**: Exclusively restricted to founder email (`amabrouk971@gmail.com`) and Firestore `/admins/{uid}` document. All unauthorized users receive an accredited 403 Access Denied interface with a direct return path.
- **Curriculum & AI Tool Gating**: Module 1 (Lessons 1–5) is free preview for all signed-in educators. Modules 2 and 3 (Lessons 6–15) and advanced live tools require active membership (`50 EGP/month` or `250 EGP/year`).
- **Visitor Experience**: Public discovery is frictionless (browsing Articles, Public Catalog, Pricing). Attempting any protected action displays a branded, high-conversion Google Auth modal that preserves the user's exact current context and resumes post-login.
- **Theme Posture**: Strictly 100% Light Mode across all modals, paywalls, and security screens.

---

## 1. Overview & Core Concept

- **What It Does**: Transforms the platform from disconnected client state into an enterprise-grade, secure educational portal. Authenticates teachers via Google Firebase Auth, securely synchronizes user profiles and subscriptions in Firestore, enforces role checks across views and API endpoints, and gates advanced Cambridge-aligned ELT lessons behind active subscriptions.
- **Target Audience**: 
  1. *Super Admin / Founder* (`amabrouk971@gmail.com`): Full administrative rights, SEO Command Center, cPanel exports, user role assignment.
  2. *Active Teachers*: Full access to all 15 lessons across 3 modules, voice simulators, interactive student coaching, and Google Meet integration.
  3. *Free Preview Teachers*: Access to Module 1 (Lessons 1–5), diagnostic CEFR quiz, public articles, and introductory simulation.
  4. *Public Guests*: Full access to 10 comprehensive SEO articles, schema markup, and transparent pricing.
- **Key Value**: Guarantees zero unauthorized access to administrative controls, prevents client-side membership spoofing, and creates a clear conversion funnel from free preview to paid subscription.

---

## 2. User Experience & Visual Design (100% Light Mode)

### Key User Flows

```
[Guest Visitor]
      │
      ├─► Browses Articles Hub, Article Details, Pricing ─────────► Public (No Auth Required)
      │
      ├─► Clicks "Start Module 1 Lesson" or "AI Simulator" ───────► Triggers Auth Modal
      │                                                                  │
      │                                                      [Signs in with Google]
      │                                                                  │
      ▼                                                                  ▼
[Authenticated Teacher] ◄────────────────────────────────────────────────┘
      │
      ├─► Module 1 Lessons (1–5) & CEFR Diagnostic ───────────────► Free Access Unlocked
      │
      ├─► Clicks Module 2/3 (Lessons 6–15) or Pro Lab ───────────► Displays Subscription Paywall
      │                                                                  │
      │                                                      [Selects Plan: Fawry/Vodafone]
      │                                                                  │
      ▼                                                                  ▼
[Active Paid Subscriber] ◄───────────────────────────────────────────────┘
      │
      └─► Full 15 Lessons + Voice AI + Google Meet Mentoring

[Non-Admin Access to /admin or /seo] ─────────────────────────────► Clean 403 Security Screen
```

### Visual Identity & Theme Tokens
- **Backgrounds**: Pure crisp light mode (`bg-white` and `bg-slate-50`).
- **Typography**: Dark slate (`text-slate-900` for headings, `text-slate-600` for body).
- **Brand Accents**: SmartTech Crimson Red (`bg-red-600`, `text-red-600`, `border-red-200`).
- **Badges**:
  - Super Admin: Red & Gold Shield Badge (`bg-red-100 text-red-800 border-red-300`).
  - Active Subscriber: Emerald Verification Pill (`bg-emerald-50 text-emerald-700 border-emerald-200`).
  - Free Preview: Slate Badge (`bg-slate-100 text-slate-700 border-slate-200`).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Persistent Firestore Profile Sync on Every Login**
  - *Chosen Approach*: On `onAuthStateChanged`, query `/users/{uid}`. If it doesn't exist, create it with role `teacher` (or `super_admin` if email is `amabrouk971@gmail.com`) and default membership status. If it exists, retrieve verified server-side role and membership status.
  - *Why*: Prevents tampering via browser DevTools or localStorage, and allows founder to manually upgrade teachers in Firestore.
  - *Alternatives Considered*: Client-only state (unsecure) or hardcoded token claims (inflexible).

- **Decision 2: Seamless Context-Preserving Modal vs. Full Page Redirect**
  - *Chosen Approach*: Lightweight, elegant Google Sign-In modal in light mode that overlays the current screen, triggers `signInWithPopup`, updates auth state, and closes automatically.
  - *Why*: Drastically lowers bounce rate and prevents disrupting the teacher's lesson or article reading flow.

- **Decision 3: Module-Based Gating with In-Place Upgrade Flow**
  - *Chosen Approach*: Module 1 is completely accessible to allow educators to experience the CELTA curriculum quality; clicking Modules 2 or 3 displays a clean lock card explaining what is unlocked upon subscription (audio exercises, micro-teaching rubrics, downloadable print edition).
  - *Why*: Proven freemium model for educational platforms in Egypt and Arab markets.

---

## 4. Technical Architecture & Security Strategy

### Architecture & Component Security Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                         Client Application (React)                      │
├────────────────────────────────────────────────────────────────────────┤
│  Auth Context & Hook (useAuth)                                         │
│   ├── firebase.auth.onAuthStateChanged                                │
│   ├── User State: { uid, email, displayName, role, membershipStatus }  │
│   └── Actions: signInWithGoogle(), signOutUser(), openAuthModal()      │
│                                                                        │
│  Navigation & Route Guards                                             │
│   ├── Public: Home, Articles, ArticleDetail, Pricing                   │
│   ├── Free Preview Guard: Curriculum Module 1, Sample Simulators       │
│   ├── Subscription Guard: Curriculum Modules 2–3, Pro Labs             │
│   └── Admin Guard: Admin Dashboard, SEO Command Center                 │
└──────────────────┬─────────────────────────────────┬───────────────────┘
                   │                                 │
                   ▼                                 ▼
┌───────────────────────────────────┐  ┌─────────────────────────────────┐
│     Firebase Authentication       │  │      Cloud Firestore DB         │
├───────────────────────────────────┤  ├─────────────────────────────────┤
│ • Google Identity Provider        │  │ • /users/{uid}                  │
│ • Secure OAuth Credential         │  │ • /admins/{uid}                 │
│ • Token refresh management        │  │ • /payments/{id}                │
│                                   │  │ • /articles/{id}                │
└───────────────────────────────────┘  └────────────────┬────────────────┘
                                                        │
                                                        ▼
                                       ┌─────────────────────────────────┐
                                       │    firestore.rules (Hardened)   │
                                       ├─────────────────────────────────┤
                                       │ • isOwner(uid)                  │
                                       │ • isAdmin() check via email     │
                                       │   and /admins/{uid} doc         │
                                       │ • Immutable role fields         │
                                       │ • Read-only catalog rules       │
                                       └─────────────────────────────────┘
```

### Firestore Security Rules Hardening
1. **Users Collection (`/users/{userId}`)**:
   - `allow get`: Owner or Admin.
   - `allow list`: Admin only.
   - `allow create`: Owner (cannot self-assign `role: 'super_admin'` or `membershipStatus: 'active'` unless email matches `amabrouk971@gmail.com`).
   - `allow update`: Owner (prevent modifying `role` or `membershipStatus` keys via `affectedKeys()`), or Admin.
2. **Admin Documents (`/admins/{userId}`)**:
   - Strictly read-only to existing admins; write allowed only by founder.
3. **Payments Collection (`/payments/{paymentId}`)**:
   - Signed-in user can create a payment transaction referencing their own `userId`. Admin can review and verify payment.

### Implementation Phases
1. **Phase 1: Auth Service & User Profile Store**
   - Enhance `src/services/firebase.ts` with complete profile synchronization (`syncUserProfile`), error handling, and role listeners.
2. **Phase 2: Context & Modal Implementation**
   - Create `src/components/auth/AuthModal.tsx` with light-mode branding, Dr. Mabrouk badge, and Google Sign-In button.
   - Implement route authorization guards (`ProtectedRoute`, `AdminGuard`, `SubscriptionGuard`).
3. **Phase 3: Curriculum & Simulator Gating**
   - Connect `CurriculumView.tsx` to actual `membershipStatus` state: Module 1 accessible to all; Modules 2 and 3 gated by subscription paywall modal.
   - Protect `AdminView.tsx` and `SeoCommandCenter.tsx` with verified admin checks.
4. **Phase 4: Security Rules Deployment & Verification**
   - Update `firestore.rules` with strict RBAC rules.
   - Deploy rules via `DeployRules` RPC action.
   - Verify unit tests and build compilation.
