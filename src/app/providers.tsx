// app/providers.tsx
"use client";

import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/context/authProvider";
import QueryclientProvider from "@/lib/queryClientProvider";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
 

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
    NProgress.configure({ showSpinner: true });
  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    // Start NProgress when pathname or searchParams change
    handleStart();
    handleStop();

    return () => {
      NProgress.done();
    };
  }, [pathname, searchParams]);

  return (
    <AuthProvider>
      <Toaster />
      <QueryclientProvider>{children}</QueryclientProvider>
    </AuthProvider>
  );
}
