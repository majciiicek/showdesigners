"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/gtm";

export default function ReferenceViewTracker({
  title,
  type,
}: {
  title: string;
  type: string;
}) {
  useEffect(() => {
    trackEvent("reference_detail_view", {
      reference_title: title,
      reference_type: type,
    });
  }, [title, type]);

  return null;
}
