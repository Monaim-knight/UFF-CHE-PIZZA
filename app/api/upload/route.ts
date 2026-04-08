import { getCurrentAdmin } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";

const UPLOADS_DIR = "public/uploads";
const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

function safeFilename(originalName: string): string {
  const ext = path.extname(originalName) || ".jpg";
  const base = path.basename(originalName, ext).replace(/[^a-zA-Z0-9-_]/g, "_").slice(0, 40);
  return `${Date.now()}-${base}${ext}`;
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Please log in to the admin panel first, then try uploading again." }, { status: 401 });
    }

    let file: File;
    try {
      const formData = await request.formData();
      file = formData.get("file") as File;
      if (!file || !(file instanceof File)) {
        return NextResponse.json(
          { error: "No file selected. Please choose an image." },
          { status: 400 }
        );
      }
    } catch {
      return NextResponse.json(
        { error: "Invalid form data" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large (max 10MB)" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only images allowed (JPEG, PNG, WebP, GIF)" },
        { status: 400 }
      );
    }

    const filename = safeFilename(file.name);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Use Vercel Blob when token is set (e.g. on Vercel)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`uploads/${filename}`, buffer, {
        access: "public",
        contentType: file.type,
      });
      return NextResponse.json({ url: blob.url });
    }

    // Otherwise save to public/uploads (local or any host with writable disk)
    const dir = path.join(process.cwd(), UPLOADS_DIR);
    const filepath = path.join(dir, filename);
    await mkdir(dir, { recursive: true });
    await writeFile(filepath, buffer);
    const url = `/uploads/${filename}`;
    return NextResponse.json({ url });
  } catch (err) {
    console.error("Upload error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Upload failed: ${message}. If you're on Vercel, add BLOB_READ_WRITE_TOKEN in Project Settings → Environment Variables (enable Blob in Storage).` },
      { status: 500 }
    );
  }
}
