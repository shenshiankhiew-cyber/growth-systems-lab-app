import { GoogleGenAI } from "@google/genai";
import { AuditSubmission, ContentIdea } from "../types";

const GEMINI_MODEL = "gemini-3-flash-preview";

export const getAuditAnalysis = async (submission: AuditSubmission): Promise<Partial<AuditSubmission>> => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return {
      healthScore: 42,
      leaks: [
        { id: '1', issue: "Speed to lead > 12h", priority: 'Critical', fix: "Implement automated follow-up" },
        { id: '2', issue: "No qualification step", priority: 'High', fix: "Add Typeform/Survey filter" }
      ],
      quickWins: ["Setup instant auto-responder", "Add 2 client logos to thank you page"],
      contentIdeas: ["Why response time is the silent killer", "Qualification as a positioning tool"],
      consultingOpportunity: "Full funnel rebuilding for higher-ticket conversion."
    };
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `
    You are a Growth Strategy Expert. Analyze this funnel audit submission.
    
    Offer: ${submission.offer}
    Audience: ${submission.audience}
    Lead Sources: ${submission.leadSources}
    Post-Submission Process: ${submission.postSubmission}
    Response Time: ${submission.responseTime}
    Qualification: ${submission.qualification}
    Sales Process: ${submission.salesProcess}
    Conversion Rate: ${submission.conversionRate}
    Post-Purchase: ${submission.postPurchase}
    Drop-off Points: ${submission.dropOffPoints}

    Provide a JSON response with:
    - healthScore: number (0-100)
    - leaks: list of { id, issue, priority, fix } (priority: Critical, High, Medium)
    - quickWins: list of strings (immediate tactical changes)
    - contentIdeas: list of 3 strings (based on this audit)
    - consultingOpportunity: a one-line consulting upsell idea
  `;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      healthScore: 0,
      leaks: [{ id: 'err', issue: "Analysis failed", priority: 'Medium', fix: "Check AI link" }]
    };
  }
};

export const generateContentIdeas = async (topic: string): Promise<ContentIdea[]> => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return [{
      id: Math.random().toString(),
      title: "Sample Idea",
      pillar: "Growth Systems",
      hook: "Why most marketers fail at systems...",
      mainPoint: "Systems over tactics.",
      breakdown: "1. Map logic. 2. Automate. 3. Optimize.",
      example: "A funnel that prints money.",
      cta: "Join the lab.",
      platforms: ["LinkedIn", "Instagram"],
      languages: ["English", "Mandarin"]
    }];
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `
    Generate 3 distinct content ideas for a growth strategist based on the topic: "${topic}".
    For each idea, provide:
    - title
    - pillar (Conversion systems, Human behavior, Marketing vs sales funnel, etc.)
    - hook (compelling first line)
    - mainPoint (the core lesson)
    - breakdown (step-by-step or points)
    - example (real world scenario)
    - cta (call to action)
    - platforms (array: LinkedIn, Instagram, TikTok, etc.)
    - languages (array: English, Mandarin)
    
    Return as JSON array of objects.
  `;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    
    const raw = JSON.parse(response.text || "[]");
    return raw.map((r: any) => ({ ...r, id: Math.random().toString() }));
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};
