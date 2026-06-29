/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to get lazy initialized Gemini client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in the environment. Please configure it in your Secrets panel.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// API Health route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// API Reflection Route
app.post("/api/reflect", async (req, res) => {
  try {
    const { user_profile, daily_log, lang } = req.body;

    if (!user_profile || !daily_log) {
      return res.status(400).json({ error: "Missing user_profile or daily_log in request body." });
    }

    const ai = getGeminiClient();

    let promptLanguageDirective = "";
    if (lang === "zh") {
      promptLanguageDirective = `

---

## 6. Language Instructions (CRITICAL)
The user has set the language to CHINESE (中文).
You MUST generate ALL natural language strings, names, descriptions, and lists in simplified Chinese (简体中文).
Specifically:
- 'coach_feedback_msg' must be written in professional, encouraging, system-thinking simplified Chinese (about 150-200 Chinese characters).
- 'biometric_insights.blood_sugar_stability_status' must be in Chinese (e.g., '稳定', '波动', '崩溃').
- 'biometric_insights.stress_energy_correlation' must be in Chinese.
- 'biometric_insights.micronutrient_gap_detected' must be a list of Chinese strings (e.g., '镁 (来自菠菜)', '铬 (来自全麦食物)').
- 'tomorrow_adaptive_plan.timing_optimization' must be in Chinese.
- 'tomorrow_adaptive_plan.cooking_mode' must be in Chinese (e.g., '标准模式', '抗炎抗皮质醇模式', '胰岛素增敏模式').
- 'tomorrow_adaptive_plan.mandatory_food_swaps' must have 'original', 'swap_to', and 'reason' written in Chinese.
- All items in the 'alerts' array must be written in Chinese. For example, if the Negative Boundary Rule was triggered: '纯油脂预算赤字 [X] 份。肉类分配已被锁定以保护精益肌肉量！触发安全警报！'.
Do NOT return English descriptions for these fields.
`;
    }

    // Build the prompt for Gemini detailing standard values, loose-mode deconstruction, and rules A, B, C
    const systemPrompt = `
You are the Diet Execution & Reflection Agent, the core intelligence of a "Life OS" ecosystem, acting as an expert digital nutritionist and behavioral psychologist.
Your job is to ingest user health profiles, track their daily food execution (Strict/Loose modes), map physical/psychological feedback, and generate an adaptive, data-driven evening reflection report.

---

## 1. Input Specifications (Data Ingestion)
The user has provided their health profile & plan, and today's daily execution log.
Standard calorie values for servings:
- 1 Veg serving = 25 kcal
- 1 Fruit serving = 60 kcal
- 1 Low-Fat Milk serving = 120 kcal
- 1 Whole Grain serving = 70 kcal
- 1 Meat serving = 75 kcal
- 1 Pure Oil serving = 45 kcal

---

## 2. Core Execution & Deconstruction Logic (Loose Mode Only)
If \`execution_mode\` is "Loose", you must act as a food deconstructor to convert the logged meal texts into equivalent serving deductions using these penalty-based mapping rules:

1. **Bakery/Bread:**
- Hard Bread (Baguette/Plain Bagel 35g) = Deduct 1 Whole Grain.
- Soft Bread (White Toast/Brioche 35g) = Deduct 1 Whole Grain, Deduct 0.5 Pure Oil.
- Pastry/Fruit Bread (Croissant/Red Bean Bun) = Deduct 1.5 Whole Grain, Deduct 0.5 Fruit, Deduct 1.5 Pure Oil.

2. **Ice Cream:**
- Premium/Gelato (80-100g) = Deduct 1.5 Whole Grain (or Fruit), Deduct 1 Low-Fat Milk, Deduct 2.5 Pure Oil.
- Fruit Popsicle = Deduct 1.5 Fruit.
- Low-Cal/High-Protein Ice Cream = Deduct 0.5 Whole Grain, Deduct 1 Low-Fat Meat, Deduct 0.5 Pure Oil.

3. **The Negative Boundary Rule (CRITICAL):**
If any macro allowance drops below zero (e.g., Pure Oil becomes -1.5 due to ice cream), **NEVER** deduct it from the Meat/Protein allocation. Keep Meat locked to preserve muscle, and generate a clear alert in the response's alerts array (e.g., "Pure Oil budget deficit of [X] servings. Meat allocation locked to protect lean mass! Alert triggered!").

---

## 3. Psychological & Physiological Diagnostic Rules (Reflection Engine)
Every evening, analyze the correlation between the \`meals\` feelings and the \`end_of_day_state\` using these cognitive loops:

- **Rule A (Blood Sugar Rollercoaster):** If \`post_meal_feel\` contains "sluggish_somnolent" or "sugar_craving" consecutively -> Diagnose as high-GI glucose crash. Action: Recommend substituting next day's grains with Chromium-rich foods (Oats, Buckwheat, Broccoli-Beef) to stabilize insulin. Add a specific mandatory food swap in tomorrow_adaptive_plan.
- **Rule B (Cortisol & Calorie Gap):** If \`pre_meal_feel\` shows "emotional_craving" combined with "anxious/irritable" mood, and calorie deficit is aggressive (-500kcal) -> Diagnose as diet fatigue/high cortisol. Action: Initiate a "Soft Cushioning" strategy for tomorrow. Shrink the deficit gap slightly (decrease tomorrow's plan calorie deficit, which means adding some budget back, e.g., +100 or +150kcal) and relocate 0.5 fruit servings to 3:00 PM as a legitimate snack. Mention this in tomorrow_adaptive_plan.
- **Rule C (Micronutrient Deficit Check):** If \`body_signals\` contains "muscle_cramps" or "poor_sleep" -> Cross-check Veg/Fruit intake. Action: Pin Magnesium/Potassium-rich foods (Spinach, Beet Greens, Bananas, Avocado) to the top of tomorrow's recommendation list. Specify this in the tomorrow_adaptive_plan.mandatory_food_swaps or timing_optimization.

---

## 4. Instructions for Strict Mode
If \`execution_mode\` is "Strict", the user checks in meals (each meal's \`is_checked\` field indicates if it was consumed). 
- If a meal has \`is_checked: true\`, it means the planned portion of that meal is fully consumed. Portion distribution: Breakfast 25%, Lunch 35%, Dinner 30%, Snack 10% of baseline servings.
- If a meal has \`is_checked: false\` or undefined, it was not consumed (actual intake is 0).
- Remaining servings are calculated by subtracting the actual consumed servings from the baseline. Keep planned calories and actual calories updated accordingly.

---

## 5. Output JSON Requirements
Generate the reflection report strictly conforming to the specified JSON schema.
Ensure your \`coach_feedback_msg\` is supportive, system-thinking, exactly or around 150 words, encouraging, and uses Life OS terminology.
Include an 'alerts' array with strings if the Negative Boundary Rule was triggered or any other critical warning occurs.
${promptLanguageDirective}
`;

    const userPrompt = `
Here is the User's Profile & Plan:
${JSON.stringify(user_profile, null, 2)}

Here is the Daily Execution Log:
${JSON.stringify(daily_log, null, 2)}

Analyze this data. Perform food deconstruction if mode is "Loose". Apply the Negative Boundary Rule if any serving drops below 0. Apply Rules A, B, and C as necessary to diagnose issues and form tomorrow's adaptive plan. Return the response in perfect JSON.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        { role: "user", parts: [{ text: systemPrompt + "\n\n" + userPrompt }] }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            daily_balance_sheet: {
              type: Type.OBJECT,
              properties: {
                planned_calories: { type: Type.INTEGER, description: "Planned baseline calories" },
                actual_calories_estimated: { type: Type.INTEGER, description: "Total estimated actual calories consumed" },
                macro_deviations: {
                  type: Type.OBJECT,
                  properties: {
                    carb_g_diff: { type: Type.NUMBER, description: "Carbs deviation in grams (actual - planned)" },
                    protein_g_diff: { type: Type.NUMBER, description: "Protein deviation in grams (actual - planned)" },
                    fat_g_diff: { type: Type.NUMBER, description: "Fat deviation in grams (actual - planned)" }
                  },
                  required: ["carb_g_diff", "protein_g_diff", "fat_g_diff"]
                },
                remaining_servings_carried_over: {
                  type: Type.OBJECT,
                  properties: {
                    vegetables: { type: Type.NUMBER, description: "Remaining vegetable servings" },
                    fruits: { type: Type.NUMBER, description: "Remaining fruit servings" },
                    whole_grains: { type: Type.NUMBER, description: "Remaining whole grain servings" },
                    meat: { type: Type.NUMBER, description: "Remaining meat/protein servings" },
                    pure_oil: { type: Type.NUMBER, description: "Remaining pure oil servings (can be negative if over budget, but must NOT trigger Meat deduction)" },
                    low_fat_milk: { type: Type.NUMBER, description: "Remaining milk servings" }
                  },
                  required: ["vegetables", "fruits", "whole_grains", "meat", "pure_oil"]
                }
              },
              required: ["planned_calories", "actual_calories_estimated", "macro_deviations", "remaining_servings_carried_over"]
            },
            biometric_insights: {
              type: Type.OBJECT,
              properties: {
                blood_sugar_stability_status: { type: Type.STRING, description: "e.g., Stable, Volatile, Crash" },
                stress_energy_correlation: { type: Type.STRING, description: "Life OS psychological and stress correlation" },
                micronutrient_gap_detected: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["blood_sugar_stability_status", "stress_energy_correlation", "micronutrient_gap_detected"]
            },
            tomorrow_adaptive_plan: {
              type: Type.OBJECT,
              properties: {
                calorie_deficit_adjustment: { type: Type.INTEGER, description: "Deficit change in kcal for tomorrow" },
                mandatory_food_swaps: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      original: { type: Type.STRING },
                      swap_to: { type: Type.STRING },
                      reason: { type: Type.STRING }
                    },
                    required: ["original", "swap_to", "reason"]
                  }
                },
                timing_optimization: { type: Type.STRING },
                cooking_mode: { type: Type.STRING }
              },
              required: ["calorie_deficit_adjustment", "mandatory_food_swaps", "timing_optimization", "cooking_mode"]
            },
            coach_feedback_msg: { type: Type.STRING, description: "System-thinking coaching message around 150 words." },
            alerts: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["daily_balance_sheet", "biometric_insights", "tomorrow_adaptive_plan", "coach_feedback_msg"]
        }
      }
    });

    const reportText = response.text;
    if (!reportText) {
      throw new Error("No response text received from Gemini.");
    }

    const reportJson = JSON.parse(reportText);
    res.json(reportJson);

  } catch (error: any) {
    console.error("Error generating Evening Reflection Report:", error);
    res.status(500).json({
      error: error.message || "An error occurred while generating your reflection report. Please make sure your GEMINI_API_KEY is configured."
    });
  }
});

// Setup Vite & static serving
async function main() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server loaded as middleware.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production assets from dist/.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on host 0.0.0.0, port ${PORT}`);
  });
}

main().catch(err => {
  console.error("Failed to start server:", err);
});
