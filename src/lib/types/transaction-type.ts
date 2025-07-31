export type PaymentType = {
  invoice_number: string
  service_code: string
  service_name: string
  transaction_type: string
  total_amount: number
  created_on: string
}

export type TransactionType = {
  invoice_number: string
  transaction_type: string
  description: string
  total_amount: number
  created_on: string
}

export type ResponseTransactionType = {
  limit: number
  offset: number
  records: TransactionType[]
}