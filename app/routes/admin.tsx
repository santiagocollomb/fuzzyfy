import { ActionFunction, Link } from "remix";
import { Outlet } from "remix";
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

export const action: ActionFunction = async ({ request }) => {
  return {};
};

const Admin = () => {
  const links = [
    { href: "", text: "Inicio" },
    { href: "buscar", text: "Buscar" },
    { href: "perfil", text: "Perfil" },
  ];
  return (
    <div className="layout">
      <div className="nav">
        <nav className="nav__container">
          <Link to="/admin" className="nav__link nav__logo">
            <i className="bx bxs-disc nav__icon"></i>
            <span className="nav__logo-name">Fuzzyfy</span>
          </Link>
          <div className="nav__list">
            <div className="nav__items">
              <h3 className="nav__subtitle">Admin</h3>
              {links.map((link) => (
                <Link to={link.href} className="nav__link active">
                  <span className="nav__name">{link.text}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
