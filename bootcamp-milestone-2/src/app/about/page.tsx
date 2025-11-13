export default function About() {
  return (
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
  );
}
