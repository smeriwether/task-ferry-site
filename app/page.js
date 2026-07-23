const downloadUrl =
  "https://github.com/smeriwether/task-ferry/releases/latest/download/TaskFerry.dmg";
const sourceUrl = "https://github.com/smeriwether/task-ferry";

function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v12m0 0 5-5m-5 5-5-5M5 21h14" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14m-5-5 5 5-5 5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="10" width="16" height="11" rx="3" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function DownloadButton({ light = false, label = "Download for Mac" }) {
  return (
    <a
      className={`download-button${light ? " download-button-light" : ""}`}
      href={downloadUrl}
      aria-label={`${label} as a DMG`}
    >
      <span>{label}</span>
      <ArrowDownIcon />
    </a>
  );
}

function StatusDot({ coral = false }) {
  return <span className={`status-dot${coral ? " status-dot-coral" : ""}`} />;
}

export default function Home() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "TaskFerry",
    description:
      "A private Mac app that carries Apple Reminders between a personal Mac and another Mac.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "macOS 14 or newer",
    downloadUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does TaskFerry store my reminders?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Apple Reminders remains the source of truth. TaskFerry has no hosted reminder database and no account system."
        }
      },
      {
        "@type": "Question",
        name: "Is TaskFerry available on the Mac App Store?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. TaskFerry is distributed directly as a signed and notarized DMG and includes signed automatic updates."
        }
      },
      {
        "@type": "Question",
        name: "What do I need to use TaskFerry?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Two Macs running macOS 14 or newer, Apple Reminders on the bridge Mac, and your own Cloudflare account with an active domain and Zero Trust enabled."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="site-shell">
        <header className="topbar">
          <a className="brand" href="#top" aria-label="TaskFerry home">
            <img src="/icon-1024.png" alt="" width="44" height="44" />
            <span>TaskFerry</span>
          </a>

          <nav className="nav-links" aria-label="Main navigation">
            <a href="#how-it-works">How it works</a>
            <a href="#privacy">Privacy</a>
          </nav>

          <a className="nav-download" href={downloadUrl}>
            Download <ArrowDownIcon />
          </a>
        </header>

        <main id="top">
          <section className="hero section-pad">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-wave" aria-hidden="true">〰</span>
                A private bridge for Apple Reminders
              </div>
              <h1>
                Your reminders.
                <span>On the Mac you’re using.</span>
              </h1>
              <p className="hero-lede">
                When another Mac—like a work computer—can’t use your personal
                iCloud, TaskFerry lets you read, add, edit, and complete your
                Apple Reminders there through a private connection you control.
              </p>

              <div className="hero-actions">
                <DownloadButton />
                <a className="text-link" href="#how-it-works">
                  See how it works <ArrowIcon />
                </a>
              </div>

              <div className="download-meta" aria-label="Download details">
                <span><CheckIcon /> macOS 14+</span>
                <span><CheckIcon /> Signed &amp; notarized</span>
                <span><CheckIcon /> Free download</span>
              </div>
            </div>

            <div className="hero-art" aria-label="TaskFerry carrying reminders between two Macs">
              <span className="hero-blob hero-blob-one" aria-hidden="true" />
              <span className="hero-blob hero-blob-two" aria-hidden="true" />

              <div className="mac-card mac-card-home">
                <div className="mac-titlebar">
                  <div className="traffic-lights" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                  <span>Personal Mac</span>
                  <span className="mac-state"><StatusDot /> Bridge</span>
                </div>
                <div className="reminder-view">
                  <div className="view-heading">
                    <div>
                      <strong>Today</strong>
                      <span>Thursday, July 23</span>
                    </div>
                    <span className="count">3</span>
                  </div>
                  <div className="reminder-row">
                    <i className="circle purple" />
                    <span>
                      <strong>Call the dentist</strong>
                      <small><b className="dot purple" /> Personal · <em>Overdue</em></small>
                    </span>
                  </div>
                  <div className="reminder-row">
                    <i className="circle purple" />
                    <span>
                      <strong>Renew prescription</strong>
                      <small><b className="dot purple" /> Personal</small>
                    </span>
                  </div>
                  <div className="reminder-row">
                    <i className="circle blue" />
                    <span>
                      <strong>Send the quarterly report</strong>
                      <small><b className="dot blue" /> Work</small>
                    </span>
                  </div>
                </div>
              </div>

              <div className="route-badge" aria-hidden="true">
                <span className="route-line route-line-left" />
                <span className="route-line route-line-right" />
                <img src="/icon-1024.png" alt="" width="112" height="112" />
              </div>

              <div className="mac-card mac-card-work">
                <div className="mac-titlebar">
                  <div className="traffic-lights" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                  <span>Work Mac</span>
                  <span className="mac-state"><StatusDot coral /> Synced</span>
                </div>
                <div className="quick-card">
                  <div className="quick-heading"><span>+</span> Quick Reminder</div>
                  <div className="quick-input">Send agenda before standup</div>
                  <div className="quick-option">
                    <span>List</span>
                    <strong>Work</strong>
                  </div>
                  <div className="quick-option">
                    <span>Due</span>
                    <strong className="today-chip">Today</strong>
                  </div>
                  <div className="quick-submit">Add Reminder</div>
                </div>
              </div>

              <div className="water-lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>
          </section>

          <section id="how-it-works" className="route-section section-pad">
            <div className="section-heading">
              <span className="kicker">One app. Two roles.</span>
              <h2>
                When your other Mac can’t use your personal iCloud. TaskFerry
                bridges the gap.
              </h2>
              <p>
                Keep one personal Mac signed in to iCloud and running TaskFerry
                as the bridge. Then use your reminders from another Mac—like a
                work computer where you can’t sign in to your personal iCloud.
              </p>
              <div className="bridge-requirement">
                <span>Required</span>
                One personal Mac must stay on and connected as the bridge.
              </div>
            </div>

            <div className="role-grid">
              <article className="role-card role-card-blue">
                <div className="role-number">01</div>
                <div className="role-icon" aria-hidden="true">⌂</div>
                <span className="role-label">Required bridge Mac</span>
                <h3>Keep one Mac on as the bridge</h3>
                <p>
                  Choose the Mac that already has your Apple Reminders. It
                  needs to stay powered on and connected so TaskFerry can serve
                  fresh reminders to your other Mac.
                </p>
                <ul>
                  <li><CheckIcon /> Apple Reminders permission</li>
                  <li><CheckIcon /> Stays powered on and connected</li>
                  <li><CheckIcon /> Runs quietly in the background</li>
                </ul>
              </article>

              <div className="crossing" aria-hidden="true">
                <span className="crossing-dots" />
                <div>
                  <LockIcon />
                  <strong>Private crossing</strong>
                  <small>HTTPS + two layers of authentication</small>
                </div>
                <span className="crossing-dots" />
              </div>

              <article className="role-card role-card-coral">
                <div className="role-number">02</div>
                <div className="role-icon" aria-hidden="true">⌘</div>
                <span className="role-label">Everyday Mac</span>
                <h3>Connect from your other Mac</h3>
                <p>
                  Install TaskFerry on the Mac you’re using, paste the
                  connection code, and connect back to the bridge Mac for a
                  fresh, authoritative view.
                </p>
                <ul>
                  <li><CheckIcon /> Today, Tomorrow, and lists</li>
                  <li><CheckIcon /> Create, edit, complete, and delete</li>
                  <li><CheckIcon /> Fast menu-bar capture</li>
                </ul>
              </article>
            </div>
          </section>

          <section id="privacy" className="privacy-section section-pad">
            <div className="privacy-card">
              <div className="privacy-copy">
                <span className="kicker kicker-cream">Private by architecture</span>
                <h2>No TaskFerry cloud.</h2>
                <p>
                  TaskFerry has no account system, hosted database, or developer
                  service sitting between your Macs. Apple Reminders remains the
                  source of truth.
                </p>
                <div className="privacy-points">
                  <div><CheckIcon /><span><strong>Local bridge</strong> listens only on your Mac</span></div>
                  <div><CheckIcon /><span><strong>Your Cloudflare</strong> account owns the private route</span></div>
                  <div><CheckIcon /><span><strong>Keychain storage</strong> keeps connection secrets protected</span></div>
                  <div><CheckIcon /><span><strong>Open source</strong> under the AGPL-3.0-only license</span></div>
                </div>
                <a className="privacy-link" href={sourceUrl}>
                  Read the source on GitHub <ArrowIcon />
                </a>
              </div>

              <div className="security-diagram" aria-label="Private TaskFerry connection diagram">
                <div className="security-node">
                  <span>Personal Mac</span>
                  <strong>Apple Reminders</strong>
                  <small>Source of truth</small>
                </div>
                <div className="security-route">
                  <span />
                  <div><LockIcon /> Encrypted</div>
                  <span />
                </div>
                <div className="security-node">
                  <span>Other Mac</span>
                  <strong>TaskFerry</strong>
                  <small>Fresh snapshots</small>
                </div>
              </div>
            </div>
          </section>

          <section className="faq-section section-pad">
            <div className="section-heading">
              <span className="kicker">A few useful details</span>
              <h2>Before you set sail.</h2>
            </div>

            <div className="faq-list">
              <details>
                <summary>What do I need to use TaskFerry?</summary>
                <p>
                  Two Macs running macOS 14 or newer, Apple Reminders on the
                  bridge Mac, and your own Cloudflare account with an active
                  domain and Zero Trust enabled. Cloudflare’s free plan is
                  sufficient.
                </p>
              </details>
              <details>
                <summary>Does TaskFerry store my reminders?</summary>
                <p>
                  No. Every change is applied to Apple Reminders through
                  EventKit, followed by a fresh snapshot. There is no TaskFerry
                  task database to sync or reconcile.
                </p>
              </details>
              <details>
                <summary>Is it available on the Mac App Store?</summary>
                <p>
                  No. TaskFerry is a direct download. The DMG and app are signed
                  with a Developer ID and notarized by Apple, and the app uses
                  signed automatic updates.
                </p>
              </details>
              <details>
                <summary>What reminder features are supported?</summary>
                <p>
                  Writable lists; incomplete reminders; date-only and timed due
                  dates; Today and Tomorrow; and quick entry. Notes, recurrence,
                  tags, attachments, and completed-history browsing are outside
                  the app’s intentionally focused scope.
                </p>
              </details>
            </div>
          </section>

          <section className="final-cta section-pad">
            <div className="final-cta-inner">
              <div className="final-icon">
                <img src="/icon-1024.png" alt="" width="156" height="156" />
              </div>
              <div>
                <span className="kicker kicker-cream">Ready for the crossing?</span>
                <h2>Bring your reminders aboard.</h2>
                <p>
                  One download, two Macs, and a private route you control.
                </p>
              </div>
              <div className="final-action">
                <DownloadButton light label="Download TaskFerry" />
                <small>DMG · macOS 14 or newer</small>
              </div>
            </div>
          </section>
        </main>

        <footer>
          <div className="footer-brand">
            <img src="/icon-1024.png" alt="" width="48" height="48" />
            <div>
              <strong>TaskFerry</strong>
              <span>Apple Reminders, across your Macs.</span>
            </div>
          </div>
          <div className="footer-links">
            <a href={downloadUrl}>Download</a>
            <a href={sourceUrl}>GitHub</a>
            <a href="mailto:support@merimerimeri.com">Support</a>
            <a href="https://merimerimeri.com/">MeriMeriMeri Software</a>
          </div>
          <p>© 2026 MeriMeriMeri Software LLC</p>
        </footer>
      </div>
    </>
  );
}
