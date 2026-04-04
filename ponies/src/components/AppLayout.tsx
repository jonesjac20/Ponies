import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import '../styles/Layout.css';

const ROUTE_TITLES: Record<string, string> = {
  '/': 'Home',
  '/leaderboard': 'Leaderboard',
  '/admin': 'Admin',
};

export default function AppLayout() {
  const { pathname } = useLocation();
  const title = ROUTE_TITLES[pathname] ?? 'Ponies';
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__spacer" aria-hidden />
        <h1 className="app-header__title">{title}</h1>
        <div className="app-header__actions">
          <button
            type="button"
            className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
            aria-expanded={menuOpen}
            aria-controls="nav-drawer"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="hamburger__bar" />
            <span className="hamburger__bar" />
            <span className="hamburger__bar" />
          </button>
        </div>
      </header>

      {menuOpen && (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav
        id="nav-drawer"
        className={`nav-drawer ${menuOpen ? 'nav-drawer--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="nav-drawer__header">Navigate</div>
        <NavLink
          className={({ isActive }) =>
            `nav-drawer__link${isActive ? ' nav-drawer__link--active' : ''}`
          }
          to="/"
          end
          onClick={() => setMenuOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `nav-drawer__link${isActive ? ' nav-drawer__link--active' : ''}`
          }
          to="/leaderboard"
          onClick={() => setMenuOpen(false)}
        >
          Leaderboard
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `nav-drawer__link${isActive ? ' nav-drawer__link--active' : ''}`
          }
          to="/admin"
          onClick={() => setMenuOpen(false)}
        >
          Admin
        </NavLink>
      </nav>

      <main className="app-main">
        <div className="app-main__inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
