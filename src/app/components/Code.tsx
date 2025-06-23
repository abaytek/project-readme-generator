import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Code = ({
  className,
  children,
}: {
  className?: string;
  children: string;
}) => {
  const language = className?.replace("lang-", "") || "javascript";

  return (
    <SyntaxHighlighter
      customStyle={{ margin: 0, background: "#111", border: "none" }}
      language={language}
      style={dark}
      className="rounded-lg text-sm my-4 bg-black"
      showLineNumbers
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default Code;