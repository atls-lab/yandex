# yandex-aviso-tool

# Usage

```sh-session
$ npm install -g yandex-aviso-tool
$ yandex-aviso-tool --help
$  s (required) - Secret word used to sign the request
   u (required) - Server url
   p (required) - Purchase identifier
   o (required) - Payment amount
   f (required) - path to fake data file (.json)

$ yandex-aviso-tool -s secret -u localhost -p 7321 -o 1490 -
f file.json
```

# Example fake data file

```json
{
  "sk": "sk",
  "md5": "MD5",
  "scid": "84483",
  "action": "paymentAviso",
  "btnPay": "Pay",
  "shopId": "1",
  "cdd_rrn": "1",
  "invoiceId": "1",
  "external_id": "deposit",
  "paymentType": "AC",
  "purchaseUid": "UID",
  "rebillingOn": "false",
  "wbp_version": "2",
  "cdd_exp_date": "0917",
  "cdd_pan_mask": "516875|2654",
  "cps_region_id": "143",
  "depositNumber": "1",
  "purchaseEmail": "example@gmail.com",
  "shopArticleId": "1",
  "wbp_shopkeyid": "1",
  "customerNumber": "example@gmail.com",
  "nst_eplPayment": "true",
  "shopDefaultUrl": "",
  "requestDatetime": "2017-01-17T13:58:34.102+03:00",
  "wbp_messagetype": "MoneyInvitationRequest",
  "wbp_shopaddress": "wc1.yamoney.ru:8128",
  "yandexPaymentId": "1",
  "merchant_order_id": "example@gmail.com_170117135603_0",
  "wbp_shoperrorinfo": "Shop error",
  "shopSumBankPaycash": "101",
  "orderSumBankPaycash": "101",
  "wbp_CorrespondentID": "4021DF541B6A4BDB242AD9",
  "orderCreatedDatetime": "2017-01-17T13:58:34.087+03:00",
  "wbp_inactivityperiod": "2",
  "cps_user_country_code": "UA",
  "wbp_shopencryptionkey": "hAAAEicBAFWL7Ymxn7jx14iftfZoChuyF7YT",
  "shopSumCurrencyPaycash": "643",
  "orderSumCurrencyPaycash": "643",
  "wbp_shopadditionaladdresses": "wc2.yamoney.ru:8128"
}
```
