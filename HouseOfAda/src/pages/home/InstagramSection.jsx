import React, { useEffect } from "react";

const InstagramSection = () => {
  const posts = [
    "https://www.instagram.com/p/DMaHR0rz3F9/",
    "https://www.instagram.com/p/DM9iUvgzdKB/",
    "https://www.instagram.com/p/DLnG6hMz6wA/",
    "https://www.instagram.com/p/DHgiFKLz5ZU/",
  ];

  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.instagram.com/embed.js";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="bg-white text-black py-16 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold mb-3 uppercase tracking-wide">
        Follow Us On Instagram
      </h2>

      <a
        href="https://www.instagram.com/house_of_ada_"
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg font-medium underline hover:opacity-70 transition duration-300"
      >
        @house_of_ada_
      </a>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
        {posts.map((url, i) => (
          <blockquote
            key={i}
            className="instagram-media bg-white w-full max-w-xs"
            data-instgrm-permalink={url}
            data-instgrm-version="14"
            style={{
              border: "0",
              margin: "auto",
              maxWidth: "350px",
              width: "100%",
            }}
          ></blockquote>
        ))}
      </div>
      
    </section>



  );
};

export default InstagramSection;
