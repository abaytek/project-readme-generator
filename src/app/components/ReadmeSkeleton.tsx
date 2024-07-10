import Markdown from "markdown-to-jsx";
import React, { useEffect, useState } from "react";
import Code from "./Code";
import { FaCopy } from "react-icons/fa";
import { AiFillCopy } from "react-icons/ai";

const ReadmeSkeleton = ({ readme }: { readme: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(readme || "");
    setCopied(!copied);
  };
  return (
    <div className="my-6 mx-16">
      {readme && (
        <div className="h-[calc(100vh-7rem)] rounded-tl-[50px] overflow-scroll bg-gray-900 text-sm p-4 relative">
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
              className="text-lg font-bold absolute top-5 right-4"
              onClick={copyToClipboard}
            >
              {copied ? <FaCopy /> : <AiFillCopy />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadmeSkeleton;
