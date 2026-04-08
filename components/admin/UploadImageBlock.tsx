"use client";

import { ImageUploader } from "./ImageUploader";

export function UploadImageBlock() {
  return (
    <ImageUploader
      onUpload={(url) => {
        navigator.clipboard.writeText(url).then(() => {
          alert("Image uploaded! URL copied to clipboard. Paste it in the menu item's Image URL field.");
        });
      }}
      label=""
    />
  );
}
