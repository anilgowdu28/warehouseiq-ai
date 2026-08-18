import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8787;
const client = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;
const model = process.env.OPENAI_MODEL || "gpt-5.6-luna";

const system = `You are WarehouseIQ, an AI warehouse operations manager.
You analyze the provided warehouse state and answer operational questions.
You must be decisive, practical and concise.
When there is a shortage, prioritize urgent/SLA-critical orders and explain the tradeoff.
Never claim an action was executed unless the application explicitly says it was executed.
Return plain text suitable for a small dashboard chat panel.`;

app.get("/api/health", (_req,res)=>res.json({ok:true, aiConfigured:Boolean(client), model}));

app.post("/api/ai", async (req,res)=>{
  const {message, warehouse} = req.body || {};
  if(!message) return res.status(400).json({error:"message is required"});

  if(!client){
    return res.json({
      answer:"Demo AI mode: connect an OpenAI API key in server/.env to enable live WarehouseIQ intelligence. Based on the current data, prioritize ORD-1006, address Picking Zone B, and replenish low-stock SKUs."
    });
  }

  try {
    const input = `${system}

WAREHOUSE STATE:
${JSON.stringify(warehouse, null, 2)}

USER QUESTION:
${message}`;

    const response = await client.responses.create({
      model,
      input,
      reasoning: { effort: "low" },
      text: { verbosity: "medium" }
    });

    res.json({answer: response.output_text});
  } catch (error) {
    console.error(error);
    res.status(500).json({error:"AI request failed", detail:error?.message || "Unknown error"});
  }
});

app.listen(port, ()=>console.log(`WarehouseIQ AI server running on http://localhost:${port}`));
