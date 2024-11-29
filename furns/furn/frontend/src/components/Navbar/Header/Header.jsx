import './Header.css'
import  { useState } from 'react';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState('menu');
  return (
    <div className="header">
      <div className="header-content">
        <h2>Order Your Favorite Furnitures</h2>
        <p>Choose from diverse menu fearturing a various array of Furniture craft with the excelent Artists around the world and finest ingredient which satisfy your demand and make your home decoration more luxurious, one better experience at a time.   </p>
        <button href='/#explore-menu' onClick={() => setActiveMenu('menu')} className={activeMenu === 'menu' ? 'active' : ''}>View Menu</button>
      </div>
    </div>
  )
}

export default Header
