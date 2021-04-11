import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query {
    posts {
      id
      content
      createdAt
      author {
        id
        userName
      }
      comments {
        id
        content
        author {
          id
          userName
        }
      }
    }
  }
`;
