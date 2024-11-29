import { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { StoreContext } from '../../context/StoreContext';
import HelpTab from '../HelpTab/HelpTag'; // Import HelpTab component

const Navbar = ({ setShowLogin }) => {
  const [activeMenu, setActiveMenu] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showHelpTab, setShowHelpTab] = useState(false); // State to control HelpTab visibility
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="Logo" className='logo' /></Link>
      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setActiveMenu('home')} className={activeMenu === 'home' ? 'active' : ''}>Home</Link>
        <a href='/#explore-menu' onClick={() => setActiveMenu('menu')} className={activeMenu === 'menu' ? 'active' : ''}>Menu</a>
        <a href='/#app-download' onClick={() => setActiveMenu('Mobileapp')} className={activeMenu === 'Mobileapp' ? 'active' : ''}>Mobile App</a>
        <a href='/#footer' onClick={() => setActiveMenu('contact-us')} className={activeMenu === 'contact-us' ? 'active' : ''}>Contact Us</a>
      </ul>
      <div className='navbar-right'>
        {showSearch && (
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Search products...'
            className='navbar-search-input'
          />
        )}
        <img src={assets.search_icon} alt="Search" onClick={() => setShowSearch(!showSearch)} />
        <div className='navbar-search-icon'>
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="Cart" />
          </Link>
          {getTotalCartAmount() > 0 && <div className="dot"></div>}
        </div>
        <img 
          src={assets.icon_help} 
           
          className='help-icon' 
          onClick={() => setShowHelpTab(!showHelpTab)} // Toggle HelpTab visibility
        />
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => {
                if (token) {
                  navigate('/myorders');
                } else {
                  setShowLogin(true);
                }
              }}>
                <img src={assets.bag_icon} alt="Order" />Order
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>LogOut</p>
              </li>
            </ul>
          </div>
        )}
        {showHelpTab && <HelpTab setShowHelpTab={setShowHelpTab} />} {/* Render HelpTab */}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default Navbar;
