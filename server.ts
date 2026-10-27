import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json({ limit: '25mb' }));

// Shared server-side Gemini client
const getGeminiClient = () => {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// 1. Text-to-Speech (gemini-3.8-flash-tts)
app.post('/api/ai/tts', async (req, res) => {
  try {
    const { text, speaker = 'Kore' } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required for TTS' });
    }

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: text,
              speechMetadata: {
                style: 'Professional, articulate educational instructor and mentor',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: speaker },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      throw new Error('No audio returned by TTS model');
    }

    res.json({
      success: true,
      audioBase64: base64Audio,
      mimeType: 'audio/wav',
    });
  } catch (err: any) {
    console.error('TTS Error:', err?.message || err);
    res.status(500).json({
      error: 'Failed to synthesize speech',
      details: err?.message || String(err),
    });
  }
});

// 2. Audio Transcription (gemini-3.5-transcribe)
app.post('/api/ai/transcribe', async (req, res) => {
  try {
    const { audioBase64, mimeType = 'audio/webm' } = req.body;
    if (!audioBase64) {
      return res.status(400).json({ error: 'Audio data is required' });
    }

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType,
              data: audioBase64,
            },
          },
          {
            text: 'Transcribe this spoken teacher statement accurately. Retain the exact words, language (Arabic or English), and punctuation.',
          },
        ],
      },
    });

    res.json({
      success: true,
      transcription: response.text || '',
    });
  } catch (err: any) {
    console.error('Transcription Error:', err?.message || err);
    res.status(500).json({
      error: 'Failed to transcribe audio',
      details: err?.message || String(err),
    });
  }
});

// 3. Student Coaching Studio (gemini-4-argon with thinkingLevel: HIGH)
app.post('/api/ai/coaching', async (req, res) => {
  try {
    const { subject, stage, studentProfile, observedDifficulty, learningGoal, language = 'ar' } = req.body;
    if (!observedDifficulty) {
      return res.status(400).json({ error: 'Observed difficulty is required' });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are a Senior Educational Psychologist and Master Teacher Development Specialist at SmartTech Teacher Academy (founded by Dr Ahmed Mabrouk).
Your goal is to formulate a deeply structured, empathetic, non-diagnostic student support plan for a classroom teacher.
Never invent psychological, medical, or psychiatric diagnoses (e.g. ADHD, Autism) - focus strictly on pedagogical scaffolding, cognitive understanding, differentiated instruction, and classroom strategies.
Respond in the teacher's selected language: ${language === 'ar' ? 'العربية (Arabic)' : 'English'}.

Structure the response with clear, elegant markdown sections:
1. **تشخيص الموقف التربوي والملاحظات التحليلية (Pedagogical Analysis & Observations)**
2. **استراتيجيات التدريس المتمايز الموصى بها (Differentiated Teaching Strategies)**
3. **نشاط تدريسي علاجي وتطبيقي مقترح (Actionable Scaffolding Activity)**
4. **حوار تدريسي نموذجي بين المعلم والطالب (Sample Teacher-Student Dialogue)**
5. **مؤشرات قياس التقدم والفهم (Formative Progress Measures)**
6. **خطة المتابعة المستمرة (Continuous Review Plan)**`;

    const userPrompt = `Subject: ${subject || 'عام'}
Educational Stage: ${stage || 'المرحلة الابتدائية'}
Student Learning Profile: ${studentProfile || 'طالب يعاني من تردد وصعوبة في استيعاب المفهوم الأساسي'}
Observed Difficulty / Misconception: ${observedDifficulty}
Target Learning Goal: ${learningGoal || 'إتقان المفهوم وتطبيق المهارة باستقلالية وثقة'}

Provide the comprehensive pedagogical support plan using high thinking.`;

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-4-argon',
        contents: userPrompt,
        config: {
          systemInstruction,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          },
        },
      });
    } catch (argonErr: any) {
      console.warn('gemini-4-argon fallback to gemini-3.8-flash:', argonErr?.message);
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
        },
      });
    }

    res.json({
      success: true,
      supportPlan: response.text || '',
    });
  } catch (err: any) {
    console.error('Coaching Plan Generation Error:', err?.message || err);
    res.status(500).json({
      error: 'Failed to generate coaching plan',
      details: err?.message || String(err),
    });
  }
});

// 4. Interactive Student Roleplay & Speaking Practice
app.post('/api/ai/roleplay', async (req, res) => {
  try {
    const { persona, subject, stage, scenarioContext, conversationHistory, teacherMessage, language = 'ar' } = req.body;
    if (!teacherMessage) {
      return res.status(400).json({ error: 'Teacher message is required' });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are simulating a realistic student in a classroom at SmartTech Teacher Academy.
Student Persona: "${persona}" (e.g., shy, distracted, struggling, advanced, resisting help, mixed ability).
Subject: "${subject}". Stage: "${stage}".
Context: "${scenarioContext}".
Language: ${language === 'ar' ? 'العربية' : 'English'}.

You must return a JSON response with two objects:
1. "studentReply": A realistic, authentic student response reflecting this persona's cognitive state and feelings.
2. "pedagogicalEvaluation": An expert evaluation of what the teacher said:
   - "clarityScore": 0-100
   - "empathyScore": 0-100
   - "pacingScore": 0-100
   - "strengths": 1-2 positive teaching techniques used
   - "growthTip": A concrete suggestion to improve the intervention
   - "suggestedAlternative": An optimal teacher phrase for this moment.`;

    const formattedHistory = (conversationHistory || [])
      .map((m: any) => `${m.role === 'teacher' ? 'Teacher' : 'Student'}: ${m.text}`)
      .join('\n');

    const prompt = `Classroom history:
${formattedHistory}

Teacher just said:
"${teacherMessage}"

Generate the student's authentic reaction and the pedagogical evaluation in JSON format:
{
  "studentReply": "string",
  "pedagogicalEvaluation": {
    "clarityScore": number,
    "empathyScore": number,
    "pacingScore": number,
    "strengths": ["string"],
    "growthTip": "string",
    "suggestedAlternative": "string"
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({ success: true, ...parsed });
  } catch (err: any) {
    console.error('Roleplay Error:', err?.message || err);
    res.status(500).json({
      error: 'Failed to process roleplay step',
      details: err?.message || String(err),
    });
  }
});

// 5. AI Content Agent (Cairo timezone publisher & draft writer)
app.post('/api/ai/content-agent', async (req, res) => {
  try {
    const { topic, subject, targetAudience, language = 'ar' } = req.body;
    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are the Lead Editorial AI Content Agent for SmartTech Teacher Academy (teaches.smart-courses.org), guided by Dr Ahmed Mabrouk.
Produce an original, high-impact, actionable professional development article for teachers.
Ensure real pedagogical depth, realistic classroom examples, and search engine optimization.
Respond in strict JSON with:
{
  "title": "string (catchy & professional)",
  "slug": "string (kebab-case)",
  "seoTitle": "string (45-65 chars)",
  "metaDescription": "string (125-155 chars)",
  "category": "string",
  "excerpt": "string (1-2 sentences)",
  "content": "string (comprehensive markdown article with headings H2, H3, bullet points, teacher tips)",
  "targetKeyword": "string",
  "suggestedTags": ["string"],
  "estimatedReadTimeMinutes": number
}`;

    const prompt = `Topic: ${topic}
Subject: ${subject || 'تطوير المعلمين'}
Audience: ${targetAudience || 'معلمي المدارس في الشرق الأوسط ومصر'}
Language: ${language === 'ar' ? 'Arabic' : 'English'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({ success: true, article: parsed });
  } catch (err: any) {
    console.error('Content Agent Error:', err?.message || err);
    res.status(500).json({
      error: 'Failed to generate article draft',
      details: err?.message || String(err),
    });
  }
});

// 6. Google Meet Space Creator (Workspace Integration)
app.post('/api/meet/create-space', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing OAuth access token' });
    }
    const token = authHeader.split(' ')[1];

    const meetRes = await fetch('https://meet.googleapis.com/v2/spaces', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        config: {
          accessType: 'OPEN',
        },
      }),
    });

    if (!meetRes.ok) {
      const errText = await meetRes.text();
      throw new Error(`Google Meet API error (${meetRes.status}): ${errText}`);
    }

    const meetData = await meetRes.json();
    res.json({
      success: true,
      space: meetData,
      meetingUri: meetData.meetingUri,
      meetingCode: meetData.meetingCode,
    });
  } catch (err: any) {
    console.error('Google Meet error:', err?.message || err);
    res.status(500).json({
      error: 'Failed to create Google Meet space',
      details: err?.message || String(err),
    });
  }
});

// 7. Science / Bioscience Knowledge Hub (PubChem / UniProt / PubMed search)
app.get('/api/science/protein', async (req, res) => {
  try {
    const query = String(req.query.q || 'hemoglobin').trim();
    // Query UniProt public REST API
    const uniProtRes = await fetch(
      `https://rest.uniprot.org/uniprotkb/search?query=${encodeURIComponent(query)}&size=3&format=json`
    );
    if (!uniProtRes.ok) {
      throw new Error(`UniProt API responded with ${uniProtRes.status}`);
    }
    const data = await uniProtRes.json();
    const results = (data.results || []).map((entry: any) => ({
      primaryAccession: entry.primaryAccession,
      uniProtkbId: entry.uniProtkbId,
      proteinName: entry.proteinDescription?.recommendedName?.fullName?.value || 'Protein',
      organism: entry.organism?.scientificName || 'Homo sapiens',
      functionComment: entry.comments?.find((c: any) => c.commentType === 'FUNCTION')?.texts?.[0]?.value || 'Biological function',
      alphaFoldUrl: `https://alphafold.ebi.ac.uk/entry/${entry.primaryAccession}`,
      rcsbPdbUrl: `https://www.rcsb.org/structure/${entry.uniProtkbId}`,
    }));

    res.json({ success: true, query, results });
  } catch (err: any) {
    console.error('Science API Error:', err?.message || err);
    res.status(500).json({
      error: 'Failed to query scientific protein database',
      details: err?.message || String(err),
    });
  }
});

// 8. Dynamic Sitemap Generator for SEO (/sitemap.xml)
app.get('/sitemap.xml', async (req, res) => {
  const host = req.get('host') || 'teaches.smart-courses.org';
  const baseUrl = `https://${host}`;

  const articleSlugs = [
    'practical-english-teachers-essential-classroom-phrases',
    'how-teachers-improve-classroom-english-step-by-step',
    'english-classroom-management-instructions-engagement',
    'how-to-explain-lessons-in-english-examples-questions',
    'english-phrases-checking-understanding-giving-feedback',
    'english-parent-teacher-communication-meetings-reports',
    'english-online-teaching-virtual-classroom-language',
    'pronunciation-listening-practice-teachers-clear-speech',
    'professional-english-teachers-meetings-emails-collaboration',
    'practical-english-learning-plan-teachers-egypt',
  ];

  const staticUrls = [
    '',
    '/curriculum',
    '/articles',
    ...articleSlugs.map((s) => `/articles/${s}`),
    '/pricing',
    '/scenarios',
    '/science-lab',
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls
  .map(
    (path) => `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${path.startsWith('/articles/') ? 'monthly' : 'weekly'}</changefreq>
    <priority>${path === '' ? '1.0' : path.startsWith('/articles/') ? '0.9' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// 9. Standard robots.txt for Search Crawlers
app.get('/robots.txt', (req, res) => {
  const host = req.get('host') || 'teaches.smart-courses.org';
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://${host}/sitemap.xml
`);
});

// 10. SEO & Content API Endpoints
app.get('/api/articles', async (req, res) => {
  try {
    const { COMPLETE_ARTICLES } = await import('./src/data/articlesData');
    res.json({ success: true, count: COMPLETE_ARTICLES.length, articles: COMPLETE_ARTICLES });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to load articles', details: err?.message });
  }
});

app.get('/api/articles/:slug', async (req, res) => {
  try {
    const { COMPLETE_ARTICLES } = await import('./src/data/articlesData');
    const art = COMPLETE_ARTICLES.find((a: any) => a.slug === req.params.slug);
    if (!art) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json({ success: true, article: art });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to find article', details: err?.message });
  }
});

// 11. cPanel PHP/MySQL Production Code & Schema Export
app.get('/api/export/cpanel-info', (req, res) => {
  res.json({
    appName: 'SmartTech Teacher Academy',
    productionDomain: 'https://teaches.smart-courses.org',
    databaseType: 'MySQL 8.0+ / MariaDB',
    targetPhpVersion: 'PHP 8.2+',
    serverLocation: 'cPanel / Cloud Linux',
    schemaFile: '/database/schema.sql',
    setupSteps: [
      '1. Create MySQL Database and User in cPanel MySQL Database Wizard',
      '2. Import /database/schema.sql into phpMyAdmin',
      '3. Update database credentials in app/config/database.php',
      '4. Upload application files to public_html or subdomain directory',
      '5. Configure SSL certificate via cPanel AutoSSL (Let\'s Encrypt)',
      '6. Setup cron job in cPanel for AI Content Agent: 0 9 * * * php /home/user/app/cron/publish.php'
    ]
  });
});

// Start Dev Server with Vite middleware in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`SmartTech Teacher Academy server running on http://localhost:${port}`);
  });
}

startServer();
