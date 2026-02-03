import "./index.scss";

export default function Terms() {
  return (
    <div className="ph-legal">
      <h1 className="ph-legal__title">Terms & Conditions</h1>
      <p className="ph-legal__meta">Last updated: Feb 2026</p>

      <div className="ph-legal__section">
        <h2>1. About Profile Hub</h2>
        <p>
          Profile Hub is a profile and portfolio management platform that allows
          users to create, manage, and share professional information through a
          public profile page.
        </p>
      </div>

      <div className="ph-legal__section">
        <h2>2. Eligibility</h2>
        <p>
          You must be at least 13 years old to use Profile Hub. You are
          responsible for the accuracy of the information you provide.
        </p>
      </div>

      <div className="ph-legal__section">
        <h2>3. Your content</h2>
        <p>
          You own the content you add to your profile. By publishing a public
          profile, you grant Profile Hub permission to display your content as
          intended by the platform.
        </p>
      </div>

      <div className="ph-legal__section">
        <h2>4. Public profiles</h2>
        <p>
          Public profile content can be viewed by anyone with the link. You are
          responsible for deciding what information you make public.
        </p>
      </div>

      <div className="ph-legal__section">
        <h2>5. Acceptable use</h2>
        <ul>
          <li>Do not upload unlawful, harmful, or misleading content.</li>
          <li>Do not impersonate others or attempt unauthorized access.</li>
          <li>Do not disrupt or abuse the service.</li>
        </ul>
      </div>

      <div className="ph-legal__section">
        <h2>6. Service availability</h2>
        <p>
          The service is provided “as is” and “as available.” We do not
          guarantee uninterrupted service or permanent data retention. You
          should keep backups of important information.
        </p>
      </div>

      <div className="ph-legal__section">
        <h2>7. Termination</h2>
        <p>
          We may restrict or terminate access if misuse is detected or if
          necessary to protect the platform and other users.
        </p>
      </div>

      <div className="ph-legal__section">
        <h2>8. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, Profile Hub is not liable for
          loss of data, loss of opportunities, or indirect or consequential
          damages.
        </p>
      </div>

      <div className="ph-legal__section">
        <h2>9. Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the
          service indicates acceptance of the updated terms.
        </p>
      </div>

      <div className="ph-legal__section ph-legal__section--last">
        <h2>10. Contact</h2>
        <p className="ph-legal__text">
          Questions? Email{" "}
          <a className="ph-legal__link" href="mailto:subbusubramanyam92@gmail.com">
            subbusubramanyam92@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
