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
        createdAt
        author {
          id
          userName
        }
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $data: UpdatePostType!) {
    updatePost(id: $id, data: $data) {
      id
      content
    }
  }
`;

export const REMOVE_POST = gql`
  mutation RemovePost($id: ID!) {
    removePost(id: $id) {
      id
      content
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($data: CreatePostInput!) {
    createPost(data: $data) {
      id
      content
      author {
        id
        lastName
      }
    }
  }
`;
