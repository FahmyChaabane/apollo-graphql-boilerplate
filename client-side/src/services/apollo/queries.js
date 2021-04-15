import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query {
    posts {
      id
      content
      createdAt
      author {
        id
        firstName
        lastName
        userName
        email
        age
        role
      }
      comments {
        id
        content
        createdAt
        author {
          id
          firstName
          lastName
          userName
          email
          age
          id
          role
        }
      }
    }
  }
`;

export const GET_POST = gql`
  query Post($id: ID!) {
    post(id: $id) {
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

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($id: ID!, $data: UpdateCommentType) {
    updateComment(id: $id, data: $data) {
      id
      content
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation RemoveComment($id: ID!) {
    removeComment(id: $id) {
      id
      author {
        userName
      }
      content
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($data: CreateCommentInput!) {
    createComment(data: $data) {
      id
      content
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      id
      firstName
      lastName
      userName
      age
      email
      role
    }
  }
`;

export const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
      userName
      age
      email
      role
    }
  }
`;
