"use client";
import { useState } from "react";

import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import type { NextApiRequest, NextApiResponse } from "next";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import Markdown from "markdown-to-jsx";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Code from "./components/Code";
import Readme from "./components/Readme";
import ReadmeSkeleton from "./components/ReadmeSkeleton";
import Form from "./components/Form";
import { DEFAULT_README } from "./constants";

type FormData = {
  title: string;
  description: string;
  techStacks: string;
};

type Props = {
  readme?: string;
};

const Home: React.FC<Props> = ({ readme: defaultReadme }) => {
  const [readme, setReadme] = useState(DEFAULT_README);

  return (
    <div className="bg-blend-darken bg-black bg-[linear-gradiant(to_right, #333, #666, #555)] text-white">
      <h1 className="text-3xl text-center py-3 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text font-bold leading-tight tracking-tighter text-transparent">
        GitHub README Generator
      </h1>
      <div className="flex items-start container mx-auto">
        <div className="flex-1 items-center">
          <Form readme={readme} setReadme={setReadme} />
        </div>
        <div className="flex-1 items-start">
          {readme ? (
            <Readme readme={readme} />
          ) : (
            <ReadmeSkeleton readme={"dsds"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
