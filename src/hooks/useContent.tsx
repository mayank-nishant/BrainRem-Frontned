import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Content {
  id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
  createdAt?: string;
  updatedAt?: string;
}

export function useContent() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function refresh() {
    setLoading(true);
    setError(null);
    
    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContents(response.data.content || []);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to fetch content:", err);
        setError(err.response?.data?.message || "Failed to load content");
        setContents([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    refresh();
    
    // Refresh every 30 seconds instead of 10 seconds to reduce server load
    let interval = setInterval(() => {
      refresh();
    }, 30 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { contents, refresh, loading, error };
}
