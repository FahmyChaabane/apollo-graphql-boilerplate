import React, { useState, useEffect } from "react";
import onCustomError, {
  MUTATING,
  QUERYING,
} from "../services/apollo/errorsHandler";
import { useQuery, useMutation } from "@apollo/client";
import {
  CREATE_COMMENT,
  GET_POST,
  GET_POSTS,
  REMOVE_POST,
  UPDATE_POST,
} from "../services/apollo/queries";
import loader from "../images/loader.gif";
import Commentitem from "./Commentitem";
import { useParams, useHistory } from "react-router-dom";
import currentUser, { isToBeShownButton } from "../services/apollo/cache";
import moment from "moment";

const Post = () => {
  let post;
  const history = useHistory();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_POST, {
    variables: {
      id,
    },
    onError: () => {
      return onCustomError(QUERYING);
    },
  });

  const [deleted, setDeleted] = useState(false);
  const [editablePost, seteditablePost] = useState(true);
  const [TobeUpdatedPost, setUpdatePost] = useState("");
  const [newComment, setnewComment] = useState("");

  useEffect(() => {
    if (post) setUpdatePost(post.content);
    // soit tjibou mel cache, sinon aandekch le droit t'accedi mel url
    else {
      history.push("/home");
    }
  }, []);

  const [updatePost] = useMutation(UPDATE_POST, {
    onError: () => onCustomError(MUTATING),
  });
  const [removePost] = useMutation(REMOVE_POST, {
    onError: () => onCustomError(MUTATING),
  });
  const [
    createNewComment,
    { loading: mutationLoading },
  ] = useMutation(CREATE_COMMENT, { onError: () => onCustomError(MUTATING) });

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
    //    seteditablePost(true);
    setDeleted(true);
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
  if (deleted)
    return (
      <h4>Post has been deleted, you propably go back to the home page</h4>
    );

  if (loading) return <img src={loader} />;
  if (error) {
    console.log(error.message);
    return (
      <h3>Error! Post either not exist in our database or has been deleted</h3>
    );
  }
  post = data.post;
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
      {post.comments.length !== 0 && (
        <div>
          comments :
          <ul>
            {post.comments.map((comment) => (
              <Commentitem key={comment.id} comment={comment} />
            ))}
          </ul>
        </div>
      )}
      {mutationLoading && (
        <div>
          <img src={loader} />
        </div>
      )}
      <br />
      <input
        type="text"
        placeholder="add comment"
        value={newComment}
        onChange={onNewCommentChange}
      />
      <button disabled={_.isEmpty(newComment)} onClick={createComment}>
        comment
      </button>
    </div>
  );
};
export default Post;
