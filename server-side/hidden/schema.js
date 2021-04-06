/* left for ref */

// import { gql } from "apollo-server-express";

// export default gql`
//   type Query {
//     users(query: String): [User!]!
//     posts(query: String): [Post!]!
//     comments(query: String): [Comment!]!
//   }

//   type Mutation {
//     updateUser(id: ID!, data: UpdateUserType): User!
//     removeUser(id: ID!): User!
//     createPost(data: CreatePostInput): Post!
//     updatePost(id: ID!, data: UpdatePostType): Post!
//     removePost(id: ID!): Post!
//     createComment(data: CreateCommentInput): Comment!
//     updateComment(id: ID!, data: UpdateCommentType): Comment!
//     removeComment(id: ID!): Comment!
//   }

//   type Subscription {
//     comment(postId: ID!): CommentSubscriptionPayload!
//     post: PostSubscriptionPayload!
//   }

//   input UpdateUserType {
//     firstName: String
//     lastName: String
//     userName: String
//     email: String
//     age: Int
//   }

//   input CreatePostInput {
//     content: String!
//     author: ID!
//   }

//   input UpdatePostType {
//     content: String
//   }

//   input CreateCommentInput {
//     content: String!
//     author: ID!
//     post: ID!
//   }

//   input UpdateCommentType {
//     content: String
//   }

//   type PostSubscriptionPayload {
//     mutation: String!
//     data: Post!
//   }

//   type CommentSubscriptionPayload {
//     mutation: String!
//     data: Comment!
//   }

//   enum userRole {
//     ADMIN
//     USER
//   }

//   type User {
//     id: ID!
//     firstName: String!
//     lastName: String!
//     userName: String!
//     email: String!
//     age: Int!
//     role: userRole
//     posts: [Post!]!
//     comments: [Comment!]!
//   }

//   type Post {
//     id: ID!
//     content: String!
//     createdAt: String!
//     updatedAt: String!
//     author: User!
//     comments: [Comment!]!
//   }

//   type Comment {
//     id: ID!
//     content: String!
//     createdAt: String!
//     updatedAt: String!
//     author: User!
//     post: Post!
//   }
// `;
