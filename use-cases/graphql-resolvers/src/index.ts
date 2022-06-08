import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphqlServerContext } from './graphql/context';
import { typeDefs } from './graphql/generated/typeDefs';
import { resolvers } from './graphql/resolvers';
export * from './graphql/auth';
export * from './graphql/context';
export * from './graphql/permissions';

export const schema = makeExecutableSchema<GraphqlServerContext>({
  typeDefs,
  resolvers,
});
