"use client";

import { useState } from "react";
import { ImageUploader } from "./ImageUploader";

type Props = {
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};

export function ImageUrlField({
  label = "Image URL",
  defaultValue = "",
  placeholder = "https://... or /image.jpg",
}: Props) {
  const [url, setUrl] = useState(defaultValue);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-300">{label}</label>
      <input
        type="url"
        name="imageUrl"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-700 bg-slate-950/50 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
      />
      <div className="pt-1">
        <p className="mb-1 text-xs text-slate-500">Or upload an image (URL will be filled in):</p>
        <ImageUploader onUpload={setUrl} label="" />
      </div>
    </div>
  );
}
