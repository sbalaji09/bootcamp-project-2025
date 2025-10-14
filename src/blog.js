// Blog data
/**
 * 
 * type BlogPost = {
    id: number;
    title: string;
    date: string;
    content: string;
    tags: string[];
    readTime: string;
};
 */
const blogs = [
    {
        title: "Montana Trip",
        image: "src/blog-posts/photos/IMG_8452.jpeg",
        imageAlt: "Montana Trip - Glacier National Park",
        description: "My trip to Glacier National Park",
        date: "August 31, 2025",
        tags: ["Family", "Hiking", "Summer"],
        readTime: "5 min read",
        slug: "src/blog-posts/blog-post1.html",
        imagePosition: "center 45%"
    },
    {
        title: "SF Trip",
        image: "src/blog-posts/photos/IMG_6540-preview.JPG",
        imageAlt: "SF Trip with Friends",
        description: "My trip to SF during summer with two of my closest friends",
        date: "July 24, 2025",
        tags: ["Travelling", "Summer", "Friends"],
        readTime: "4 min read",
        slug: "src/blog-posts/blog-post2.html",
        imagePosition: "center 23%"
    },
    {
        title: "Senior Ditch Day",
        image: "src/blog-posts/photos/IMG_6048.jpeg",
        imageAlt: "Senior Ditch Day at Santa Cruz Beach",
        description: "My senior ditch day to Santa Cruz with my closest friends",
        date: "May 19, 2025",
        tags: ["Friends", "Exploring", "Beach"],
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

    const imageStyle = blog.imagePosition ? `style="object-position: ${blog.imagePosition};"` : '';

    blogDiv.innerHTML = `
        <img src="${blog.image}" alt="${blog.imageAlt}" class="blog-image" ${imageStyle}>
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
