import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_POST, GET_POSTS } from "../services/apollo/queries";
import onError, { MUTATING, QUERYING } from "../services/apollo/errorsHandler";
import Postitem from "./Postitem";
import loader from "../images/loader.gif";
import _ from "lodash";
import currentUser from "../services/apollo/cache";

const Home = () => {
  const [newPost, setnewPost] = useState("");

  const { loading, error, data } = useQuery(GET_POSTS, {
    onError: () => onError(QUERYING),
  });
  const [createNewPost, { loading: mutationLoading }] = useMutation(
    CREATE_POST,
    {
      onError: () => onError(MUTATING),
    }
  );

  const onNewPostChange = ({ target }) => {
    const input = target.value;
    setnewPost(input);
  };

  const createPost = ({}) => {
    createNewPost({
      variables: { data: { author: currentUser()._id, content: newPost } },
      refetchQueries: [{ query: GET_POSTS }],
    });
    setnewPost("");
  };

  if (loading) return <img src={loader} />;
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <i>Create a Post: </i>
      <textarea
        type="text"
        className="p_wrap"
        value={newPost}
        placeholder="write something..."
        onChange={onNewPostChange}
      />
      <button disabled={_.isEmpty(newPost)} onClick={createPost}>
        post
      </button>
      {mutationLoading && (
        <div>
          <img src={loader} />
        </div>
      )}
      <ul>
        {data.posts.map((post) => (
          <Postitem key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
