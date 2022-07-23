import { dangerousTruncateAll } from 'db/src/maintenances/dangerousTruncateAll';
import { beforeEach, describe, expect, test } from 'vitest';
import { createMockedResolverInfo } from '../../../../../test/createMockecResolverInfo';
import { createUserAuthorizedContext } from '../../../../../test/createTestContext';
import { GraphqlServerContext } from '../../../../context';
import { assertMutationResult } from '../../../../../test/assertMutationResult';
import type { EstimateStorySuccessResult } from '../../../../generated/resolversTypes';
import { estimateStory } from '.';
import {
  AccountEntity,
  ProjectEntity,
  ProjectUserEntity,
  StoryEntity,
} from 'core-domain';
import {
  createTestAccount,
  createTestProject,
  createTestProjectUser,
  createTestStory,
} from 'db/src/testData';

let context: Required<GraphqlServerContext>;
const info = createMockedResolverInfo();
let account: AccountEntity;
let project: ProjectEntity;
let projectUser: ProjectUserEntity;
let story: StoryEntity;
beforeEach(async () => {
  await dangerousTruncateAll();
  context = await createUserAuthorizedContext();
  account = await createTestAccount(context.currentUser);
  project = await createTestProject(account, context.currentUser);
  projectUser = await createTestProjectUser(project, context.currentUser);

  story = await createTestStory(projectUser);
});

describe('estimateStory', async () => {
  const subject = async () => {
    return await estimateStory(
      {},
      {
        input: {
          id: story.id,
          points: 20,
        },
      },
      context,
      info
    );
  };
  test('result is success', async () => {
    const response = await subject();
    expect(response.__typename).to.eq('EstimateStorySuccessResult');
    assertMutationResult<EstimateStorySuccessResult>(response);
    expect(response.result).toEqual(
      expect.objectContaining({
        id: story.id,
      })
    );
  });
});
