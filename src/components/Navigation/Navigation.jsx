import { NavLink, Outlet } from "react-router-dom";
import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <>
      <nav className={css.head}>
        <NavLink to="/" aria-label="Go to homepage">
          <svg className={css.logo} width="104" height="16" viewBox="0 0 104 16">
            <use href="../../../public/Logo.svg" />
          </svg>
        </NavLink>

        <div className={css.navLinks}>
          <NavLink
            className={({ isActive }) =>
              `${css.link} ${isActive ? css.active : ''}`
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `${css.link} ${isActive ? css.active : ''}`
            }
            to="/catalog"
          >
            Catalog
          </NavLink>
        </div>
      </nav>

      {/* 🔥 Важливо: тут рендеряться всі вкладені маршрути */}
      <Outlet />
    </>
  );
}