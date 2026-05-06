import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import { FaEdit, FaTrash, FaCode, FaRocket, FaHistory } from "react-icons/fa";

function Dashboard({ setToken }) {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1;\n}`);
  const [review, setReview] = useState("");
  const [pastReviews, setPastReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) fetchPastReviews();
  }, [token]);

  async function fetchPastReviews() {
    try {
      const res = await axios.get("http://localhost:3000/ai/past-prompts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPastReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  }

  async function reviewCode() {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/ai/get-review",
        { code },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReview(res.data.review);
      fetchPastReviews();
    } catch (error) {
      console.error("Error reviewing code:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateReview(id) {
    setIsLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:3000/ai/past-prompts/${id}`,
        { code },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReview(res.data.review);
      setSelectedReview(null);
      fetchPastReviews();
    } catch (error) {
      console.error("Error updating review:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteReview(id) {
    try {
      await axios.delete(`http://localhost:3000/ai/past-prompts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPastReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  }

  function handleEditReview(item) {
    setSelectedReview(item);
    setCode(item.code);
    setReview("");
  }

  function handleNewReview() {
    setSelectedReview(null);
    setCode(`function sum() {\n  return 1 + 1;\n}`);
    setReview("");
  }

  function handleReviewClick(item) {
    setSelectedReview(item);
    setCode(item.code);
    setReview(item.review);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Navbar */}
      <nav className="relative backdrop-blur-xl bg-black/30 border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
                <FaCode className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  AI Code Reviewer
                </h1>
                <p className="text-xs text-gray-400">Powered by AI</p>
              </div>
            </div>
            <button
              onClick={() => setToken(null)}
              className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg font-semibold text-white shadow-lg hover:shadow-red-500/50 hover:scale-105 transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Layout */}
      <div className="relative flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="w-80 backdrop-blur-xl bg-black/20 border-r border-white/10 p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <FaHistory className="text-purple-400" />
            <h2 className="text-lg font-semibold text-white">Review History</h2>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 mb-6 pr-2 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
            {pastReviews.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <p className="text-sm">No reviews yet</p>
                <p className="text-xs mt-2">Start by submitting your code</p>
              </div>
            ) : (
              pastReviews.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleReviewClick(item)}
                  className={`group backdrop-blur-sm bg-white/5 hover:bg-white/10 p-4 rounded-xl cursor-pointer transition-all duration-200 border border-white/5 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 ${
                    selectedReview?.id === item.id ? "ring-2 ring-purple-500" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-gray-300 font-mono truncate flex-1">
                      {item.code.substring(0, 30)}...
                    </span>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditReview(item);
                      }}
                      className="p-1.5 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg transition-colors"
                    >
                      <FaEdit className="text-yellow-400 text-xs" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteReview(item.id);
                      }}
                      className="p-1.5 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                    >
                      <FaTrash className="text-red-400 text-xs" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            onClick={handleNewReview}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-semibold text-white shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FaRocket />
            New Review
          </button>
        </aside>

        {/* Main Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Editor */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl hover:border-purple-500/30 transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <h3 className="ml-3 text-purple-400 font-semibold">Your Code</h3>
              </div>
              <div className="bg-black/40 rounded-xl overflow-hidden border border-white/5">
                <Editor
                  value={code}
                  onValueChange={setCode}
                  highlight={(code) =>
                    prism.highlight(code, prism.languages.javascript, "javascript")
                  }
                  padding={20}
                  style={{
                    fontFamily: '"Fira Code", "Consolas", monospace',
                    fontSize: 14,
                    minHeight: "300px",
                    width: "100%",
                    backgroundColor: "transparent",
                    color: "#ffffff",
                  }}
                />
              </div>
            </div>

            {/* Review */}
            {review && (
              <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in">
                <h3 className="mb-4 text-green-400 font-semibold text-lg flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  AI Review
                </h3>
                <div className="prose prose-invert prose-purple max-w-none">
                  <Markdown rehypePlugins={[rehypeHighlight]}>
                    {review}
                  </Markdown>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="flex justify-center">
              {selectedReview ? (
                <button
                  onClick={() => updateReview(selectedReview.id)}
                  disabled={isLoading}
                  className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl font-semibold text-white shadow-lg hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <FaEdit />
                      Update Review
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={reviewCode}
                  disabled={isLoading}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-semibold text-white shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <FaRocket />
                      Submit for Review
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.5);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.7);
        }
      `}</style>
    </div>
  );
}

export default Dashboard;