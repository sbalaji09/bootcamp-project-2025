// Define the BlogPost interface
type BlogPost = {
    id: number;
    title: string;
    date: string;
    content: string;
    tags: string[];
    readTime: string;
};

// Sample blog data - in a real app, this would come from an API
const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "Getting Started with TypeScript",
        date: "October 10, 2025",
        content: "TypeScript is a powerful way to write JavaScript with type safety. In this post, I'll share my journey of learning TypeScript and how it has improved my development workflow.",
        tags: ["TypeScript", "Web Development", "Programming"],
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "Building Scalable Web Applications",
        date: "October 5, 2025",
        content: "Learn the best practices for building web applications that can scale to millions of users. We'll cover architecture, database design, and caching strategies.",
        tags: ["Web Development", "Scalability", "Architecture"],
        readTime: "8 min read"
    },
    {
        id: 3,
        title: "The Future of AI in Software Development",
        date: "September 28, 2025",
        content: "Exploring how AI is changing the landscape of software development and what it means for developers in the coming years.",
        tags: ["AI", "Machine Learning", "Future Tech"],
        readTime: "6 min read"
    }
];

// Function to create a single blog post element
function createBlogPostElement(post: BlogPost): HTMLElement {
    const article = document.createElement('article');
    article.className = 'blog-post';
    article.setAttribute('data-id', post.id.toString());

    // Create tags HTML
    const tagsHtml = post.tags.map(tag => 
        `<span class="blog-tag">${tag}</span>`
    ).join('');

    article.innerHTML = `
        <div class="blog-post-header">
            <h2 class="blog-title">${post.title}</h2>
            <div class="blog-meta">
                <span class="blog-date">${post.date}</span>
                <span class="blog-read-time">• ${post.readTime}</span>
            </div>
            <div class="blog-tags">${tagsHtml}</div>
        </div>
        <div class="blog-content">
            <p>${post.content}</p>
        </div>
        <a href="#" class="read-more">Read More →</a>
    `;

    return article;
}

// Function to render all blog posts
function renderBlogPosts(containerId: string = 'blog-container'): void {
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Container with id "${containerId}" not found`);
        return;
    }

    // Clear existing content
    container.innerHTML = '';

    // Add each blog post to the container
    blogPosts.forEach(post => {
        const postElement = createBlogPostElement(post);
        container.appendChild(postElement);
    });
}

// Initialize the blog when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderBlogPosts('blog-container');
});

// Make the function available globally for direct script inclusion
// @ts-ignore
window.renderBlogPosts = renderBlogPosts;
