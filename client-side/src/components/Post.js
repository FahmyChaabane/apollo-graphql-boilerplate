import React, { useState, useEffect } from "react";
import onErrorMutation, { MUTATING } from "../services/apollo/errorsHandler";
import { useQuery, useMutation } from "@apollo/client";
import {
  CREATE_COMMENT,
  GET_POST,
  REMOVE_POST,
  UPDATE_POST,
} from "../services/apollo/queries";
import loader from "../images/loader.gif";
import Commentitem from "./Commentitem";
import { useParams } from "react-router-dom";
import { isToBeShownButton } from "../services/apollo/cache";
import moment from "moment";

const Post = () => {
  const onError = () => onErrorMutation(MUTATING);

  const [editablePost, seteditablePost] = useState(true);
  const [TobeUpdatedPost, setUpdatePost] = useState("");
  const [newComment, setnewComment] = useState("");
  /*
  useEffect(() => {
    setUpdatePost(post.content);
  }, []);
  */

  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_POST, {
    variables: {
      id,
    },
    onError: () => onError(QUERYING),
  });
  const [updatePost] = useMutation(UPDATE_POST, { onError });
  const [removePost] = useMutation(REMOVE_POST, { onError });
  const [
    createNewComment,
    { loading: mutationLoading },
  ] = useMutation(CREATE_COMMENT, { onError });

  const onPostChange = ({ target }) => {
    const input = target.value;
    setUpdatePost(input);
  };

  const onSavePost = () => {
    updatePost({
      variables: { id: post.id, data: { content: TobeUpdatedPost } },
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

  const onNewCommentChange = ({ target }) => {
    const input = target.value;
    setnewComment(input);
  };

  const createComment = () => {
    createNewComment({
      variables: {
        data: {
          content: newComment,
          author: currentUser()._id,
          post: post.id,
        },
      },
      refetchQueries: [{ query: GET_POSTS }],
    });
    setnewComment("");
  };

  if (loading) return <img src={loader} />;
  if (error) return `Error! ${error.message}`;
  const { post } = data;
  return (
    <div>
      {post.author.userName}
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

          {isToBeShownButton(post.author.id) && (
            <React.Fragment>
              <button onClick={() => seteditablePost(false)}>edit</button>
              <button onClick={onDeletePost}>delete</button>
            </React.Fragment>
          )}
        </div>
      ) : (
        <div>
          <textarea
            type="text"
            value={TobeUpdatedPost}
            onChange={onPostChange}
          />
          <button disabled={_.isEmpty(TobeUpdatedPost)} onClick={onSavePost}>
            save
          </button>
          <button
            onClick={() => {
              seteditablePost(true);
              setUpdatePost(post.content);
            }}
          >
            cancel
          </button>
        </div>
      )}
      <small>
        posted at :
        {moment.unix(post.createdAt / 1000).format("MMMM Do YYYY, h:mm:ss a")}
      </small>
      <br />
      {post.comments.length !== 0 && (
        <ul>
          comments :
          {post.comments.map((comment) => (
            <Commentitem key={comment.id} comment={comment} />
          ))}
        </ul>
      )}
      {mutationLoading && (
        <div>
          <img src={loader} />
        </div>
      )}
      <input
        type="text"
        placeholder="add comment"
        value={newComment}
        onChange={onNewCommentChange}
      />
      <button disabled={_.isEmpty(newComment)} onClick={createComment}>
        comment
      </button>
      <hr />
    </div>
  );
};
export default Post;
