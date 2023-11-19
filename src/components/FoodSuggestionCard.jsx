const FoodSuggestionCard = (props) => {
  // eslint-disable-next-line react/prop-types
  const { foodName, foodDescription } = props.food;
  return (
    <div className="flex gap-4 p-2 bg-slate-200 rounded-lg shadow-lg">
      <img
        src="https://daynauan.info.vn/wp-content/uploads/2019/05/suon-non-kho-nuoc-dua.jpg"
        alt="mon-an"
        className="w-[300px]"
      />
      <div>
        <h2 className="font-semibold mb-4">{foodName}</h2>
        <p>{foodDescription}</p>
      </div>
    </div>
  );
};

export default FoodSuggestionCard;
