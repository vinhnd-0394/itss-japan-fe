/* eslint-disable react/prop-types */
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { createFavoriteFood } from "../apis/favoriteApi";
import { Link } from "react-router-dom";

const FoodSuggestionCard = (props) => {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const addFavoriteFood = async (foodId) => {
    await createFavoriteFood(userLogin.id, foodId);
  };
  const { foodName, foodDescription, id, favorite } = props.food;
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
        <span className="cursor-pointer" onClick={() => addFavoriteFood(id)}>
          {favorite.some((item) => item.user_id === userLogin.id) ? (
            <HeartFilled className="text-red-500 text-xl" />
          ) : (
            <HeartOutlined className="text-xl" />
          )}
        </span>
      </div>
    </div>
  );
};

export default FoodSuggestionCard;
