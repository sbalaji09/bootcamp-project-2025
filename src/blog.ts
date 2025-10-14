// Define the BlogPost interface
type BlogPost = {
    id: number;
    title: string;
    date: string;
    content: string;
    tags: string[];
    readTime: string;
};

// blog.ts

// Example list of blogs
const blogs: BlogPost[] = [
    {
        id: 1,
        title: "",
        date: "",
        content: "",
        tags: [],
        readTime: ""
    },
    {
        id: 2,
        title: "",
        date: "",
        content: "",
        tags: [],
        readTime: ""
    },
    {
        id: 3,
        title: "",
        date: "",
        content: "",
        tags: [],
        readTime: ""
    }
  ];
  
  function displayBlogs(): void {
    const blogContainer = document.getElementById("blog-container");
  
    // Make sure the container exists
    if (!blogContainer) {
      console.error("Blog container not found!");
      return;
    }
  
    // Clear the container before adding new blogs (optional)
    blogContainer.innerHTML = "";
  
    // Iterate over each blog post
    blogs.forEach((blog) => {
      // Create a container for each blog
      const blogDiv = document.createElement("div");
      blogDiv.classList.add("blog-post");
  
      // Create and populate the title
      const titleEl = document.createElement("h2");
      titleEl.textContent = blog.title;
  
      // Create and populate the date
      const dateEl = document.createElement("p");
      dateEl.classList.add("blog-date");
      dateEl.textContent = `📅 ${blog.date} • ⏱️ ${blog.readTime}`;
  
      // Create and populate the content
      const contentEl = document.createElement("p");
      contentEl.classList.add("blog-content");
      contentEl.textContent = blog.content;
  
      // Create a container for tags
      const tagsEl = document.createElement("div");
      tagsEl.classList.add("blog-tags");
      blog.tags.forEach((tag) => {
        const tagSpan = document.createElement("span");
        tagSpan.classList.add("tag");
        tagSpan.textContent = `#${tag}`;
        tagsEl.appendChild(tagSpan);
      });
  
      // Append elements to the blog container
      blogDiv.appendChild(titleEl);
      blogDiv.appendChild(dateEl);
      blogDiv.appendChild(contentEl);
      blogDiv.appendChild(tagsEl);
  
      // Append the blog post to the main container
      blogContainer.appendChild(blogDiv);
    });
  }
  
  
document.addEventListener('DOMContentLoaded', displayBlogs);
  