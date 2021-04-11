import React from "react";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../services/apollo/queries";
import { Link } from "react-router-dom";

const Home = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <i>Create a Post: </i>
      <input type="text" placeholder="write something..." />
      <ul>
        {data.posts.map((post) => (
          <li key={post.id}>
            <Link to={`/profile/${post.author.id}`}>
              {post.author.userName}
            </Link>
            :{post.content} <button>expand</button>
            <button>edit</button>
            <button>delete</button>
            <br />
            <small>
              posted at :
              {moment
                .unix(post.createdAt / 1000)
                .format("MMMM Do YYYY, h:mm:ss a")}
            </small>
            <br />
            comments :
            <ul>
              {post.comments.map((comment) => (
                <li key={comment.id}>
                  <Link to={`/profile/${comment.author.id}`}>
                    {comment.author.userName}
                  </Link>
                  :{comment.content} <button>edit</button>
                  <button>delete</button>
                  <br />
                  <small>
                    commented at :
                    {moment
                      .unix(post.createdAt / 1000)
                      .format("MMMM Do YYYY, h:mm:ss a")}
                  </small>
                  <br />
                  <input type="text" placeholder="add comment" />
                </li>
              ))}
            </ul>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
