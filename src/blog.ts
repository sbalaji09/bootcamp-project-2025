// blogPost interface that is used for blog definitions
type BlogPost = {
    id: number;
    title: string;
    date: string;
    content: string;
    tags: string[];
    readTime: string;
};

// empty list of blogs for testing
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
  
  // displays the blogs by manipulating the DOM and using the existing container blog-container
  function displayBlogs(): void {
    const blogContainer = document.getElementById("blog-container");
  
    if (!blogContainer) {
      console.error("Blog container not found!");
      return;
    }
  
    blogContainer.innerHTML = "";
  
    // iterates over each blog post and adds it to the html
    blogs.forEach((blog) => {
      // separate container for each blog
      const blogDiv = document.createElement("div");
      blogDiv.classList.add("blog-post");
  
      const titleEl = document.createElement("h2");
      titleEl.textContent = blog.title;
  
      const dateEl = document.createElement("p");
      dateEl.classList.add("blog-date");
      dateEl.textContent = `📅 ${blog.date} • ⏱️ ${blog.readTime}`;
  
      const contentEl = document.createElement("p");
      contentEl.classList.add("blog-content");
      contentEl.textContent = blog.content;
  
      const tagsEl = document.createElement("div");
      tagsEl.classList.add("blog-tags");
      blog.tags.forEach((tag) => {
        const tagSpan = document.createElement("span");
        tagSpan.classList.add("tag");
        tagSpan.textContent = `#${tag}`;
        tagsEl.appendChild(tagSpan);
      });
      
      // appends each of the blog elements to the blog container
      blogDiv.appendChild(titleEl);
      blogDiv.appendChild(dateEl);
      blogDiv.appendChild(contentEl);
      blogDiv.appendChild(tagsEl);
  
      // appends the constructed blog post to the main blog container
      blogContainer.appendChild(blogDiv);
    });
  }
  
  
document.addEventListener('DOMContentLoaded', displayBlogs);
  