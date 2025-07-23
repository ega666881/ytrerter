import { t, Static } from 'elysia';

export const CreateFeedbackSchema = t.Object({
    email: t.String({ format: 'email' }),
    name: t.String(),
    text: t.String()
});

export type CreateFeedbackDto = Static<typeof CreateFeedbackSchema>;