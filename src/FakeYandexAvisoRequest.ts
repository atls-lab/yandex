import crypto                            from 'crypto'
import nodeFetch                         from 'node-fetch'

import { FakeYandexAvisoRequestOptions } from './interfaces'

export class FakeYandexAvisoRequest {
  private static readonly defaultParams: any = {
    sk: 'yf086d9e65c658170bd1bb9873ae194e8',
    scid: '84483',
    action: 'paymentAviso',
    btnPay: 'Pay',
    shopId: '80782',
    cdd_rrn: '000509616092',
    invoiceId: '2000584627777',
    external_id: 'deposit',
    paymentType: 'AC',
    purchaseUid: '6d123cec-39b3-4d91-b044-ef8c51bfd6f4',
    rebillingOn: 'false',
    wbp_version: '2',
    cdd_exp_date: '0917',
    cdd_pan_mask: '516875|2654',
    cps_region_id: '143',
    depositNumber: 'VYre0XcMszrg7S1m_yKbT5VFI3sZ.0049.201701',
    purchaseEmail: 'szhaqypbek@gmail.com',
    shopArticleId: '385233',
    wbp_shopkeyid: '3296100413',
    customerNumber: 'szhaqypbek@gmail.com',
    nst_eplPayment: 'true',
    shopDefaultUrl: 'https://beatster.com/purchase/1000005lrix0n4isx69wwmi?res=default',
    requestDatetime: '2017-01-17T13:58:34.102+03:00',
    wbp_messagetype: 'MoneyInvitationRequest',
    wbp_shopaddress: 'wc1.yamoney.ru:8128',
    yandexPaymentId: '2570027207819253',
    merchant_order_id: 'szhaqypbek@gmail.com_170117135603_0',
    wbp_shoperrorinfo: 'Shop error',
    shopSumBankPaycash: '101',
    orderSumBankPaycash: '101',
    wbp_CorrespondentID: '4021DC7B0A6FF541B6CEFAB349EB7A4BDB242AD9',
    orderCreatedDatetime: '2017-01-17T13:58:34.087+03:00',
    wbp_inactivityperiod: '2',
    cps_user_country_code: 'UA',
    wbp_shopencryptionkey:
      'hAAAEicBAFWL7ZBqbD3bzYmxn7jx14iftfZoChuyF7YT ZFTWaqx7gcnywvB6SIxbRHM/O89yGqOe4aicDbL8 7edQK4wrfYVZdYSobCf7aXAK00n0i3 m5gUiX8j0KTXJWjoz2WXgrHt/Y9R25BRB 5OHDdfljnIHtAtjhQvEEWEOr hOOk',
    shopSumCurrencyPaycash: '643',
    orderSumCurrencyPaycash: '643',
    wbp_shopadditionaladdresses: 'wc2.yamoney.ru:8128',
  }

  public constructor(private readonly options: FakeYandexAvisoRequestOptions) {}

  public async execute() {
    const requestBody = {
      ...FakeYandexAvisoRequest.defaultParams,
      orderSumAmount: this.options.orderSumAmount,
      purchaseId: this.options.purchaseId,
      secret: this.options.secret,
      shopSumAmount: this.options.orderSumAmount,
    }

    requestBody.md5 = this.generateSignatureByRequest(requestBody)

    await nodeFetch(this.options.url, {
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  }

  public generateSignatureByRequest(requestBody: any) {
    const signature = [
      requestBody.action,
      requestBody.orderSumAmount,
      requestBody.orderSumCurrencyPaycash,
      requestBody.orderSumBankPaycash,
      requestBody.shopId,
      requestBody.invoiceId,
      requestBody.customerNumber,
      this.options.secret,
    ].join(';')

    const md5OfSignature = crypto
      .createHash('md5')
      .update(signature)
      .digest('hex')
      .toUpperCase()

    return md5OfSignature
  }
}
