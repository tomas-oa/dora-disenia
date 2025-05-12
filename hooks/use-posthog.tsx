"use client";

import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider, usePostHog } from "posthog-js/react";
import { Suspense, useEffect } from "react";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY as string;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST as string;

export function PosthogContextProvider({
  children,
  disabled,
}: { children: React.ReactNode; disabled?: boolean }) {
  useEffect(() => {
    if (disabled) return;

    posthog.init(POSTHOG_KEY, {
      api_host: "/ingest",
      ui_host: POSTHOG_HOST,
      person_profiles: "always",
    });

    return () => {
      posthog.reset();
    };
  }, [disabled]);

  return (
    <PostHogProvider client={posthog}>
      <SuspensePosthogPageView />
      {children}
    </PostHogProvider>
  );
}

function PosthogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;

      if (String(searchParams)) {
        url = `${url}?${String(searchParams)}`;
      }

      posthog.capture("$pageview", { $current_url: url });
    }

    return () => {
      posthog.reset();
    };
  }, [pathname, posthog, searchParams]);

  return null;
}

function SuspensePosthogPageView() {
  return (
    <Suspense fallback={null}>
      <PosthogPageView />
    </Suspense>
  );
}
