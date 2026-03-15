import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { getBlogBySlug } from "@/lib/blogLoader";
import { useEffect } from "react";
<<<<<<< HEAD
import "highlight.js/styles/github.css";
=======
>>>>>>> 3a65980fdeb7f9bc4ae532d4b1008276fe88acc5

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

<<<<<<< HEAD
          <Link to="/">
            <img src="/logoone.png" alt="Threat Hunt" className="h-10" />
=======
          <Link to="/" className="flex items-center">
            <img src="/logoone.png" alt="Threat Hunt" className="h-12 w-auto" />
>>>>>>> 3a65980fdeb7f9bc4ae532d4b1008276fe88acc5
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
<<<<<<< HEAD
        <div className="prose prose-neutral max-w-none">
=======
        <div className="
          prose prose-neutral max-w-none
          prose-headings:font-serif
          prose-h1:text-4xl
          prose-h1:font-bold
          prose-h1:mb-6
          prose-h2:mt-12 prose-h2:mb-4
          prose-h3:mt-8 prose-h3:mb-3
          prose-p:leading-8 prose-p:mb-6
          prose-li:mb-2
          prose-strong:text-gray-900
          prose-blockquote:border-l-4
          prose-blockquote:border-l-[#2AA6C6]
          prose-blockquote:pl-4
          prose-img:rounded-md
          prose-img:shadow-md
        ">
>>>>>>> 3a65980fdeb7f9bc4ae532d4b1008276fe88acc5
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
