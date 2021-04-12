import React, { useState } from "react";
import moment from "moment";
import Commentitem from "./Commentitem";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  GET_POSTS,
  REMOVE_POST,
  UPDATE_POST,
} from "../services/apollo/queries";

const Postitem = (props) => {
  const { post } = props;

  const [editablePost, seteditablePost] = useState(true);
  const [TobeUpdatedPost, setUpdatePost] = useState(props.post.content);

  const [updatePost] = useMutation(UPDATE_POST);
  const [removePost] = useMutation(REMOVE_POST);

  const onPostChange = ({ target }) => {
    const input = target.value;
    setUpdatePost(input);
  };

  const onSavePost = () => {
    updatePost({
      variables: { id: post.id, data: { content: TobeUpdatedPost } },
      //refetchQueries: [{ query: GET_POSTS }],
    });
    seteditablePost(true);
  };

  const onDeletePost = () => {
    removePost({
      variables: { id: post.id },
      refetchQueries: [{ query: GET_POSTS }],
    });
    seteditablePost(true);
  };

  const createComment = () => {
    console.log("clicked");
  };

  return (
    <li>
      <Link to={`/profile/${post.author.id}`}>{post.author.userName}</Link>:
      {editablePost ? (
        <div>
          {post.content.split("\n").map((item, key) => {
            return (
              <React.Fragment key={key}>
                {item}
                <br />
              </React.Fragment>
            );
          })}
          <button>expand</button>
          <button onClick={() => seteditablePost(false)}>edit</button>
          <button onClick={onDeletePost}>delete</button>
        </div>
      ) : (
        <div>
          <textarea
            type="text"
            value={TobeUpdatedPost}
            onChange={onPostChange}
          />
          <button onClick={onSavePost}>save</button>
          <button onClick={() => seteditablePost(true)}>cancel</button>
        </div>
      )}
      <br />
      <small>
        posted at :
        {moment.unix(post.createdAt / 1000).format("MMMM Do YYYY, h:mm:ss a")}
      </small>
      <br />
      {post.comments && (
        <ul>
          comments :
          {post.comments.map((comment) => (
            <Commentitem key={comment.id} comment={comment} />
          ))}
        </ul>
      )}
      <input type="text" placeholder="add comment" />{" "}
      <button onClick={createComment}>comment</button>
      <hr />
    </li>
  );
};

export default Postitem;
