import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    posts(query: String): [Post!]!
  }

  extend type Mutation {
    createPost(data: CreatePostInput): Post!
    updatePost(id: ID!, data: UpdatePostType): Post!
    removePost(id: ID!): Post!
  }

  extend type Subscription {
    post: PostSubscriptionPayload!
  }

  input CreatePostInput {
    content: String!
    author: ID!
  }

  input UpdatePostType {
    content: String!
  }

  type PostSubscriptionPayload {
    mutation: String!
    data: Post!
  }

  type Post {
    id: ID!
    content: String!
    createdAt: String!
    updatedAt: String!
    author: User!
    comments: [Comment!]!
  }
`;
