export interface FakeYandexAvisoRequestOptions {
  readonly url: string
  readonly secret: string
  readonly purchaseId: number
  readonly orderSumAmount: number
}

export type Maybe<T> = T | null
