import { GraphqlServerContext } from './context';
import { Resolvers } from './generated/resolversTypes';
import { todoMutationResolvers } from './mutationResolvers/todo/todoMutations';
import { todoResolver } from './objectResolvers/todo/todoResolver';
import { userResolver } from './objectResolvers/user/userResolver';
import { viewerResolver } from './objectResolvers/viewer/viewerResolver';
import { viewerQueryResolvers } from './queryResolvers/viewer/viewerQueries';

export const resolvers: Resolvers<GraphqlServerContext> = {
  Query: {
    ...viewerQueryResolvers,
  },
  Mutation: {
    ...todoMutationResolvers,
  },
  Viewer: viewerResolver,
  User: userResolver,
  Todo: todoResolver,
};
