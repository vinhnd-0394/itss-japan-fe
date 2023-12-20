import { ClockCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const FoodSearchCard = ({ foodName, foodDescription, foodId }) => {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  return (
    <div className="flex gap-4 p-2 bg-slate-200 rounded-lg shadow-lg">
      <img
        src="https://daynauan.info.vn/wp-content/uploads/2019/05/suon-non-kho-nuoc-dua.jpg"
        alt="mon-an"
        className="w-[250px]"
      />
      <div className="flex flex-col gap-4">
        <Link
          className="font-semibold mb-4 text-2xl"
          to={userLogin.isAdmin ? `/admin/detail-food/${foodId}` : `/detail-food/${foodId}`}
        >
          {foodName}
        </Link>
        <p>{foodDescription}</p>
        <p>
          <ClockCircleOutlined /> 15:30
        </p>
      </div>
    </div>
  );
};

export default FoodSearchCard;
