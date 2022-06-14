import { z } from 'zod';
import { genericValidator } from '../shared/validator';
import { userValidator } from '../user';

export const todoValidator = {
  title: z.string().min(1),
  done: z.boolean(),
  userId: userValidator.id,
};

export const todoValidationSchema = z
  .object({
    ...genericValidator,
    ...todoValidator,
  })
  .strict();