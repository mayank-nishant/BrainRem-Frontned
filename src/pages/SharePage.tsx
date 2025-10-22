import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface SharedContent {
  id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function SharePage() {
  const { hash } = useParams<{ hash: string }>();
  const [contents, setContents] = useState<SharedContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!hash) {
      setError("Invalid share link");
      setLoading(false);
      return;
    }

    const fetchSharedContent = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/share/${hash}`);
        setContents(response.data.content || []);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load shared content");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedContent();
  }, [hash]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading shared content..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Content Not Found
          </h3>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.href = "/"}
            className="btn-primary"
          >
            Go to BrainRem
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Shared Knowledge Collection
            </h1>
            <p className="text-gray-600">
              Explore this curated collection of learning content
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {contents.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No content available
            </h3>
            <p className="text-gray-600">
              This collection doesn't have any content to share yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {contents.map((content, index) => (
              <Card 
                key={`${content.title}-${index}`}
                type={content.type} 
                link={content.link} 
                title={content.title}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Powered by{" "}
              <a 
                href="/" 
                className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200"
              >
                BrainRem
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}