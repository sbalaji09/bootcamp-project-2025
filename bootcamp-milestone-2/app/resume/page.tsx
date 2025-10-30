export default function Resume() {
  return (
    <div className="content-section">
      <h2>Resume</h2>
      <div style={{textAlign: 'center', padding: '2rem'}}>
        <p style={{marginBottom: '1.5rem'}}>View or download my resume below:</p>
        <a
          href="/Resume.pdf"
          target="_blank"
          className="project-github-btn"
          style={{display: 'inline-flex'}}
        >
          View Resume (PDF)
        </a>
      </div>
    </div>
  );
}
