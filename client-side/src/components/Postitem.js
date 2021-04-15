import React, { useState, useEffect } from "react";
import { isToBeShownButton } from "../services/apollo/cache";
import onErrorMutation, { MUTATING } from "../services/apollo/errorsHandler";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  GET_POSTS,
  REMOVE_POST,
  UPDATE_POST,
} from "../services/apollo/queries";
import moment from "moment";
import _ from "lodash";
import { useHistory } from "react-router-dom";

const Postitem = (props) => {
  const { post } = props;
  const history = useHistory();
  const onError = () => onErrorMutation(MUTATING);

  const [editablePost, seteditablePost] = useState(true);
  const [TobeUpdatedPost, setUpdatePost] = useState("");
  useEffect(() => {
    setUpdatePost(post.content);
  }, []);

  const [updatePost] = useMutation(UPDATE_POST, { onError });
  const [removePost] = useMutation(REMOVE_POST, { onError });

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
          <button onClick={() => history.push(`/post/${post.id}`)}>
            expand
          </button>
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
      {post.comments.length === 0 ? (
        <p>This post has no submitted comment yet</p>
      ) : (
        <p className="hello">
          This post contains {post.comments.length} comment
        </p>
      )}
      {/*
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
      */}
      <hr />
    </li>
  );
};

export default Postitem;
