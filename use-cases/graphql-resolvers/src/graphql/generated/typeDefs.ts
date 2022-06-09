
  import gql from 'graphql-tag';
  export const typeDefs = gql`schema{query:Query mutation:Mutation}scalar DateTime type Mutation{createTodo(input:TodoInput!):TodoMutationResult!}type Query{viewer:Viewer}type RecordInvalidResult{validationErrors:[ValidationError!]!}type Todo{createdAt:DateTime!id:ID!title:String!updatedAt:DateTime!}input TodoInput{id:ID!title:String!}union TodoMutationResult=RecordInvalidResult|TodoSuccessResult|UserErrorResult type TodoSuccessResult{result:Todo!}type User{id:ID!name:String!}type UserErrorResult{errorMessage:String!}type ValidationError{field:String message:String}type Viewer{createdAt:DateTime!email:String!id:ID!picture:String!updatedAt:DateTime!}`;
