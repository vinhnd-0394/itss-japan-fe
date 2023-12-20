/* eslint-disable react/no-unescaped-entities */
import { Fragment, useEffect, useState } from "react";
import { getFavoriteFoods } from "../../apis/favoriteApi";
import FavoriteFoodCard from "../../components/FavoriteFoodCard.jsx";
import { SearchOutlined } from "@ant-design/icons";
const FavoriteFood = () => {
  const user = localStorage.getItem("userLogin");
  const userData = JSON.parse(user);
  const [favorites, setFavorites] = useState([]);
  const fetchFavoriteFoods = async () => {
    const response = await getFavoriteFoods(userData.id);
    if (response.success) {
      setFavorites(response.favoriteFoods);
    }
  };

  useEffect(() => {
    fetchFavoriteFoods();
  }, []);
  return (
    <Fragment>
      <div className="p-2">
        <div>
          <form>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <SearchOutlined className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search your favorite food"
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <FavoriteFoodCard key={favorite.id} food={favorite.food} />
          ))
        ) : (
          <p>You don't have favorite food</p>
        )}
      </div>
    </Fragment>
  );
};

export default FavoriteFood;
