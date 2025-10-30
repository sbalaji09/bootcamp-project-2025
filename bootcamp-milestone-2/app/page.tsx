export default function Home() {
  return (
    <>
      <a href="Resume.pdf" target="_blank" className="resume-button">Resume</a>

      {/* NAVIGATION */}
      <nav className="hero-nav">  
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="blog.html">Blog</a></li>
        </ul>
      </nav>

      {/* ABOUT SECTION */}
      <section id="about" className="hero">
        <div className="content">
          <h1>Siddharth Balaji</h1>
          <p>
            I'm a student who likes building things. Currently working on distributed systems and exploring AI/ML.
            Always down to work on interesting projects.
          </p>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="content-section">
        <h2>Projects</h2>

        <div className="projects-grid">
          <div className="project-card">
            <h3>GreenThumb</h3>
            <p>Mobile app built with React Native and Expo Go that helps users take care of their plants through a fun and interactive user experience</p>
            <div className="project-tags">
              <span className="project-tag" style={{fontWeight:"bold", border:"1px solid black", borderRadius:"999px", padding:"4px 16px", display:"inline-block"}}>
                React Native
              </span>                                          
              <span className="project-tag" style={{fontWeight:"bold", border:"1px solid black", borderRadius:"999px", padding:"4px 16px", display:"inline-block"}}>
                Expo Go
              </span>
              <span className="project-tag" style={{fontWeight:"bold", border:"1px solid black", borderRadius:"999px", padding:"4px 16px", display:"inline-block"}}>
                Mobile App
              </span>
            </div>
            <a href="https://github.com/sbalaji09/GardeningApp" target="_blank" className="project-github-btn">View on GitHub</a>
          </div>

          <div className="project-card">
            <h3>Research Paper</h3>
            <p>Wrote a research paper under guidance of a Stanford PhD student comparing AlexNet and CNN image classifiers with federated learning</p>
            <div className="project-tags">
              <span className="project-tag" style={{fontWeight:"bold", border:"1px solid black", borderRadius:"999px", padding:"4px 16px", display:"inline-block"}}>
                Research
              </span>
              <span className="project-tag" style={{fontWeight:"bold", border:"1px solid black", borderRadius:"999px", padding:"4px 16px", display:"inline-block"}}>
                AI/ML
              </span>
              <span className="project-tag" style={{fontWeight:"bold", border:"1px solid black", borderRadius:"999px", padding:"4px 16px", display:"inline-block"}}>
                Federated Learning
              </span>
            </div>
            <a href="https://github.com/sbalaji09/ResearchPaper2024" target="_blank" className="project-github-btn">View on GitHub</a>
          </div>

          <div className="project-card">
            <h3>Log Analytics Project</h3>
            <p>Real-time log aggregation and search web app built with Go, React, and Redis Streams, enabling fast and efficient developer troubleshooting</p>
            <div className="project-tags">
              <span className="project-tag" style={{fontWeight:"bold", border:"1px solid black", borderRadius:"999px", padding:"4px 16px", display:"inline-block"}}>
                GoLang
              </span>
              <span className="project-tag" style={{fontWeight:"bold", border:"1px solid black", borderRadius:"999px", padding:"4px 16px", display:"inline-block"}}>
                React
              </span>
              <span className="project-tag" style={{fontWeight:"bold", border:"1px solid black", borderRadius:"999px", padding:"4px 16px", display:"inline-block"}}>
                Redis
              </span>
            </div>
            <a href="https://github.com/sbalaji09/LogBuilder" target="_blank" className="project-github-btn">View on GitHub</a>
          </div>

          <div className="project-card">
            <h3>Patent Prior Art Discovery System</h3>
            <p>Automated platform that uses semantic search and scalable storage to reduce patent analysis time for patent lawyers</p>
            <div className="project-tags" style={{display:"flex", flexWrap:"wrap", gap:"8px", marginBottom:"8px"}}>
              <span className="project-tag" style={{fontWeight:"bold", border:"1px solid black", borderRadius:"999px", padding:"4px 16px", display:"inline-block"}}>
                Python
              </span>
              <span className="project-tag" style={{fontWeight:"bold", border:"1px solid black", borderRadius:"999px", padding:"4px 16px", display:"inline-block"}}>
                MCP
              </span>
              <span className="project-tag" style={{fontWeight:"bold", border:"1px solid black", borderRadius:"999px", padding:"4px 16px", display:"inline-block"}}>
                Semantic Search
              </span>
              <span className="project-tag" style={{fontWeight:"bold", border:"1px solid black", borderRadius:"999px", padding:"4px 16px", display:"inline-block"}}>
                React
              </span>
              <span className="project-tag" style={{fontWeight:"bold", border:"1px solid black", borderRadius:"999px", padding:"4px 16px", display:"inline-block"}}>
                Pinecone
              </span>
            </div>
            <a href="https://github.com/sbalaji09/PatentDiscoverySystem" target="_blank" className="project-github-btn">View on GitHub</a>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="content-section">
        <h2>Contact</h2>
        <div className="contact-content">
          <p><strong>Email:</strong> siddharthbalaji6@gmail.com</p>
          <p>Feel free to reach out if you want to work on something or just chat.</p>
          <div className="contact-links">
            <a href="mailto:siddharthbalaji6@gmail.com" className="contact-link">
              <i className="fas fa-envelope"></i>
              <span>Email</span>
            </a>
            <a href="https://www.linkedin.com/in/siddharth-balaji-9b47712a5/" className="contact-link">
              <i className="fab fa-linkedin"></i>
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/sbalaji09" className="contact-link">
              <i className="fab fa-github"></i>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
