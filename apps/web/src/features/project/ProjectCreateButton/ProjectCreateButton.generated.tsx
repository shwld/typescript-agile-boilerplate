import * as Types from '../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ProjectCreateButton_ResultFragment = {
  __typename?: 'Project';
  id: string;
  name: string;
  description: string;
  privacy: Types.ProjectPrivacy;
  currentVelocity: number;
  createdAt: any;
  accountId: string;
};

export type ProjectCreateButton_CreateProjectMutationVariables = Types.Exact<{
  input: Types.CreateProjectInput;
}>;

export type ProjectCreateButton_CreateProjectMutation = {
  __typename?: 'Mutation';
  createProject:
    | {
        __typename?: 'CreateProjectSuccessResult';
        result: {
          __typename?: 'Project';
          id: string;
          name: string;
          description: string;
          privacy: Types.ProjectPrivacy;
          currentVelocity: number;
          createdAt: any;
          accountId: string;
        };
      }
    | { __typename?: 'InvalidArgumentsResult' }
    | { __typename?: 'UnauthorizedResult' };
};

export const ProjectCreateButton_ResultFragmentDoc = gql`
  fragment ProjectCreateButton_Result on Project {
    id
    name
    description
    privacy
    currentVelocity
    createdAt
    accountId
  }
`;
export const ProjectCreateButton_CreateProjectDocument = gql`
  mutation ProjectCreateButton_CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      ... on CreateProjectSuccessResult {
        result {
          ...ProjectCreateButton_Result
        }
      }
    }
  }
  ${ProjectCreateButton_ResultFragmentDoc}
`;

export function useProjectCreateButton_CreateProjectMutation() {
  return Urql.useMutation<
    ProjectCreateButton_CreateProjectMutation,
    ProjectCreateButton_CreateProjectMutationVariables
  >(ProjectCreateButton_CreateProjectDocument);
}
