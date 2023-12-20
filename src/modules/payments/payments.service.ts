import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import CancelPaymentDto from './dto/cancelar-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';

import {
  Environment,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Options,
  WebpayPlus
} from 'transbank-sdk';


@Injectable()
export class PaymentsService {

  async create(createPaymentDto: CreatePaymentDto) {
    const { buyOrder, sessionId, amount, returnUrl } = createPaymentDto
    const tx = new WebpayPlus.Transaction(new Options(
      IntegrationCommerceCodes.WEBPAY_PLUS,
      IntegrationApiKeys.WEBPAY,
      Environment.Integration
    ));
    const response = await tx.create(buyOrder, sessionId, amount, returnUrl);
    return {
      url: response.url,
      token: response.token,
    };
  }

  async confirmPayment(confirmPayment: ConfirmPaymentDto) {
    const tx = new WebpayPlus.Transaction(new Options(
      IntegrationCommerceCodes.WEBPAY_PLUS,
      IntegrationApiKeys.WEBPAY,
      Environment.Integration
    ));

    const response = await tx.commit(confirmPayment.token_ws);
    const {
      vci,
      amount,
      staus,
      buy_order,
      session_id,
      card_detail,
      accounting_date,
      transaction_date,
      authorization_code,
      payment_type_code,
      response_code,
      installments_amount,
      installments_number,
      balance
    } = response

    return {
      vci,
      amount,
      staus,
      buy_order,
      session_id,
      card_detail,
      accounting_date,
      transaction_date,
      authorization_code,
      payment_type_code,
      response_code,
      installments_amount,
      installments_number,
      balance
    }
  }

  async cancelPayment(cancelPayment: CancelPaymentDto) {
    const { token_ws, amount } = cancelPayment
    const tx = new WebpayPlus.Transaction(new Options(
      IntegrationCommerceCodes.WEBPAY_PLUS,
      IntegrationApiKeys.WEBPAY,
      Environment.Integration
    ));
    const response = await tx.refund(token_ws, amount);
    const {
      authorization_code,
      authorization_date,
      balance,
      nullified_amount,
      response_code,
      type,
    } = response

    return {
      authorization_code,
      authorization_date,
      balance,
      nullified_amount,
      response_code,
      type,
    }
  }
}
