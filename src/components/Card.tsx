import { ShareIcon } from "../icons/ShareIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Card({ title, link, type }: CardProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: link,
      });
    } else {
      navigator.clipboard.writeText(link);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="group">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden max-w-sm w-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-100 to-blue-100">
                {type === "youtube" ? (
                  <YoutubeIcon />
                ) : (
                  <TwitterIcon />
                )}
              </div>
              <h3 className="font-semibold text-gray-900 truncate">{title}</h3>
            </div>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 opacity-0 group-hover:opacity-100"
              title="Share"
            >
              <ShareIcon />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {type === "youtube" && (
            <div className="relative rounded-lg overflow-hidden bg-gray-100">
              <iframe 
                className="w-full h-48" 
                src={link.replace("watch", "embed").replace("?v=", "/")} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              />
            </div>
          )}

          {type === "twitter" && (
            <div className="bg-gray-50 rounded-lg p-4">
              <blockquote className="twitter-tweet">
                <a href={link.replace("x.com", "twitter.com")} className="text-blue-600 hover:text-blue-800">
                  View Tweet
                </a>
              </blockquote>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center justify-center space-x-1"
          >
            <span>Open in {type === "youtube" ? "YouTube" : "Twitter"}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
