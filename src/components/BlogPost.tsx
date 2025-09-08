import ReactMarkdown  from "react-markdown";
import remarkGfm      from "remark-gfm";

export default function BlogPost({ content, className }: {content: string, className: string}) {
  return (
    <div className={`prose max-w-none ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
