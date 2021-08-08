import { format, differenceInDays, isToday } from "date-fns";
import React from "react";
import Trash from "../../assets/icons/trash";

interface IPostItem {
  id: string;
  title: string;
  author: string;
  date: string;
  url?: string | null;
  handleDelete: (id: string) => void;
}

const PostItem: React.FC<IPostItem> = ({
  id,
  author,
  date,
  title,
  url,
  handleDelete,
}) => {
  const postDate = new Date(date);
  const isTod = isToday(postDate);

  const difference = differenceInDays(new Date(), postDate);

  const formattedDate = isTod
    ? format(postDate, "p")
    : difference <= 1
    ? "Yesterday"
    : format(postDate, "MMM dd");

  return (
    <li className="post__list__item">
      <a href={url ?? "/"} target="_blank">
        <span className="post__title">{title}</span>
        <span className="post__author">- {author} - </span>
        <span className="post__date">{formattedDate}</span>
      </a>
      <button onClick={() => handleDelete(id)} className="post__delete">
        <Trash />
      </button>
    </li>
  );
};

export default PostItem;
