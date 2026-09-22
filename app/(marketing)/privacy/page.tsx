import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Skilly",
};

export default function PrivacyPage() {
  return (
    <div className="bg-secondary">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
        <p className="text-chart-3 text-sm mt-2">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>

        <div className="mt-8 space-y-8 text-foreground/90">
          <section>
            <h2 className="text-xl font-semibold text-foreground">
              1. What This Is
            </h2>
            <p className="mt-2 text-chart-3">
              Skilly is an academic thesis project (BS Computer Science,
              University of Malakand) that provides AI-powered career guidance.
              This policy explains what information Skilly collects and how it
              is used.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              2. Information We Collect
            </h2>
            <p className="mt-2 text-chart-3">
              When you create an account and use Skilly, we collect:
            </p>
            <ul className="list-disc pl-6 mt-2 text-chart-3 space-y-1">
              <li>
                Account information: your name, email address, and password
                (stored as a secure hash, never in plain text)
              </li>
              <li>
                Profile information you choose to provide: education, work
                experience, skills, languages, certifications, and career
                interests
              </li>
              <li>A profile picture, if you upload one</li>
              <li>
                Career recommendations and skill goals generated through your
                use of the platform
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              3. How We Use Your Information
            </h2>
            <p className="mt-2 text-chart-3">Your information is used to:</p>
            <ul className="list-disc pl-6 mt-2 text-chart-3 space-y-1">
              <li>Provide your account and display your profile back to you</li>
              <li>
                Generate personalized career recommendations, sent to a
                third-party AI provider (Google Gemini) as part of that analysis
              </li>
              <li>
                Send account-related emails, such as email verification and
                password reset links
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              4. Third-Party Services
            </h2>
            <p className="mt-2 text-chart-3">
              Skilly relies on the following third-party services to operate:
            </p>
            <ul className="list-disc pl-6 mt-2 text-chart-3 space-y-1">
              <li>
                <strong>Google Gemini</strong> — processes your profile data to
                generate career recommendations
              </li>
              <li>
                <strong>Cloudinary</strong> — stores profile pictures you upload
              </li>
              <li>
                <strong>Resend</strong> — sends verification and password reset
                emails
              </li>
              <li>
                <strong>Neon (PostgreSQL)</strong> — stores your account and
                profile data
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              5. Data Retention and Deletion
            </h2>
            <p className="mt-2 text-chart-3">
              Your data is retained for as long as your account exists. You can
              permanently delete your account and all associated data at any
              time from Settings. This action is immediate and cannot be undone.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              6. Cookies
            </h2>
            <p className="mt-2 text-chart-3">
              Skilly uses a session cookie to keep you logged in. This cookie is
              essential to the app functioning and does not track you across
              other websites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">
              7. Contact
            </h2>
            <p className="mt-2 text-chart-3">
              Questions about this policy can be sent through the{" "}
              <a href="/contact" className="text-primary font-medium">
                Contact page
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
