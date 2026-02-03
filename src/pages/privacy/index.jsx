import "./index.scss";

export default function Privacy() {
  return (
    <div className="ph-legal">
      <h1 className="ph-legal__title">Privacy Policy</h1>
      <p className="ph-legal__meta">Last updated: Feb 2026</p>

      <div className="ph-legal__section">
        <h2>1. Overview</h2>
        <p>
          Profile Hub is a profile and portfolio platform that lets you create,
          manage, and share professional information. This policy explains what
          data we collect, how we use it, and what choices you have.
        </p>
      </div>

      <div className="ph-legal__section">
        <h2>2. Information we collect</h2>

        <h3>Account information</h3>
        <ul>
          <li>Username</li>
          <li>Display name</li>
          <li>Email address (if you provide one)</li>
        </ul>

        <h3>Profile information</h3>
        <ul>
          <li>Experience, education, certifications</li>
          <li>Projects, skills, recognitions</li>
          <li>Links and contact details you choose to add</li>
        </ul>

        <h3>Technical information</h3>
        <ul>
          <li>IP address, browser/device information</li>
          <li>Request metadata (for security and debugging)</li>
        </ul>
      </div>

      <div className="ph-legal__section">
        <h2>3. Personal data & PII</h2>
        <p>
          Some information you add may be considered personally identifiable
          information (PII). You control what you add and what you make public.
          Avoid sharing sensitive information that you do not want to be public.
        </p>
      </div>

      <div className="ph-legal__section">
        <h2>4. How we use your data</h2>
        <ul>
          <li>To provide and operate Profile Hub</li>
          <li>To display your profile as requested</li>
          <li>To improve reliability and security</li>
          <li>To respond to feedback or support requests</li>
        </ul>
        <p>We do not sell your personal data.</p>
      </div>

      <div className="ph-legal__section">
        <h2>5. Public profiles</h2>
        <p>
          If you publish a public profile, the public information can be viewed
          by anyone with the link. Profile Hub is not responsible for how third
          parties use information you choose to make public.
        </p>
      </div>

      <div className="ph-legal__section">
        <h2>6. Data storage & security</h2>
        <p>
          Data is stored using cloud infrastructure. We use authentication and
          access controls to protect private endpoints and take reasonable
          technical measures to protect user data. However, no system is 100%
          secure.
        </p>
      </div>

      <div className="ph-legal__section">
        <h2>7. Cookies & tracking</h2>
        <p>
          Profile Hub uses essential storage (such as local storage or cookies)
          to support authentication and basic functionality. We do not use
          third-party advertising or tracking cookies at this time.
        </p>
      </div>

      <div className="ph-legal__section">
        <h2>8. Data retention</h2>
        <p>
          We retain your data as long as your account exists or until you request
          deletion (if supported). You are encouraged to keep your own backups
          of important information.
        </p>
      </div>

      <div className="ph-legal__section">
        <h2>9. Children’s privacy</h2>
        <p>
          Profile Hub is not intended for children under 13. We do not knowingly
          collect data from children.
        </p>
      </div>

      <div className="ph-legal__section">
        <h2>10. Changes to this policy</h2>
        <p>
          We may update this policy as the platform evolves. Continued use of the
          service indicates acceptance of the updated policy.
        </p>
      </div>

      <div className="ph-legal__section ph-legal__section--last">
        <h2>11. Contact</h2>
        <p className="ph-legal__text">
          Questions or concerns? Email us at{" "}
          <a className="ph-legal__link" href="mailto:subbusubramanyam92@gmail.com">
            subbusubramanyam92@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
