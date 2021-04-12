import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_POST, GET_POSTS } from "../services/apollo/queries";
import { toast } from "react-toastify";
import Postitem from "./Postitem";
import { getCurrentUser } from "../services/authService";
import loader from "../../images/loader.gif";

const Home = () => {
  const { loading, error, data } = useQuery(GET_POSTS, {
    onError: () => {
      return toast.error("something went wrong");
    },
  });
  const [createNewPost, { loading: mutationLoading }] = useMutation(
    CREATE_POST,
    {
      onError: () => {
        return toast.error("something went wrong");
      },
    }
  );

  const [newPost, setnewPost] = useState("");

  const onNewPostChange = ({ target }) => {
    const input = target.value;
    setnewPost(input);
  };

  const createPost = ({}) => {
    createNewPost({
      variables: { data: { author: getCurrentUser()._id, content: newPost } },
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
      <button onClick={createPost}>post</button>
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
