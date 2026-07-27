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
import type { KeyboardEvent, MouseEvent } from "react";
import { photoCollections } from "../data/photoCollections";
import type { Photo, PhotoCollection } from "../data/photoCollections";
import "../styles/app.css";

interface AppProps {
  base: string;
}

interface ViewProps {
  base: string;
}

const defaultDescription = "A personal site for writing, photography, and ideas.";

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

    if (location.pathname === "/blog") {
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
      <Link className="site-name" to="/">
        <span className="site-mark" aria-hidden="true">✦</span>
        <span>Nicholas Nazario</span>
      </Link>
      <nav aria-label="Main navigation">
        <NavLink to="/blog" className={({ isActive }) => isActive ? "active" : undefined}>
          <span>01</span> Blog
        </NavLink>
        <NavLink to="/photos" className={({ isActive }) => isActive ? "active" : undefined}>
          <span>02</span> Photos
        </NavLink>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} Nicholas Nazario</p>
      <Link to="/photos?section=license">Photo license</Link>
    </footer>
  );
}

function HomeView() {
  return (
    <section className="hero route-view">
      <div className="hero-copy">
        <h1 data-route-heading tabIndex={-1}>Hi There 👋</h1>
        <p className="intro">
          I’m a software engineer who likes birding, reading, cooking, and listening to music.
        </p>
        <div className="hero-links">
          <Link className="primary-link" to="/blog">Read the blog <span>→</span></Link>
          <Link to="/photos">Browse the photos <span>→</span></Link>
        </div>
      </div>
      <div className="hero-art" aria-label="An abstract moon over a lush horizon" role="img">
        <div className="moon"></div>
        <div className="sun-glow"></div>
        <div className="ridge ridge-back"></div>
        <div className="ridge ridge-front"></div>
        <div className="stem stem-left"><i></i><i></i><i></i></div>
        <div className="stem stem-right"><i></i><i></i></div>
      </div>
    </section>
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
            <Route path="/" element={<HomeView />} />
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
