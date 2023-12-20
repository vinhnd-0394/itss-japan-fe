import { StarFilled } from "@ant-design/icons";
const CommentCard = (props) => {
  return (
    <div className="flex justify-between bg-gray-300 p-5 m-3">
      <p className="text-2xl">{props.comment.content}</p>
      <div className="flex items-center text-2xl font-bold">
        {props.comment.star} <StarFilled className="text-yellow-400 ml-1" />
      </div>
    </div>
  );
};

export default CommentCard;
