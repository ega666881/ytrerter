import { Elysia } from 'elysia';
import { createPaynamentCrypto } from '../controllers/paynament.controller';
import { CreateFeedbackSchema } from '../dto/feedback.dto';
import { createFeedback, getFeedbacks } from '../controllers/feedback.controller';


const feedbackRoutes = new Elysia()
  .get('/api/feedbacks/get-feedbacks', getFeedbacks)
  .post(
      '/api/feedbacks/create-feedback', 
      createFeedback, 
      {
        body: CreateFeedbackSchema as any
      }
    )

export default feedbackRoutes;