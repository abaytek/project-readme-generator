import Markdown from "markdown-to-jsx";
import React, { useState } from "react";
import Code from "./Code";
import { FaCopy } from "react-icons/fa";
import { AiFillCopy } from "react-icons/ai";

const Readme = ({ readme }: { readme: string }) => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(readme || "");
  };
  return (
    <div className="m-6">
      {readme && (
        <div className="h-[calc(100vh-7rem)] overflow-scroll bg-gray-900 text-sm p-4 relative">
          <div className="p-3">
            <Markdown
              options={{
                overrides: {
                  bash: {
                    component: Code,
                  },
                },
              }}
            >
              {readme}
            </Markdown>
            <button
              className="text-xl font-bold fixed top-20 right-16"
              onClick={copyToClipboard}
            >
              <div className="bg-gray-900">
                {copied ? <FaCopy /> : <AiFillCopy />}
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Readme;
