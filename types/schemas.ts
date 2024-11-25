import { z } from 'zod';

export const userSchema = z.object({
  handle: z.string().min(3, 'username should be a least 3 charachters long'),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$/,
      'Password must be at least eight characters long, and include: at least one uppercase letter, one lowercase letter, one number and one special character',
    ),
});

export const sampleSchema = z.object({
  title: z.string().max(255, "title shouldn't exceed 255 charachters"),
  sourceUrl: z.string().url('Source url should be a valid link'),
  description: z
    .string()
    .max(510, "Description  shouldn't exceed 510 charachters"),
  fileKey: z.string(),
});
