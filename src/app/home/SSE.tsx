import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const BlogSSE: React.FC = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const eventSource = new EventSource("/api/getAll");

    eventSource.onmessage = (event) => {
      const blogs = JSON.parse(event.data);

      // Update React Query cache
      queryClient.setQueryData(["blogs"], blogs);
      //queryClient.invalidateQueries({queryKey: ["blogs"]});
    };

    eventSource.onerror = () => {
      console.error("SSE connection error");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [queryClient]);

  return null; // No UI; runs in the background
};

export default BlogSSE;
