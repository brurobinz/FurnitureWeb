import { useContext} from 'react'
import { assets } from '../../assets/assets'
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext';


// eslint-disable-next-line react/prop-types
const FoodItem = ({id,name,price,description,image}) => {
    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);
    
    return (
    <div className='food-item'>
        <div className="food-item-container">
            <img className='food-item-image' src={url+"/images/"+image} alt="" />

            {!cartItems[id]
                ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="Add"></img>
                : <div className="food-item-counter">
                    <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="Remove"></img>
                    <p>{cartItems[id]}</p>
                    <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="Add more"></img>
                </div>

            }
        </div>


        <div className="food-item-infor">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="Rating stars" />
            </div>
            <p className="food-item-desc">
                {description}
            </p>
            <p className="food-item-price">${price}</p>
        </div>
      
    </div>
  )
}



export default FoodItem

