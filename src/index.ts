import { Command, flags }         from '@oclif/command'

import { FakeYandexAvisoRequest } from './FakeYandexAvisoRequest'

class MakePurchaseCommand extends Command {
  public static description = 'describe the command here'

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
  }

  public async run() {
    const parseOutput = this.parse(MakePurchaseCommand)

    const { url, secret, purchaseId, orderSumAmount } = parseOutput.flags

    const requestParams = { url, secret, purchaseId, orderSumAmount }

    await new FakeYandexAvisoRequest(requestParams).execute()

    this.log('💩 ОK!')
  }
}

export = MakePurchaseCommand
