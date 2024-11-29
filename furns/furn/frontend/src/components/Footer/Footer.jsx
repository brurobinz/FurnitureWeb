import { assets } from '../../assets/assets'
import './Footer.css'

const Footer = () => {
  return (
    <div className="footer" id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img className='footer-logo' src={assets.logo} alt="" />
            <p>Luxurious furniture refers to high-end, premium-quality pieces that often combine exceptional craftsmanship, rare materials, unique designs, and a sense of elegance or opulence. These items are often associated with exclusivity, comfort, and attention to detail.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>CUONG COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>

        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>098-765-432-1</li>
                <li>cuongmp40@gmail.com</li>
            </ul>

        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2024 CuongFurniture.com - All Right Reserved</p>
    </div>
  )
}

export default Footer
