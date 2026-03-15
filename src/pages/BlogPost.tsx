import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { getBlogBySlug } from "@/lib/blogLoader";
import { useEffect } from "react";
import "highlight.js/styles/github.css";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const blog = slug ? getBlogBySlug(slug) : undefined;

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "threathunt66/threat-hunt");
    script.setAttribute("data-repo-id", "R_kgDORBEA8A");
    script.setAttribute("data-category", "Blog Comments");
    script.setAttribute("data-category-id", "DIC_kwDORBEA8M4C4X_U");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "1");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "noborder_light");
    script.setAttribute("data-lang", "en");
    script.crossOrigin = "anonymous";
    script.async = true;

    const container = document.querySelector(".giscus");
    if (container && !container.firstChild) {
      container.appendChild(script);
    }
  }, []);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">

      <nav className="border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-4 flex items-center gap-6">

          <Link to="/">
            <img src="/logoone.png" alt="Threat Hunt" className="h-10" />
          </Link>

          <Link
            to="/"
            state={{ scrollTo: "blogs" }}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back
          </Link>

        </div>
      </nav>

      <article className="mx-auto max-w-4xl px-6 py-10">
        <div className="prose prose-neutral max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {blog.content}
          </ReactMarkdown>
        </div>
      </article>

      <div className="mx-auto max-w-4xl px-6 pb-20">
        <h2 className="text-xl font-semibold mb-6">Comments</h2>
        <div className="giscus"></div>
      </div>

    </div>
  );
};

export default BlogPost;
