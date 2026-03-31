"use client";

import { useEffect, useMemo, useRef } from "react";

interface Props {
  src: string;
  title: string;
  className?: string;
}

// Parent-side postMessage bridge to hand a bearer token to the SGCC app when cookies are blocked
// in cross-site iframes. The child iframe is expected to listen for `SGCC_AUTH_TOKEN`.
const SGCC_ORIGIN = "https://sgcc.newsmaker.id";
const PUBLIC_TOKEN = process.env.NEXT_PUBLIC_SGCC_EMBED_TOKEN;

export function SgccIframe({ src, title, className }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Pull token from localStorage (portal-managed) or optional public env var for testing.
  const token = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    return window.localStorage.getItem("SGCC_AUTH_TOKEN") ?? PUBLIC_TOKEN ?? undefined;
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const postToken = () => {
      if (!token || !iframe.contentWindow) return;
      iframe.contentWindow.postMessage({ type: "SGCC_AUTH_TOKEN", token }, SGCC_ORIGIN);
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== SGCC_ORIGIN) return;
      if (event.data?.type === "SGCC_REQUEST_AUTH") {
        postToken();
      }
    };

    window.addEventListener("message", handleMessage);
    iframe.addEventListener("load", postToken);

    // Best effort initial send in case the iframe is ready immediately.
    postToken();

    return () => {
      window.removeEventListener("message", handleMessage);
      iframe.removeEventListener("load", postToken);
    };
  }, [token]);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title}
      className={className}
      allow="clipboard-read; clipboard-write; fullscreen"
      // Intentionally no sandbox/credentialless; we want SGCC to keep its own auth state.
    />
  );
}

