"use client";
import { useState, useRef } from "react";
import Markdown from "markdown-to-jsx";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import SyntaxHighlighter from "react-syntax-highlighter";
import ReadmeSkeleton from "./components/ReadmeSkeleton";
import { DEFAULT_README } from "./constants";
import Form from "./components/Form";
import Code from "./components/Code";

export type FormData = {
  title: string;
  description: string;
  techStacks: string;
};

const Home = () => {
  const [readme, setReadme] = useState(DEFAULT_README);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const abortControllerRef = useRef<AbortController | null>(null);

  const generateReadme = async (formData: FormData) => {
    setIsGenerating(true);
    setError("");
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/generate-readme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to generate README");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let generatedText = "";

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        generatedText += chunk;
        setReadme(generatedText);
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError(
          err.message || "An error occurred while generating the README"
        );
      }
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  };

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 bg-clip-text text-transparent mb-3">
            GitHub README Generator
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Create beautiful, professional README files for your projects in
            seconds
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:flex-1 bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-amber-400">
              Project Details
            </h2>
            <Form
              onSubmit={generateReadme}
              isGenerating={isGenerating}
              onStop={stopGeneration}
            />
            {error && (
              <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
                {error}
              </div>
            )}
          </div>

          <div className="lg:flex-1">
            <div className="sticky top-6">
              <div className="flex justify-between items-center mb-4">
                {/* <h2 className="text-2xl font-bold text-amber-400">README Preview</h2> */}
                {/* <button
                  onClick={() => navigator.clipboard.writeText(readme)}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                >
                  Copy
                </button> */}
              </div>

              <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 h-[600px] overflow-y-auto">
                {isGenerating && !readme ? (
                  <ReadmeSkeleton readme="" />
                ) : (
                  <div className="prose prose-invert max-w-none">
                    <Markdown
                      options={{
                        overrides: {
                          code: {
                            component: Code,
                            props: {
                              styles: dark,
                            },
                          },
                        },
                      }}
                    >
                      {readme}
                    </Markdown>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// Code Component


export default Home;
