"use client";

import UploadImageModal from "@/features/documents/components/upload-image-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <UploadImageModal />
    </>
  );
};
