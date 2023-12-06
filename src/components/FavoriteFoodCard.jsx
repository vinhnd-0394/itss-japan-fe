import { DeleteOutlined, StarFilled } from "@ant-design/icons";

const FavoriteFoodCard = (props) => {
  // eslint-disable-next-line react/prop-types
  const name = props.food?.foodName;
  // eslint-disable-next-line react/prop-types
  const description = props.food?.foodDescription;
  return (
    <div className="grid grid-cols-3 p-2 bg-slate-200 rounded-lg shadow-lg mt-3">
      <div className="flex">
        <StarFilled
          style={{ fontSize: "24px" }}
          className="text-yellow-400 mr-3"
        />
        <img
          src="https://daynauan.info.vn/wp-content/uploads/2019/05/suon-non-kho-nuoc-dua.jpg"
          alt="mon-an"
          className="w-[250px]"
        />
      </div>
      <div>
        <h2 className="font-semibold mb-4 text-3xl">{name}</h2>
        <p>{description}</p>
      </div>
      <div>
        <button>
          <DeleteOutlined
            style={{ fontSize: "24px", position: "absolute", right: "3em" }}
          />
        </button>
      </div>
    </div>
  );
};

export default FavoriteFoodCard;
