import './ExploreMenu.css';
import { menu_list } from '../../../assets/assets';


// eslint-disable-next-line react/prop-types
const ExploreMenu = ({category,setCategory}) => {
  
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our Menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse array of furniture crafted by excellent artists from around the world, using the finest materials. Our collection is designed to meet your needs and elevate your home decoration, offering a luxurious experience, one piece at a time.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
        
          <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
            <img className={category==item.menu_name?"active":""}src={item.menu_image} alt={item.menu_name} />
            <p>{item.menu_name}</p>
          </div>
        
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
