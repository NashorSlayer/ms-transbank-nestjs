export class CreatePaymentDto {
    buyOrder: string
    sessionId: string
    amount: number
    returnUrl: string
}
