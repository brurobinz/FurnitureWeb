import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Add Item</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>List Items</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>The Orders</p>
            </NavLink>
            <NavLink to='/help' className="sidebar-option">
                <img className='mes' src={assets.mes_icon} alt="" />
                <p>Helps</p>
            </NavLink>
            <NavLink to='/sale' className="sidebar-option">
                <img className='mes' src={assets.discount} alt="" />
                <p>Add promo</p>
            </NavLink>
        </div>

    </div>
  )
}

export default Sidebar