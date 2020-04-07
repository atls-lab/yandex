import { Command, flags } from '@oclif/command'

class MakePurchaseCommand extends Command {
  public static description = 'describe the command here'

  public static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    secret: flags.string({ char: 's' }),
    url: flags.string({ char: 'u', required: true }),
    'purchase-id': flags.string({ char: 'p', required: true }),
    'order-sum-amount': flags.integer({ char: 'o', required: true }),
  }

  public static args = [{ name: 'file' }]

  public async run() {
    const { args, flags } = this.parse(MakePurchaseCommand)

    this.log('hello)0')
  }
}

export = MakePurchaseCommand
