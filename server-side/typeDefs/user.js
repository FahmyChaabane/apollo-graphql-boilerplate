import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    users(query: String): [User!]!
  }

  extend type Mutation {
    updateUser(id: ID!, data: UpdateUserType): User!
    removeUser(id: ID!): User!
  }

  input UpdateUserType {
    firstName: String!
    lastName: String!
    userName: String!
    email: String!
    age: Int!
  }

  enum userRole {
    ADMIN
    USER
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    email: String!
    age: Int!
    role: userRole
    posts: [Post!]!
    comments: [Comment!]!
  }
`;
