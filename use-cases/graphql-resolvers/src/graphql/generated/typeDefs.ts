
  import gql from 'graphql-tag';
  export const typeDefs = gql`schema{query:Query mutation:Mutation}scalar DateTime type InvalidArgumentsResult{issues:[ValidationIssue!]!}type Mutation{createTodo(input:TodoInput!):TodoMutationResult!}type Query{viewer:Viewer}type Todo{createdAt:DateTime!id:ID!title:String!updatedAt:DateTime!}input TodoInput{id:ID!title:String!}union TodoMutationResult=InvalidArgumentsResult|TodoSuccessResult|UnauthenticatedResult type TodoSuccessResult{result:Todo!}type UnauthenticatedResult{errorMessage:String!}type User{id:ID!name:String!}type ValidationIssue{field:String message:String}type Viewer{createdAt:DateTime!email:String!id:ID!picture:String!updatedAt:DateTime!}`;
