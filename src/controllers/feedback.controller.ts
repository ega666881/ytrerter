import { Context } from 'elysia';
import * as feedbackRepository from '../repositories/feedback.repository'

export const createFeedback = (context: Context) => {

}

export const getFeedbacks = (context: Context) => {
    return feedbackRepository.getFeedbacks()
}