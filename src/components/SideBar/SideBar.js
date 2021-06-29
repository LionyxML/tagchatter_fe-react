import './SideBar.css';
import logo from '../../assets/images/logo.png';

function Header() {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <img src={logo} alt="Tagview Logo"/>
      </div>
    </aside>
  );
}

export default Header;
