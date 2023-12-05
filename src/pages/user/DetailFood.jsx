import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFoodDetail } from "../../apis/foodApi";
import { HeartFilled, HeartOutlined, WechatOutlined } from "@ant-design/icons";
import path from "../../utils/path";

const DetailFood = () => {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const params = useParams("foodId");
  const navigate = useNavigate();
  const [foodDetail, setFoodDetail] = useState({});
  const fetchDetailFood = async (foodId) => {
    const response = await getFoodDetail(foodId);
    if (response.success) {
      setFoodDetail(response.foodDetail);
    } else {
      navigate(path.HOME);
    }
  };
  useEffect(() => {
    fetchDetailFood(params.foodId);
  }, []);
  return (
    foodDetail && (
      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          <p
            className="text-blue-500 cursor-pointer text-lg"
            onClick={() => navigate(-1)}
          >
            Return
          </p>
          <img
            src={
              "https://i1-dulich.vnecdn.net/2020/03/04/7174177733-6c0af1a0b2-b-4778-1583317457.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=W5Ll2-T9398seyb0orXqFA" ||
              "https://daynauan.info.vn/wp-content/uploads/2019/05/suon-non-kho-nuoc-dua.jpg"
            }
            alt="mon-an"
            className="w-full"
          />
          <h2 className="font-bold text-3xl my-5">{foodDetail.foodName}</h2>
          <p>
            <span className="font-bold">ACTIVE TIME:</span>
            <span>24 mins</span>
          </p>
          <p>
            <span className="font-bold">TOTAL TIME:</span>
            <span>24 mins</span>
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex text-xl gap-10 items-center">
            <span>INGREDIENTS</span>
            <span>{foodDetail?.recipe?.ingredients?.length} servings</span>
            <span>
              {foodDetail?.favorite?.some(
                (item) => item.user_id === userLogin.id
              ) ? (
                <HeartFilled className="text-red-500 " />
              ) : (
                <HeartOutlined />
              )}
            </span>
            <span>
              <WechatOutlined />
            </span>
          </div>
          <hr className="h-1 bg-black" />
          {foodDetail?.recipe?.ingredients.map((item) => {
            return (
              <p key={item.id} className="flex gap-4 items-center">
                <span>{item.ingredient.ingredientName}</span>
                <span>{item.quantity}</span>
                <span>{item.unit}</span>
              </p>
            );
          })}
          <hr className="h-1 bg-black" />
          <p>{foodDetail.foodDescription}</p>
        </div>
      </div>
    )
  );
};

export default DetailFood;
