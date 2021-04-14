import React, { useState } from "react";
import onErrorMutation, { MUTATING } from "../services/apollo/errorsHandler";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { isToBeShownButton } from "../services/apollo/cache";
import {
  GET_POSTS,
  UPDATE_COMMENT,
  REMOVE_COMMENT,
} from "../services/apollo/queries";
import moment from "moment";
import _ from "lodash";

const Commentitem = (props) => {
  const { comment } = props;
  const onError = () => onErrorMutation(MUTATING);

  const [editableComment, seteditableComment] = useState(true);
  const [TobeUpdatedComment, setUpdateComment] = useState(comment.content);

  const [updateComment] = useMutation(UPDATE_COMMENT, { onError });
  const [removeComment] = useMutation(REMOVE_COMMENT, { onError });

  const onCommentChange = ({ target }) => {
    const input = target.value;
    setUpdateComment(input);
  };

  const onSaveComment = () => {
    updateComment({
      variables: {
        id: comment.id,
        data: {
          content: TobeUpdatedComment,
        },
      },
    });
    seteditableComment(true);
  };

  const onDeleteComment = () => {
    removeComment({
      variables: { id: comment.id },
      refetchQueries: [{ query: GET_POSTS }],
    });
    seteditableComment(true);
  };

  return (
    <li>
      <Link to={`/profile/${comment.author.id}`}>
        {comment.author.userName}
      </Link>
      :
      {editableComment ? (
        <div>
          {comment.content.split("\n").map((item, key) => {
            return (
              <React.Fragment key={key}>
                {item}
                <br />
              </React.Fragment>
            );
          })}
          {isToBeShownButton(comment.author.id) && (
            <React.Fragment>
              <button onClick={() => seteditableComment(false)}>edit</button>
              <button onClick={onDeleteComment}>delete</button>
            </React.Fragment>
          )}
        </div>
      ) : (
        <div>
          <textarea
            type="text"
            onChange={onCommentChange}
            value={TobeUpdatedComment}
          />
          <button
            disabled={_.isEmpty(TobeUpdatedComment)}
            onClick={onSaveComment}
          >
            save
          </button>
          <button
            onClick={() => {
              seteditableComment(true);
              setUpdateComment(comment.content);
            }}
          >
            cancel
          </button>
        </div>
      )}
      <small>
        commented at :
        {moment
          .unix(comment.createdAt / 1000)
          .format("MMMM Do YYYY, h:mm:ss a")}
      </small>
      <br />
    </li>
  );
};

export default Commentitem;
