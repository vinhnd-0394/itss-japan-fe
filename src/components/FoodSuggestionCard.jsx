/* eslint-disable react/prop-types */
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { createFavoriteFood, deleteFavoriteFood } from "../apis/favoriteApi";
import { Link } from "react-router-dom";

const FoodSuggestionCard = (props) => {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));

  const { foodName, foodDescription, id, favorite } = props.food;

  const addFavoriteFood = async (foodId) => {
    await createFavoriteFood(userLogin.id, foodId);
    await props.fetchFoodSuggestions();
  };

  const unlikeFood = async (favoriteId) => {
    const responce = await deleteFavoriteFood(favoriteId);
    if (responce.success && responce.isDeleted) {
      await props.fetchFoodSuggestions();
    }
  };

  const renderLikeIcon = (favorite) => {
    let likedFood = favorite.filter((item) => item.user_id === userLogin.id);
    return likedFood.length > 0 ? (
      <HeartFilled
        className="text-red-500 text-2xl cursor-pointer"
        onClick={() => {
          unlikeFood(likedFood[0].id);
        }}
      />
    ) : (
      <HeartOutlined
        className="text-2xl cursor-pointer"
        onClick={() => {
          addFavoriteFood(id);
        }}
      />
    );
  };
  return (
    <div className="flex gap-4 p-2 bg-slate-200 rounded-lg shadow-lg">
      <img
        src="https://daynauan.info.vn/wp-content/uploads/2019/05/suon-non-kho-nuoc-dua.jpg"
        alt="mon-an"
        className="w-[250px]"
      />
      <div className="flex flex-col">
        <Link className="font-semibold mb-4 text-2xl" to={`/detail-food/${id}`}>
          {foodName}
        </Link>
        <p>{foodDescription}</p>
        {renderLikeIcon(favorite)}
      </div>
    </div>
  );
};

export default FoodSuggestionCard;
