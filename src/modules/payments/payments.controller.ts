import { Controller, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import CancelPaymentDto from './dto/cancelar-payment.dto';
import { transbankrMsg } from 'src/utils/constants';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @MessagePattern(transbankrMsg.CREATE)
  async create(@Payload('payment') createPaymentDto: CreatePaymentDto) {
    return await this.paymentsService.create(createPaymentDto);
  }

  @MessagePattern(transbankrMsg.CONFIRM)
  async confirmPayment(@Payload() confirmPaymentDto: ConfirmPaymentDto) {
    return await this.paymentsService.confirmPayment(confirmPaymentDto);
  }

  @MessagePattern(transbankrMsg.REMBOLSO)
  async cancelPayment(@Payload() cancelPaymentDto: CancelPaymentDto) {
    return await this.paymentsService.confirmPayment(cancelPaymentDto);
  }
}
