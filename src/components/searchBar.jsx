import { useContext, useEffect, useState } from 'react';
import { Shop } from '../context/Shop';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } = useContext(Shop); 
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('collection') && showSearch) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location, showSearch]);

  if (!visible) return null;

  return (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center border border-gray-400 px-3 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm pr-2"
          type="text"
          placeholder="Search"
        />
        <img className="w-4 ml-2" src={assets.search_icon} alt="Search Icon" />
      </div>
      <img
        onClick={() => setShowSearch(false)} 
        className="inline w-3 cursor-pointer"
        src={assets.cross_icon}
        alt="Close Icon"
      />
    </div>
  );
}

export default SearchBar;
