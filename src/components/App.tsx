import {
  HashRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { Bird, Books, Checkerboard, CookingPot, Disc, Headphones, Leaf } from "@phosphor-icons/react";
import type { KeyboardEvent, MouseEvent, ReactNode } from "react";
import avianVisitorsPreview from "../assets/images/projects/avian-visitors-ebird.png";
import backspinPreview from "../assets/images/projects/backspin.png";
import empujonPreview from "../assets/images/projects/empujon.png";
import ebirdIcon from "../assets/images/ebird.webp";
import { photoCollections } from "../data/photoCollections";
import type { Photo, PhotoCollection } from "../data/photoCollections";
import "../styles/app.css";

interface AppProps {
  base: string;
}

interface ViewProps {
  base: string;
}

interface Project {
  slug: string;
  title: string;
  tagline: string;
  icon: typeof Bird;
  repoUrl: string;
  siteUrl: string;
  previewImage: string;
  previewAlt: string;
  previewWidth: number;
  previewHeight: number;
  description: ReactNode;
}

const defaultDescription = "A personal site for projects, writing, and photography.";

const projects: Project[] = [
  {
    slug: "backspin",
    title: "Backspin",
    tagline: "Less time choosing, more time listening.",
    icon: Disc,
    repoUrl: "https://github.com/Nicholas-Nazario/backspin",
    siteUrl: "https://backspin.fly.dev/",
    previewImage: backspinPreview.src,
    previewAlt: "Backspin’s Surprise Me page with a vinyl record and the prompt to drop the needle",
    previewWidth: 2424,
    previewHeight: 1366,
    description: (
      <>
        Backspin is a record recommendation app powered by your Discogs collection and Spotify listening data.
        Let Backspin surprise you with the perfect pick from the records you own, narrow it down for
        targeted recommendations, or simply browse your collection with ease.
      </>
    ),
  },
  {
    slug: "empujon",
    title: "Empujón",
    tagline: "A two-player abstract strategy game.",
    icon: Checkerboard,
    repoUrl: "https://github.com/Nicholas-Nazario/empujon",
    siteUrl: "https://empujon.fly.dev/",
    previewImage: empujonPreview.src,
    previewAlt: "Empujón project preview",
    previewWidth: 2400,
    previewHeight: 1260,
    description: (
      <>
        A two-player abstract strategy game inspired by Scott Brady&apos;s <em>Gekitai</em> and <em>Gekitai 2</em>,
        with original presentation. Play together on one device, invite a friend online, or choose a
        computer opponent. Pick Classic or Upgrade mode, place pieces, and push neighboring pieces
        to change the board.
      </>
    ),
  },
  {
    slug: "avian-visitors-ebird",
    title: "Avian Visitors: eBird Edition",
    tagline: "A live bird collage powered by eBird observations.",
    icon: Bird,
    repoUrl: "https://github.com/Nicholas-Nazario/AvianVisitors-eBird/tree/avian-visitors",
    siteUrl: "https://avianvisitors-ebird.fly.dev/",
    previewImage: avianVisitorsPreview.src,
    previewAlt: "Avian Visitors showing recently observed birds near Central Park in a collage",
    previewWidth: 2830,
    previewHeight: 1540,
    description: (
      <>
        This project is a fork of Teddy Warner&apos;s{" "}
        <a href="https://theodore.net/projects/AvianVisitors/" target="_blank" rel="noopener noreferrer">
          Avian Visitors
        </a>{" "}
        project, which relied on a Raspberry Pi and a mic to detect birds. I live in NYC and while
        there are many birds to observe here, the main noises outside my window are car horns.
        Instead, this fork uses{" "}
        <a href="https://ebird.org/home" target="_blank" rel="noopener noreferrer">
          CornellLab eBird
        </a>{" "}
        observation data to visualize birds near any lat/lon location or{" "}
        <a href="https://ebird.org/region/US/hotspots" target="_blank" rel="noopener noreferrer">
          hotspot
        </a>
        . Happy birding!
      </>
    ),
  },
];

function assetUrl(base: string, path: string) {
  return `${base}${path}`;
}

function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    const collectionSlug = location.pathname.match(/^\/photos\/([^/]+)$/)?.[1];
    const collection = photoCollections.find(({ slug }) => slug === collectionSlug);
    let title = "Nicholas Nazario";
    let description = defaultDescription;

    if (location.pathname === "/projects" || location.pathname === "/") {
      title = "Projects · Nicholas Nazario";
      description = "Things I’ve designed, built, and learned from along the way.";
    } else if (location.pathname === "/about") {
      title = "About · Nicholas Nazario";
      description = "Software engineer, birder, reader, cook, and music listener.";
    } else if (location.pathname === "/blog") {
      title = "Blog · Nicholas Nazario";
      description = "Ramblings about mostly nothing. Every now and then, something.";
    } else if (location.pathname === "/photos") {
      title = "Photos · Nicholas Nazario";
      description = "A home for photographs I’ve taken. Usually birds, sometimes other stuff.";
    } else if (collection) {
      title = `${collection.title} · Photos · Nicholas Nazario`;
      description = collection.description;
    } else if (location.pathname !== "/") {
      title = "Page not found · Nicholas Nazario";
    }

    document.title = title;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", description);

    const frame = window.requestAnimationFrame(() => {
      const section = new URLSearchParams(location.search).get("section");
      const requestedTarget = section ? document.getElementById(section) : null;
      const focusTarget = requestedTarget ?? document.querySelector<HTMLElement>("[data-route-heading]");

      if (requestedTarget) {
        requestedTarget.scrollIntoView({ block: "start" });
      } else {
        window.scrollTo({ top: 0, left: 0 });
      }

      focusTarget?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.search]);

  return null;
}

function Header() {
  return (
    <header className="site-header">
      <Link className="site-name" to="/" aria-label="Nicholas Nazario — Home">
        <span className="site-mark" aria-hidden="true"><Leaf weight="fill" /></span>
        <span>Nicholas Nazario</span>
      </Link>
      <nav aria-label="Main navigation">
        <NavLink to="/" end className={() => location.hash.startsWith("#/projects") || !location.hash || location.hash === "#/" ? "active" : undefined}>
          Projects
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "active" : undefined}>
          About
        </NavLink>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} Nicholas Nazario</p>
    </footer>
  );
}

function AboutView() {
  return (
    <section className="page-heading about-heading route-view">
      <h1 data-route-heading tabIndex={-1}>About</h1>
      <p>I’m Nicholas, a software engineer who likes birding, reading, cooking, and listening to music.</p>
      <div className="about-interests" aria-hidden="true">
        <span><Bird weight="duotone" /></span><span><Books weight="duotone" /></span>
        <span><CookingPot weight="duotone" /></span><span><Headphones weight="duotone" /></span>
      </div>
      <h2 className="about-links-heading">Find me elsewhere</h2>
      <div className="about-socials">
        <a href="https://github.com/Nicholas-Nazario" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-1.89c-3.1.67-3.75-1.31-3.75-1.31-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.24.92.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.23-5.07-5.49 0-1.21.43-2.2 1.14-2.97-.12-.28-.5-1.41.1-2.93 0 0 .93-.3 3.05 1.13a10.6 10.6 0 0 1 5.56 0c2.12-1.43 3.05-1.13 3.05-1.13.6 1.52.22 2.65.11 2.93.71.77 1.13 1.76 1.13 2.97 0 4.27-2.6 5.2-5.08 5.48.4.35.75 1.02.75 2.06V22c0 .29.2.64.77.53A11.1 11.1 0 0 0 12 .9Z"/></svg>
          <span className="social-copy"><strong>GitHub</strong><small>Code and projects</small></span><span aria-hidden="true">↗</span>
        </a>
        <a href="https://flic.kr/ps/48fF81" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="7" cy="12" r="4" fill="#0063dc"/><circle cx="17" cy="12" r="4" fill="#ff0084"/></svg>
          <span className="social-copy"><strong>Flickr</strong><small>Photographs</small></span><span aria-hidden="true">↗</span>
        </a>
        <a href="https://ebird.org/profile/ODMxMjkyMw" target="_blank" rel="noopener noreferrer">
          <img className="ebird-icon" src={ebirdIcon.src} alt="" />
          <span className="social-copy"><strong>eBird</strong><small>Bird observations</small></span><span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

function ProjectsView() {
  return (
    <div className="route-view">
      <section className="page-heading projects-heading">
        <h1 data-route-heading tabIndex={-1}>Projects</h1>
        <p>Things I’ve designed, built, and learned from along the way.</p>
      </section>

      <div className="projects-shell">
        <aside className="projects-sidebar">
          <details className="project-contents" open>
            <summary>
              <span>Project index</span>
              <span className="contents-toggle" aria-hidden="true">⌄</span>
            </summary>
            <nav aria-label="Project table of contents">
              <ol>
                {projects.map((project) => (
                  <li key={project.slug}>
                    <Link to={`/projects?section=${project.slug}`}>
                      <strong>{project.title}</strong>
                      <span aria-hidden="true">↓</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </details>
        </aside>

        <div className="project-list">
          {projects.map((project) => (
            <section
              className="project-section"
              id={project.slug}
              aria-labelledby={`${project.slug}-heading`}
              tabIndex={-1}
              key={project.slug}
            >
              <header className="project-header">
                <h2 id={`${project.slug}-heading`}><project.icon className="project-icon" weight="fill" aria-hidden="true" />{project.title}</h2>
                <p className="project-tagline">{project.tagline}</p>
              </header>

              <a className="project-preview" href={project.siteUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={project.previewImage}
                  alt={project.previewAlt}
                  width={project.previewWidth}
                  height={project.previewHeight}
                  loading="lazy"
                  decoding="async"
                />
                <span className="preview-visit">Open live site <span aria-hidden="true">↗</span></span>
              </a>

              <div className="project-copy">
                <p className="project-description">{project.description}</p>
                <div className="project-links">
                  <a className="project-link-primary" href={project.siteUrl} target="_blank" rel="noopener noreferrer">
                    Visit the site <span aria-hidden="true">↗</span>
                  </a>
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    View the repository <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function BlogView() {
  return (
    <div className="route-view">
      <section className="page-heading">
        <p className="eyebrow">Writing</p>
        <h1 data-route-heading tabIndex={-1}>Blog</h1>
        <p>Ramblings about mostly nothing. Every now and then, something.</p>
      </section>
      <div className="empty-state"><span className="leaf">✳</span><p>The first post is on its way.</p></div>
    </div>
  );
}

function CollectionArt({ collection, base }: { collection: PhotoCollection; base: string }) {
  return (
    <div className="collection-art" aria-hidden="true">
      {collection.photos.length > 0 && (
        <div className="collection-collage">
          {collection.photos.slice(0, 3).map((photo) => (
            <img key={photo.src} src={assetUrl(base, photo.src)} alt="" loading="lazy" />
          ))}
        </div>
      )}
      {collection.slug === "birds" ? (
        <>
          <span className="sun"></span>
          <span className="bird bird-one">⌁</span>
          <span className="bird bird-two">⌁</span>
          <span className="branch"></span>
          <span className="grass grass-one"></span>
          <span className="grass grass-two"></span>
        </>
      ) : (
        <>
          <span className="skyline skyline-back"></span>
          <span className="skyline skyline-mid"></span>
          <span className="skyline skyline-front"></span>
          <span className="street-line street-line-one"></span>
          <span className="street-line street-line-two"></span>
          <span className="street-lamp"></span>
        </>
      )}
    </div>
  );
}

function PhotosView({ base }: ViewProps) {
  return (
    <div className="route-view">
      <section className="page-heading photos-heading">
        <p className="eyebrow">Photography</p>
        <h1 data-route-heading tabIndex={-1}>Photos</h1>
        <p>A home for photographs I’ve taken. Usually birds, sometimes other stuff.</p>
      </section>

      <section className="collections" aria-labelledby="collections-heading">
        <div className="section-intro">
          <h2 id="collections-heading">Collections</h2>
        </div>
        <div className="collection-grid">
          {photoCollections.map((collection) => (
            <Link
              className={`collection-card ${collection.slug}`}
              to={`/photos/${collection.slug}`}
              aria-labelledby={`${collection.slug}-heading`}
              key={collection.slug}
            >
              <CollectionArt collection={collection} base={base} />
              <div className="collection-copy">
                <p className="collection-number">{collection.number}</p>
                <h3 id={`${collection.slug}-heading`}>{collection.title}</h3>
                <p>{collection.description}</p>
                <span className="collection-status">
                  {collection.photos.length} photographs <span aria-hidden="true">↗</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="license" className="license" tabIndex={-1}>
        <h2>Photo license</h2>
        <p>
          Unless otherwise stated, photographs on this site are licensed under{" "}
          <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a>.
          Noncommercial sharing is permitted with attribution. Modified versions and commercial
          use require separate written permission.
        </p>
      </section>
    </div>
  );
}

function PhotoViewer({ photos, base, label }: { photos: Photo[]; base: string; label: string }) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);

  const finishClose = useCallback(() => {
    setCurrentIndex(null);
    window.requestAnimationFrame(() => returnFocusRef.current?.focus());
  }, []);

  const closeViewer = useCallback(() => {
    if (dialogRef.current?.open) dialogRef.current.close();
    else finishClose();
  }, [finishClose]);

  useEffect(() => {
    if (currentIndex === null || !dialogRef.current || dialogRef.current.open) return;
    dialogRef.current.showModal();
    closeButtonRef.current?.focus();
  }, [currentIndex]);

  const move = (offset: number) => {
    if (currentIndex === null || photos.length < 2) return;
    setCurrentIndex((currentIndex + offset + photos.length) % photos.length);
  };

  const handleKeys = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  };

  const handleBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) closeViewer();
  };

  const currentPhoto = currentIndex === null ? photos[0] : photos[currentIndex];

  return (
    <>
      <section className="photo-grid" aria-label={`${label} photographs`}>
        {photos.map((photo, index) => (
          <figure key={photo.src}>
            <button
              className="photo-button"
              type="button"
              aria-label={`View ${photo.title}`}
              onClick={(event) => {
                returnFocusRef.current = event.currentTarget;
                setCurrentIndex(index);
              }}
            >
              <img src={assetUrl(base, photo.src)} alt={photo.title} loading={index < 3 ? "eager" : "lazy"} />
              <span className="photo-caption">
                <strong>{photo.title}</strong>
                <span>{photo.subtitle}</span>
              </span>
            </button>
          </figure>
        ))}
      </section>

      <dialog
        ref={dialogRef}
        className="photo-viewer"
        aria-labelledby="viewer-title"
        onClose={finishClose}
        onClick={handleBackdrop}
        onKeyDown={handleKeys}
      >
        {currentPhoto && (
          <div className="viewer-shell">
            <div className="viewer-toolbar">
              <div className="viewer-caption">
                <p id="viewer-title">{currentPhoto.title}</p>
                <span>{currentPhoto.subtitle}</span>
              </div>
              <span className="viewer-counter" aria-live="polite">
                {(currentIndex ?? 0) + 1} / {photos.length}
              </span>
              <button ref={closeButtonRef} className="viewer-close" type="button" aria-label="Close photo viewer" onClick={closeViewer}>×</button>
            </div>
            <div className="viewer-stage">
              <button className="viewer-arrow" type="button" aria-label="Previous photo" disabled={photos.length < 2} onClick={() => move(-1)}>←</button>
              <img src={assetUrl(base, currentPhoto.src)} alt={currentPhoto.title} />
              <button className="viewer-arrow" type="button" aria-label="Next photo" disabled={photos.length < 2} onClick={() => move(1)}>→</button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

function CollectionView({ base }: ViewProps) {
  const { collection: collectionSlug } = useParams();
  const collection = photoCollections.find(({ slug }) => slug === collectionSlug);

  if (!collection) return <NotFoundView />;

  return (
    <div className="route-view">
      <section className="collection-heading">
        <Link className="back-link" to="/photos">← All collections</Link>
        <p className="eyebrow">{collection.number}</p>
        <h1 data-route-heading tabIndex={-1}>{collection.title}</h1>
        <p>{collection.description}</p>
      </section>
      <PhotoViewer photos={collection.photos} base={base} label={collection.title} />
    </div>
  );
}

function NotFoundView() {
  return (
    <section className="not-found route-view">
      <p className="eyebrow">404</p>
      <h1 data-route-heading tabIndex={-1}>That page wandered off.</h1>
      <Link to="/">Return home →</Link>
    </section>
  );
}

function RoutedApp({ base }: AppProps) {
  const location = useLocation();

  return (
    <>
      <RouteEffects />
      <button
        className="skip-link"
        type="button"
        onClick={() => document.getElementById("main-content")?.focus()}
      >
        Skip to content
      </button>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <div className="route-transition" key={`${location.pathname}${location.search}`}>
          <Routes location={location}>
            <Route path="/" element={<ProjectsView />} />
            <Route path="/projects" element={<ProjectsView />} />
            <Route path="/about" element={<AboutView />} />
            <Route path="/blog" element={<BlogView />} />
            <Route path="/photos" element={<PhotosView base={base} />} />
            <Route path="/photos/:collection" element={<CollectionView base={base} />} />
            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function App({ base }: AppProps) {
  return (
    <HashRouter>
      <RoutedApp base={base} />
    </HashRouter>
  );
}
