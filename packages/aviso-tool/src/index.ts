import { Agent }                  from 'https'
import { readFileSync }           from 'fs'

import { Command, flags }         from '@oclif/command'

import { FakeYandexAvisoRequest } from './FakeYandexAvisoRequest'

class MakePurchaseCommand extends Command {
  public static description = 'makes a fake payment request'

  public static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    secret: flags.string({
      char: 's',
      description: 'secret word to sign the request',
      default: 'secret',
    }),
    url: flags.string({
      char: 'u',
      description: 'payment processor address',
      default: 'https://payment-gateway.bs.local.aunited.dev/payment-aviso',
    }),
    purchaseId: flags.integer({
      char: 'p',
      description: 'purchase identifier',
      required: true,
    }),
    orderSumAmount: flags.integer({
      char: 'o',
      description: 'payment amount',
      required: true,
    }),
    filePath: flags.string({
      char: 'f',
      description: 'JSON file with fake data',
      required: true,
    }),
  }

  public async run() {
    const {
      flags: { url, secret, purchaseId, orderSumAmount, filePath },
    } = this.parse(MakePurchaseCommand)

    const requestParams = { url, secret, purchaseId, orderSumAmount }
    const fakePayment = JSON.parse(readFileSync(filePath, 'utf8'))
    const agent = new Agent({ rejectUnauthorized: false })

    const fakeRequest = new FakeYandexAvisoRequest(requestParams, fakePayment, agent)

    await fakeRequest.execute()

    this.log('💩 ОK!')
  }
}

// @ts-ignore
export = MakePurchaseCommand
