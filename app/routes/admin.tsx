import { Link, Outlet } from "remix";
import adminStyles from "../styles/admin.css";
import tracklistStyles from "../styles/tracklist.css";
import artistCardStyles from "../styles/artistCard.css";
import profileStyles from "../styles/profile.css";

export const links = () => {
  return [
    { rel: "stylesheet", href: adminStyles },
    { rel: "stylesheet", href: tracklistStyles },
    { rel: "stylesheet", href: artistCardStyles },
    { rel: "stylesheet", href: profileStyles },
  ];
};

const Admin = () => {
  const links = [
    { href: "", text: "Inicio" },
    { href: "buscar", text: "Buscar" },
    { href: "perfil", text: "Perfil" },
  ];
  return (
    <div className="layout">
      <header className="header">
        <Link to="/admin" className="logo">
          Fuzzyfy
        </Link>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>
        <ul className="menu">
          {links.map((link) => (
            <li key={link.text}>
              <Link to={link.href}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
