import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import CancelPaymentDto from './dto/cancelar-payment.dto';

import {
  Environment,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Options,
  WebpayPlus
} from 'transbank-sdk';
import { randomInt } from 'crypto';


@Injectable()
export class PaymentsService {

  async create(createPaymentDto: CreatePaymentDto) {
    const { amount } = createPaymentDto
    const return_url = 'http://localhost:3000/cart/checkout/'
    const session_id = 'session_id'
    const buy_order = 'buy_order0' + randomInt(1000).toString()


    const tx = new WebpayPlus.Transaction(new Options(
      IntegrationCommerceCodes.WEBPAY_PLUS,
      IntegrationApiKeys.WEBPAY,
      Environment.Integration
    ));
    const response = await tx.create(buy_order, session_id, amount, return_url);
    return {
      url: response.url,
      token: response.token,
    };
  }

  async confirmPayment(ws_token: string) {

    const tx = new WebpayPlus.Transaction(new Options(
      IntegrationCommerceCodes.WEBPAY_PLUS,
      IntegrationApiKeys.WEBPAY,
      Environment.Integration
    ));
    const response = await tx.commit(ws_token);
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
