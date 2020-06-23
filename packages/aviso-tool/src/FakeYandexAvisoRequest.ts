import crypto                                   from 'crypto'
import nodeFetch                                from 'node-fetch'
import { Agent }                                from 'https'

import { FakeYandexAvisoRequestOptions, Maybe } from './interfaces'

export class FakeYandexAvisoRequest {
  public constructor(
    private readonly options: FakeYandexAvisoRequestOptions,
    private readonly defaultParams: any,
    private readonly customAgent: Maybe<Agent> = null
  ) {}

  public async execute() {
    const requestBody = {
      ...this.defaultParams,
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
      agent: this.customAgent,
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
