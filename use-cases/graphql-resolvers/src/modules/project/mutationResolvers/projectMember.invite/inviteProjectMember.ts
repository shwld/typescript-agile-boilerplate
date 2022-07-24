import { buildProjectMember, ProjectMemberEntity } from 'core-domain';
import { createMutationResolver } from '../../../../shared/helpers/mutationHelpers';
import { inviteProjectMemberArgsValidationSchema } from './inviteProjectMemberValidation';

export const inviteProjectMember = createMutationResolver(
  'inviteProjectMember',
  {
    validationSchema: inviteProjectMemberArgsValidationSchema,
    async authorize({ args, context }) {
      if (context.currentUser == null) return;

      const project = await context.db.project.findByUser({
        id: args.input.projectId,
        user: context.currentUser,
      });
      if (project == null) return;
      const user = await context.db.user.findByEmail({
        email: args.input.userEmail,
      });

      return [project, user] as const;
    },
  },
  async ({ args, context }, [project, user]) => {
    let projectMember: ProjectMemberEntity | undefined;
    if (user != null) {
      projectMember = buildProjectMember({
        project,
        user,
        role: args.input.role,
      });
      await context.db.projectMember.save(projectMember);
    } else {
      await context.mailer.send({
        from: 'test@example.com',
        to: ['shu.account@outlook.com'],
        subject: 'test',
        body: 'test',
      });
    }
    return {
      __typename: 'InviteProjectMemberSuccessResult',
      result: projectMember,
    };
  }
);