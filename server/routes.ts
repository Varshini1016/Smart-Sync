import multer from "multer";
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

const upload = multer({
  dest: "server/uploads/",
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ✅ PLACE IT HERE
  app.post("/api/upload", upload.single("file"), async (req: any, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      console.log("Uploaded file:", req.file.filename);

      res.json({
        success: true,
        message: "File uploaded successfully",
        file: req.file,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Upload failed" });
    }
  });

  // ✅ Keep this at the bottom
  return httpServer;
}


