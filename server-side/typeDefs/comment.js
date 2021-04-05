import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    comments(query: String): [Comment!]!
  }

  extend type Mutation {
    createComment(data: CreateCommentInput): Comment!
    updateComment(id: ID!, data: UpdateCommentType): Comment!
    removeComment(id: ID!): Comment!
  }

  extend type Subscription {
    comment(postId: ID!): CommentSubscriptionPayload!
  }

  input CreateCommentInput {
    content: String!
    author: ID!
    post: ID!
  }

  input UpdateCommentType {
    content: String!
  }

  type CommentSubscriptionPayload {
    mutation: String!
    data: Comment!
  }

  type Comment {
    id: ID!
    content: String!
    createdAt: String!
    updatedAt: String!
    author: User!
    post: Post!
  }
`;
