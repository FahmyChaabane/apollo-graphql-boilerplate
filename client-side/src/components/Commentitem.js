import React, { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const Commentitem = (props) => {
  const [editableComment, seteditableComment] = useState(true);

  return (
    <li>
      <Link to={`/profile/${props.comment.author.id}`}>
        {props.comment.author.userName}
      </Link>
      :
      {editableComment ? (
        <div>
          {props.comment.content}
          <button onClick={() => seteditableComment(false)}>edit</button>
          <button>delete</button>
        </div>
      ) : (
        <div>
          <textarea type="text" value={props.comment.content} />
          <button>save</button>
          <button onClick={() => seteditableComment(true)}>cancel</button>
        </div>
      )}
      <br />
      <small>
        commented at :
        {moment
          .unix(props.comment.createdAt / 1000)
          .format("MMMM Do YYYY, h:mm:ss a")}
      </small>
      <br />
    </li>
  );
};

export default Commentitem;
