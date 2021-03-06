import { buildAccount } from 'core-domain';
import { createMutationResolver } from '../../../../shared/helpers/mutationHelpers';
import { createAccountArgsValidationSchema } from './createAccountValidation';

export const createAccount = createMutationResolver(
  'createAccount',
  {
    validationSchema: createAccountArgsValidationSchema,
    authorize: ({ context }) => {
      return context.currentUser;
    },
  },
  async ({ args, context }, accountOwner) => {
    const newAccount = buildAccount(
      {
        id: args.input.id,
        name: args.input.name,
      },
      accountOwner
    );
    await context.db.account.save(newAccount);
    return {
      __typename: 'CreateAccountSuccessResult',
      result: newAccount,
    };
  }
);
