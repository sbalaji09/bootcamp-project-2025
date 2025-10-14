// Blog data
const blogs = [
    {
        title: "Learning DOM Manipulation",
        image: "https://via.placeholder.com/400x200",
        imageAlt: "DOM Manipulation Example",
        description: "Learn how to dynamically update your webpage using JavaScript and the DOM.",
        date: "October 10, 2025",
        tags: ["JavaScript", "Web Development", "DOM"],
        readTime: "5 min read",
        slug: "src/blog-posts/blog-post1.html"
    },
    {
        title: "Understanding TypeScript",
        image: "https://via.placeholder.com/400x200",
        imageAlt: "TypeScript Example",
        description: "A quick guide to getting started with TypeScript for modern web development.",
        date: "October 5, 2025",
        tags: ["TypeScript", "Web Development"],
        readTime: "4 min read",
        slug: "src/blog-posts/blog-post2.html"
    },
    {
        title: "Styling Tips for Web Developers",
        image: "https://via.placeholder.com/400x200",
        imageAlt: "CSS Styling Tips",
        description: "Discover techniques to make your websites visually appealing and accessible.",
        date: "September 28, 2025",
        tags: ["CSS", "Web Design", "Accessibility"],
        readTime: "6 min read",
        slug: "src/blog-posts/blog-post3.html"
    }
];

// Function to create a blog post element
function createBlogPost(blog) {
    const blogLink = document.createElement("a");
    blogLink.href = blog.slug;
    blogLink.className = "blog-post-link";
    blogLink.style.textDecoration = "none";
    blogLink.style.color = "inherit";
    blogLink.style.display = "block";

    const blogDiv = document.createElement("div");
    blogDiv.className = "blog-post";

    blogDiv.innerHTML = `
        <img src="${blog.image}" alt="${blog.imageAlt}" class="blog-image">
        <div class="blog-content">
            <h3 class="blog-title">${blog.title}</h3>
            <div class="blog-meta">
                <span class="blog-date">${blog.date}</span>
                <span class="blog-read-time">• ${blog.readTime}</span>
            </div>
            <p class="blog-description">${blog.description}</p>
            <div class="blog-tags">
                ${blog.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;

    blogLink.appendChild(blogDiv);
    return blogLink;
}

// Function to display all blog posts
function displayBlogs() {
    const blogContainer = document.getElementById("blog-container");
    
    if (!blogContainer) {
        console.error("Blog container not found");
        return;
    }
    
    // Clear existing content
    blogContainer.innerHTML = "";
    
    // Add each blog post to the container
    blogs.forEach(blog => {
        const postElement = createBlogPost(blog);
        blogContainer.appendChild(postElement);
    });
}

// Initialize the blog when the DOM is loaded
document.addEventListener('DOMContentLoaded', displayBlogs);
