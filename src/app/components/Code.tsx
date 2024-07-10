import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism-async";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Code = ({ children }: { children: string }) => {
  return (
    <div>
      <SyntaxHighlighter language="javascript" style={dark}>
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code;
