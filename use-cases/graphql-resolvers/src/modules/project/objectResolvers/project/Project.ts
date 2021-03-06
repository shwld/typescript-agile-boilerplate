import { ProjectResolvers } from '../../../../generated/resolversTypes';
import { toConnection } from '../../../../shared/helpers/connectionHelpers';

export const Project: ProjectResolvers = {
  stories(parent, args, context, _info) {
    return toConnection(context.db.story, args, {
      project: parent,
    });
  },
  story(parent, args, context, _info) {
    return context.db.story.findBy({ id: args.id, project: parent });
  },
  members(parent, args, context, _info) {
    return toConnection(context.db.projectMember, args, { project: parent });
  },
  invitations(parent, args, context, _info) {
    return toConnection(context.db.projectMemberInvitation, args, {
      project: parent,
    });
  },
};
