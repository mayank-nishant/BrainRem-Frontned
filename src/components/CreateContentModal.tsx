import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon.tsx";
import { Button } from "./Button";
import { Input } from "./Input.tsx";
import { BACKEND_URL } from "../config.ts";
import axios from "axios";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";

const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter",
} as const;
type ContentType = (typeof ContentType)[keyof typeof ContentType];

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>(ContentType.Youtube);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function addContent() {
    if (!titleRef.current?.value || !linkRef.current?.value) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          link: linkRef.current.value,
          title: titleRef.current.value,
          type,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      // Reset form
      titleRef.current.value = "";
      linkRef.current.value = "";
      setType(ContentType.Youtube);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add content");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Add New Content</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <CrossIcon />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Content Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Content Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setType(ContentType.Youtube)}
                  className={`flex items-center justify-center space-x-2 p-4 rounded-lg border-2 transition-all duration-200 ${
                    type === ContentType.Youtube
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  <YoutubeIcon />
                  <span className="font-medium">YouTube</span>
                </button>
                <button
                  onClick={() => setType(ContentType.Twitter)}
                  className={`flex items-center justify-center space-x-2 p-4 rounded-lg border-2 transition-all duration-200 ${
                    type === ContentType.Twitter
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  <TwitterIcon />
                  <span className="font-medium">Twitter</span>
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <Input 
              reference={titleRef} 
              placeholder="Enter content title" 
              label="Title"
            />
            <Input 
              reference={linkRef} 
              placeholder={`Enter ${type} link`} 
              label="Link"
            />

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
            <Button
              onClick={onClose}
              variant="ghost"
              text="Cancel"
            />
            <Button
              onClick={addContent}
              variant="primary"
              text="Add Content"
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
