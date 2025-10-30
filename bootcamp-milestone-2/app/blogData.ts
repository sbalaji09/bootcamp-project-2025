export interface Blog { // type also works
    title: string;
    image: string;
    imageAlt: string;
    description: string;
    date: string;
    tags: string[];
    readTime: string;
    slug: string;
    imagePosition: string;
}

const blogs: Blog[] = [
    {
        title: "Montana Trip",
        image: "/blog-posts/photos/IMG_8452.jpeg",
        imageAlt: "Montana Trip - Glacier National Park",
        description: "My trip to Glacier National Park",
        date: "August 31, 2025",
        tags: ["Family", "Hiking", "Summer"],
        readTime: "5 min read",
        slug: "/blog-posts/blog-post1.html",
        imagePosition: "center 45%"
    },
    {
        title: "SF Trip",
        image: "/blog-posts/photos/IMG_6540-preview.JPG",
        imageAlt: "SF Trip with Friends",
        description: "My trip to SF during summer with two of my closest friends",
        date: "July 24, 2025",
        tags: ["Travelling", "Summer", "Friends"],
        readTime: "4 min read",
        slug: "/blog-posts/blog-post2.html",
        imagePosition: "center 23%"
    },
    {
        title: "Senior Ditch Day",
        image: "/blog-posts/photos/IMG_6048.jpeg",
        imageAlt: "Senior Ditch Day at Santa Cruz Beach",
        description: "My senior ditch day to Santa Cruz with my closest friends",
        date: "May 19, 2025",
        tags: ["Friends", "Exploring", "Beach"],
        readTime: "6 min read",
        slug: "/blog-posts/blog-post3.html",
        imagePosition: "center 50%"
    }
];

export default blogs;