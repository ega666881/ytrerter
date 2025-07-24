import { Context } from 'elysia';
import * as feedbackRepository from '../repositories/feedback.repository'
import { CreateFeedbackDto } from '../dto/feedback.dto';

export const createFeedback = (context: Context) => {
    const { ...payload } = context.body as CreateFeedbackDto
    return feedbackRepository.createFeedback({
        email: payload.email,
        text: payload.text,
        name: payload.name
    })
}

export const getFeedbacks = (context: Context) => {
    return feedbackRepository.getFeedbacks()
}