import { z } from 'zod';

const blogCreateValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    content: z.string({
      required_error: 'Please write something',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    isPublished: z.boolean().default(true),
  }),
});

export const blogValidation = {
  blogCreateValidation,
};
