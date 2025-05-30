import SectionHeader from "../components/SectionHeader";

export default function Contact() {
  return (
    <section className="max-w-xl mx-auto p-8 text-center">
      <SectionHeader className="text-blue-950 dark:text-red-300 change-color">Contact</SectionHeader>

      {/* outer: 1rem between each group */}
      <div className="space-y-4">  

        {/* inner: 0.25rem between label & link */}
        <div className="space-y-1">
          <p className="contact-label">Send me an <strong>email</strong>:</p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:alexandertoth96@yahoo.com"
            className="contact-link"
          >
            alexandertoth96@yahoo.com
          </a>
        </div>

        <div className="space-y-1">
          <p className="contact-label">Connect with me on <strong>LinkedIn</strong>:</p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/tothalexander/"
            className="contact-link"
          >
            linkedin.com/in/tothalexander
          </a>
        </div>

        <p className="text-blue-950 dark:text-rose-200 change-color">also...</p>

        <div className="space-y-1">
          <p className="contact-label">Check out my <strong>GitHub</strong>:</p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/gitxandert"
            className="contact-link"
          >
            github.com/gitxandert
          </a>
        </div>

        <div className="space-y-1">
          <p className="contact-label">Watch my <strong>YouTube</strong> videos:</p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/@alexandertoth2697"
            className="contact-link"
          >
            youtube.com/@alexandertoth2697
          </a>
        </div>

        <div className="space-y-1">
          <p className="contact-label">Hear my music on <strong>SoundCloud</strong>:</p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://soundcloud.com/alexander-toth-607204868"
            className="contact-link"
          >
            soundcloud.com/alexander-toth-607204868
          </a>
        </div>
      </div>
    </section>
  );
}

