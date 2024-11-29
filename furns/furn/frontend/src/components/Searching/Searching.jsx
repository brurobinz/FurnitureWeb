import { useState } from 'react';
import './Searching.css'

import { food_list,assets } from '../../assets/assets';
const SearchResults = () => {
  
  const searchProducts = (query) => {
    return food_list.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
     const results = searchProducts(searchQuery);
     setSearchResults(results);
}; 
return(
    <><div className="search-bar">
        <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={handleSearch}>
            <img src={assets.search_icon} alt="Search" />
        </button>
    </div><div className="search-results">
            {searchResults.length > 0 ? (
                searchResults.map(product => (
                    <div key={product._id} className="product">
                        <img src={product.image} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                    </div>
                ))
            ) : (
                <p>No products found</p>
            )}
        </div></>
  
)
}
 

export default SearchResults;
