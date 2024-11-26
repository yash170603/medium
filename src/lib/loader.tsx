"use client"
import { useIsFetching } from "@tanstack/react-query";

export default function LoadingIndicator() {
  const isFetching = useIsFetching();

  return (
    isFetching > 0 && (
      <div className="fixed top-0 left-0 w-full bg-blue-500 h-1 z-50">
        <div className="h-full bg-white animate-pulse"></div>
      </div>
    )
  );
}
