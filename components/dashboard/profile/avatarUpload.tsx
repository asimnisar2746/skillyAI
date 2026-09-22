"use client";

import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";

export function AvatarUploader({ initialImage }: { initialImage?: string }) {
  const { update } = useSession();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(initialImage);
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-avatar", {
      method: "POST",
      body: formData,
    });

    setIsUploading(false);

    if (!res.ok) {
      alert("Failed to upload image. Please try again.");
      setPreview(initialImage);
      return;
    }

    const data = await res.json();
    setPreview(data.url);
    await update({ image: data.url });
    router.refresh();
  }

  return (
    <div className="h-24 w-24 relative">
      <div className="h-24 w-24 bg-foreground/30 rounded-full overflow-hidden relative">
        {preview ? (
          <Image
            src={preview}
            alt="Profile picture"
            fill
            className="object-cover"
          />
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="absolute right-0 bottom-0 bg-primary rounded-full p-1.5 cursor-pointer text-white size-8 flex items-center justify-center"
      >
        {isUploading ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          <Camera className="size-5" />
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
