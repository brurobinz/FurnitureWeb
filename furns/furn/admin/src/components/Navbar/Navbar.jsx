import './Navbar.css'
import {assets} from '../../assets/assets'
// eslint-disable-next-line no-unused-vars, react/prop-types
const Navbar = ({onLogout}) => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="" />
        <div className='logout_infor'>
        <img className='profile' src={assets.profile_image} alt="" />
        <img className='logout' onClick={onLogout} src={assets.logout} alt="" />
        </div>
    </div>
  )
}

export default Navbar