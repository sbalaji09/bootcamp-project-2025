import connectDB from '@/database/db';
import Project from '@/database/projectSchema';

async function getProjects(){
	try {
		await connectDB() // function from db.ts before
		// query for all projects and sort by order
	    const projects = await Project.find().sort({ order: 1 }).orFail()
		// Convert Mongoose documents to plain objects
		return projects.map(project => project.toObject())
	} catch (err) {
		console.error('Error fetching projects:', err)
	    return null
	}
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <a href="/Resume.pdf" target="_blank" className="resume-button">Resume</a>

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

        {!projects || projects.length === 0 ? (
          <p style={{textAlign: 'center', fontSize: '1.2rem', color: '#666'}}>No projects found.</p>
        ) : (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div className="project-card" key={index}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag: string, tagIndex: number) => (
                    <span
                      key={tagIndex}
                      className="project-tag"
                      style={{fontWeight:"bold", border:"1px solid black", borderRadius:"999px", padding:"4px 16px", display:"inline-block"}}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a href={project.githubUrl} target="_blank" className="project-github-btn">View on GitHub</a>
              </div>
            ))}
          </div>
        )}
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
