import { createMutationResolver } from '../../../../shared/helpers/mutationHelpers';
import { destroyStoryArgsValidationSchema } from './validation';

export const destroyStory = createMutationResolver(
  'destroyStory',
  {
    validationSchema: destroyStoryArgsValidationSchema,
    async authorize({ args, context }) {
      if (context.currentUser == null) return;

      const story = await context.db.story.findBy({ id: args.input.id });
      if (story == null) return;

      const project = await context.db.project.findByUser({
        id: story.projectId,
        user: context.currentUser,
      });
      return project != null && story;
    },
  },
  async ({ context }, story) => {
    await context.db.story.destroy(story);
    return {
      __typename: 'DestroyStorySuccessResult',
      result: story,
    };
  }
);
