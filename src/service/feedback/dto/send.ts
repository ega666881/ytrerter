export class SendFeedbackDto {
  constructor(
    public email: string,
    public name: string,
    public message: string,
  ) {
  }
}
