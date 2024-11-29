import { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import axios from "axios";

const Cart = () => {
  const [notification, setNotification] = useState("");

  const handleClaim = (voucherName) => {
    setNotification(`${voucherName} claimed successfully!`);
    setTimeout(() => {
      setNotification(""); // Clear the notification after 3 seconds
    }, 7000);
  };
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, promoDiscount} =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);  // Store the discount percentage
  const [promoMessage, setPromoMessage] = useState("");  // For error/success message
  const { applyPromoCode } = useContext(StoreContext);
  const promoImages = [
    assets.voucher,
    assets.free_ship,
    assets.offsale,
    assets.qrcode,
    assets.sale2,
    assets.sale1,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === promoImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500); 

    return () => clearInterval(slideInterval); 
  }, [promoImages.length]);

  // Handle promo code input change
  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  // Handle promo code submission
  const handlePromoCodeSubmit = async () => {
    if (!promoCode) {
      setPromoMessage("Please enter a promo code.");
      return;
    }
    try {
      const response = await axios.post('http://localhost:4000/api/sale/validate-promo', { code: promoCode });
      if (response.data.success) {
        const discount = response.data.discount; 
        applyPromoCode(discount); 
        setPromoMessage(`Promo code applied: ${discount}% discount!`);
      } else {
        setPromoMessage('Invalid promo code.');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setPromoMessage('Error validating promo code.');
    }
  };

  
  const subtotal = getTotalCartAmount();
  const deliveryFee = 2; 
  const totalAmount = (subtotal + deliveryFee) * (1 - discount / 100);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p
                    onClick={() => removeFromCart(item._id)}
                    className="cross"
                  >
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}

        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${subtotal}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${deliveryFee}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${totalAmount.toFixed(2)}</b>
              </div>
              <button onClick={() => navigate("/order")}>
                PROCESS TO CHECKOUT
              </button>
            </div>

            <div className="cart-promocode">
              <div className="container2">
                <div className="voucher-slider">
                  <div
                    className="voucher-wrapper"
                    style={{
                      transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                  >
                    {promoImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Promo ${index}`}
                        className="imgv1"
                      />
                    ))}
                  </div>
                </div>
                <img src={assets.sale4} alt="Sale 4" className="sale4" />
                <div><img src={assets.star1} alt="Star 1" className="star1" /></div>
              </div>

              <div className="image-container">
                <img src={assets.sale3} alt="Sale 3" className="sale3" />
                <div className="twinkling-star"></div>
                <div className="twinkling-star1"></div>
                <div className="twinkling-star2"></div>
                <div className="twinkling-star3"></div>
                <div className="twinkling-star4"></div>
                <div className="twinkling-star5"></div>
                <div><img src={assets.sale_icon} alt="Sale Icon" className="sale_icon" /></div>
              </div>
              <div className="voucher_list">

                <div className="voucher_container">
                    <img src={assets.save1} alt="" className="save1"/>
                    <button onClick={() => handleClaim("Congratulate! You receive a 20% promo code : jhs8okOD9331")} className="button_voucher1">Claim</button>
                    
                </div>
                <div className="voucher_container">
                    <img src={assets.save2} alt="" className="save1"/>
                    <button onClick={() => handleClaim("Congratulate! You receive a 40% promo code : jdakdkal11DH3")} className="button_voucher1">Claim</button>
                    
                </div>
                <div className="voucher_container">
                    <img src={assets.save3} alt="" className="save1"/>
                    <button onClick={() => handleClaim("Congratulate! You receive a 10% promo code : tgakdkal11DH9")} className="button_voucher1">Claim</button>
                    
                </div>
                <div className="voucher_container">
                    <img src={assets.save4} alt="" className="save1"/>
                    <button onClick={() => handleClaim("Congratulate! You receive a 50% promo code : lsaa4dkal1Huj")} className="button_voucher1">Claim</button>
                    
                </div>

              </div>
              <div className="voucher_list">
              {notification && <div className="notification">{notification}</div>} 

                <div className="voucher_container">
                    <img src={assets.save5} alt="" className="save1"/>
                    <button onClick={() => handleClaim("Congratulate! You receive a 5% promo code : 34kkddsfkwfo10")} className="button_voucher1">Claim</button>
                    
                </div>
                <div className="voucher_container">
                    <img src={assets.save6} alt="" className="save1"/>
                    <button onClick={() => handleClaim("Congratulate! You receive a 7% promo code : lall6dsfkwfo10")} className="button_voucher1">Claim</button>
                    
                </div>
                <div className="voucher_container">
                    <img src={assets.save7} alt="" className="save1"/>
                    <button onClick={() => handleClaim("Congratulate! You receive a 50% promo code : summertime")} className="button_voucher1">Claim</button>
                    
                </div>
                <div className="voucher_container">
                    <img src={assets.save8} alt="" className="save1"/>
                    <button onClick={() => handleClaim("Congratulate! You receive a 30% promo code : kO1O2KDLPQs")} className="button_voucher1">Claim</button>
                    
                </div>

              </div>

              <div>
                <p>If you have a promo code, enter it here:</p>
                <div className="cart-promocode-input">
                  <input
                    className="input-code"
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={handlePromoCodeChange}
                  />
                  <button onClick={handlePromoCodeSubmit}>Enter</button>
                </div>
                {promoMessage && <p className="promo-message">{promoMessage}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
