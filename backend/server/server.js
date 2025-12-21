import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json({ limit: "2mb" }));

app.use(
  cors({
    origin: "*", 
  })
);

const PORT = process.env.PORT || 8787;

const SUBMISSIONS_ROOT = path.join(__dirname, "..", "submissions");
fs.mkdirSync(SUBMISSIONS_ROOT, { recursive: true });
console.log(`📁 Submissions directory: ${SUBMISSIONS_ROOT}`);

const newId = () => Math.random().toString(36).slice(2, 10);
const dirFor = (id) => path.join(SUBMISSIONS_ROOT, id);

/**
 * POST /api/cover-letter
 *
 * Expected body:
 * {
 *   "name": "Your Name",                // required
 *   "email": "you@example.com",         // optional
 *   "role": "Job title",                // optional
 *   "skills": ["React", "Node", ...],   // optional
 *   "projects": [                       // optional
 *      { "title": "Proj 1", "desc": ".." },
 *      { "title": "Proj 2", "desc": ".." }
 *   ],
 *   "jobDescription": "Full JD text",   // required
 *   "extraNotes": "Anything else"       // optional
 * }
 */
app.post("/api/cover-letter", (req, res) => {
  try {
    const body = req.body || {};

    const {
      name,
      email,
      role,
      skills,
      projects,
      jobDescription,
      extraNotes,
    } = body;

    // Basic validation
    if (!name || !jobDescription) {
      return res.status(400).json({
        ok: false,
        error: "Both 'name' and 'jobDescription' are required.",
      });
    }

    const id = newId();
    const dir = dirFor(id);
    fs.mkdirSync(dir, { recursive: true });

    const normalizedSkills = Array.isArray(skills)
      ? skills
      : typeof skills === "string"
      ? skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const payload = {
      id,
      createdAt: new Date().toISOString(),
      name: name || "",
      email: email || "",
      role: role || "",
      skills: normalizedSkills,
      projects: Array.isArray(projects) ? projects : [],
      jobDescription: jobDescription || "",
      extraNotes: extraNotes || "",
      coverLetter: null,
    };

    const dataPath = path.join(dir, "data.json");
    fs.writeFileSync(dataPath, JSON.stringify(payload, null, 2), "utf8");

    console.log(`✅ Saved cover letter input with id: ${id}`);

    return res.json({
      ok: true,
      id,
      data: payload,
    });
  } catch (err) {
    console.error("✗ Error in POST /api/cover-letter:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

app.get("/api/cover-letter/:id", (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ ok: false, error: "Missing id parameter" });
    }

    const dir = dirFor(id);
    const dataPath = path.join(dir, "data.json");

    if (!fs.existsSync(dataPath)) {
      return res
        .status(404)
        .json({ ok: false, error: "Submission not found for this id" });
    }

    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

    return res.json({ ok: true, data });
  } catch (err) {
    console.error("✗ Error in GET /api/cover-letter/:id:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
});

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "cover-letter-backend",
    pid: process.pid,
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Submissions directory: ${SUBMISSIONS_ROOT}`);
  console.log(`✅ Ready to accept cover letter inputs (no AI yet)\n`);
});