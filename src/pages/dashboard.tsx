import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);
  const [shareError, setShareError] = useState("");
  const [filter, setFilter] = useState<"all" | "youtube" | "twitter">("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { contents, refresh, loading, error } = useContent();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }
    refresh();
  }, [modalOpen, navigate, refresh]);

  const handleShare = async () => {
    setShareLoading(true);
    setShareError("");
    
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        {
          share: true,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      
      const shareUrl = `${window.location.origin}/share/${response.data.hash}`;
      
      if (navigator.share) {
        await navigator.share({
          title: "My BrainRem Collection",
          text: "Check out my knowledge collection!",
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("Share link copied to clipboard!");
      }
    } catch (err: any) {
      setShareError(err.response?.data?.message || "Failed to create share link");
    } finally {
      setShareLoading(false);
    }
  };

  const filteredContents = contents.filter(content => 
    filter === "all" || content.type === filter
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-72">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Knowledge Hub</h1>
                <p className="text-sm sm:text-base text-gray-600">Organize and share your learning content</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="hidden sm:flex space-x-3">
                <Button
                  onClick={handleShare}
                  variant="outline"
                  text="Share"
                  startIcon={<ShareIcon />}
                  loading={shareLoading}
                  size="sm"
                />
                <Button
                  onClick={() => setModalOpen(true)}
                  variant="primary"
                  text="Add"
                  startIcon={<PlusIcon />}
                  size="sm"
                />
              </div>
              
              {/* Mobile buttons */}
              <div className="flex sm:hidden space-x-1">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  title="Share Collection"
                >
                  <ShareIcon />
                </button>
                <button
                  onClick={() => setModalOpen(true)}
                  className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
                  title="Add Content"
                >
                  <PlusIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Filter Tabs */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit overflow-x-auto">
              {[
                { key: "all", label: "All" },
                { key: "youtube", label: "YouTube" },
                { key: "twitter", label: "Twitter" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key as any)}
                  className={`px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    filter === key
                      ? "bg-white text-purple-700 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Error Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          {shareError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{shareError}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" text="Loading your content..." />
            </div>
          )}

          {/* Content Grid */}
          {!loading && filteredContents.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <PlusIcon />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {filter === "all" ? "No content yet" : `No ${filter} content`}
              </h3>
              <p className="text-gray-600 mb-6">
                {filter === "all" 
                  ? "Start building your knowledge collection by adding some content!"
                  : `You haven't added any ${filter} content yet.`
                }
              </p>
              <Button
                onClick={() => setModalOpen(true)}
                variant="primary"
                text="Add Your First Content"
                startIcon={<PlusIcon />}
              />
            </div>
          ) : !loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredContents.map((content, index) => (
                <Card 
                  key={`${content.title}-${index}`}
                  type={content.type} 
                  link={content.link} 
                  title={content.title}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <CreateContentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
