import { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import PropTypes from 'prop-types';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  

  // Lọc danh sách sản phẩm theo category
  const filteredFoodList = food_list.filter(item => 
    category.toLowerCase() === "all" || item.category.toLowerCase() === category.toLowerCase()
  );

  

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Furnitures near you</h2>
      <div className="food-display-list">
        {filteredFoodList.length > 0 ? (
          filteredFoodList.map(item => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p>No items found in this category.</p>
        )}
      </div>
    </div>
  );
};

FoodDisplay.propTypes = {
  category: PropTypes.string.isRequired,
};

export default FoodDisplay;
