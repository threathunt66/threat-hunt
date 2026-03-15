import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { getBlogBySlug } from "@/lib/blogLoader";
import "highlight.js/styles/github.css";
import { useEffect } from "react";

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
        <p className="text-muted-foreground">Blog not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">

      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-4 flex items-center gap-9">

          <Link to="/" className="flex items-center">
            <img
              src="/logoone.png"
              alt="Threat Hunt"
              className="h-12 w-auto"
            />
          </Link>

          <Link
            to="/"
            state={{ scrollTo: "blogs" }}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </Link>

        </div>
      </nav>

      {/* Article */}
      <article className="mx-auto max-w-4xl px-6 py-10">
        <div
          className="
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
          "
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{

              a: ({ href, children }) => {
                const isExternal = href?.startsWith("http");

                return (
                  <a
                    href={href}
                    target={isExternal ? "_blank" : "_self"}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="text-[#2AA6C6] underline underline-offset-4 hover:opacity-80 transition"
                  >
                    {children}
                  </a>
                );
              },

              img: ({ src, alt }) => {
                if (src && src.endsWith(".mp4")) {
                  return (
                    <video
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{
                        maxWidth: "100%",
                        borderRadius: "8px",
                        marginTop: "20px",
                        marginBottom: "20px"
                      }}
                    >
                      <source src={src} type="video/mp4" />
                    </video>
                  );
                }

                return (
                  <img
                    src={src}
                    alt={alt}
                    style={{
                      borderRadius: "8px",
                      marginTop: "20px",
                      marginBottom: "20px"
                    }}
                  />
                );
              }

            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Comments Section */}
      <div className="mx-auto max-w-4xl px-6 pb-20">
        <h2 className="text-xl font-semibold mb-6">Comments</h2>
        <div className="giscus"></div>
      </div>

    </div>
  );
};

export default BlogPost;
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { getBlogBySlug } from "@/lib/blogLoader";
import "highlight.js/styles/github.css";
import { useEffect } from "react";

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
        <p className="text-muted-foreground">Blog not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">

      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-4 flex items-center gap-9">

          <Link to="/" className="flex items-center">
            <img
              src="/logoone.png"
              alt="Threat Hunt"
              className="h-12 w-auto"
            />
          </Link>

          <Link
            to="/"
            state={{ scrollTo: "blogs" }}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </Link>

        </div>
      </nav>

      {/* Article */}
      <article className="mx-auto max-w-4xl px-6 py-10">
        <div
          className="
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
          "
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{

              a: ({ href, children }) => {
                const isExternal = href?.startsWith("http");

                return (
                  <a
                    href={href}
                    target={isExternal ? "_blank" : "_self"}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="text-[#2AA6C6] underline underline-offset-4 hover:opacity-80 transition"
                  >
                    {children}
                  </a>
                );
              },

              img: ({ src, alt }) => {
                if (src && src.endsWith(".mp4")) {
                  return (
                    <video
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{
                        maxWidth: "100%",
                        borderRadius: "8px",
                        marginTop: "20px",
                        marginBottom: "20px"
                      }}
                    >
                      <source src={src} type="video/mp4" />
                    </video>
                  );
                }

                return (
                  <img
                    src={src}
                    alt={alt}
                    style={{
                      borderRadius: "8px",
                      marginTop: "20px",
                      marginBottom: "20px"
                    }}
                  />
                );
              }

            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Comments Section */}
      <div className="mx-auto max-w-4xl px-6 pb-20">
        <h2 className="text-xl font-semibold mb-6">Comments</h2>
        <div className="giscus"></div>
      </div>

    </div>
  );
};

export default BlogPost;
