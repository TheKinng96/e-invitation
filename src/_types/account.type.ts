export interface IPlan {
  _id: string;
  name: string;
  description: string;
  price: number;
  interval: string;
  charges: number;
  plan_type: string;
  stripe_plan_id: string;
  stripe_product_id: string;
  updated_at: Date;
  created_at: Date;
}

export interface IFullUserDetails {
  _id: string;
  email: string;
  status: string;
  updated_at: Date;
  created_at: Date;
  email_verified_at: Date;
  is_set_gmo_payment: boolean;
  company: string;
  name: string;
  plan_id: string;
  current_plan_id: string;
  completed_at: Date;
  old_password?: string;
  password?: string;
  password_confirmation?: string;
  plan_pending: boolean;
  plan: IPlan;
  currentPlan: IPlan;
  user_type: string;
  is_set_stripe_payment: boolean;
}

export interface IUserDetails {
  _id: string;
  name: string;
  company: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

export interface IPayments {
  id: string;
  amount: number;
  amount_refunded: number;
  balance_transaction: string;
  captured: boolean;
  created: Date;
  currency: string;
  description: string;
  paid: boolean;
  receipt_email: string;
  receipt_number: string;
  receipt_url: string;
  refunded: boolean;
  status: string;
  failure_code: string;
  failure_message: string;
}

export interface IGmoPayments {
  _id: string;
  amount: number;
  non_taxed_price: number;
  tax_price: number;
  created_at: string;
  access_id: string;
  access_pass: string;
  updated_at: string;
  tax_fee_percent: number;
  user_id: string;
  system_fee: number;
  status: string;
}

export interface IColormePayments {
  _id: string;
  amount: number;
  non_taxed_price: number;
  tax_price: number;
  created_at: string;
  access_id: string;
  access_pass: string;
  updated_at: string;
  tax_fee_percent: number;
  user_id: string;
  system_fee: number;
  status: string;
}

export interface ICardDetails {
  id: string;
  object: string;
  address_city: string;
  address_country: string;
  address_line1: string;
  address_line1_check: string;
  address_line2: string;
  address_state: string;
  address_zip: string;
  address_zip_check: string;
  brand: string;
  country: string;
  customer: string;
  cvc_check: string;
  dynamic_last4: string;
  exp_month: number;
  exp_year: number;
  fingerprint: string;
  funding: string;
  last4: string;
  metadata: Array<any>;
  name: string;
  tokenization_method: string;
}
export interface ICardGmoDetails {
  cardNo: string;
  expire: string;
  brand: string;
  is_card_blocked: boolean;
}

export enum PAYMENT_STATUS {
  SUCCEEDED = 'form.succeeded',
  PARTIAL_REFUNDED = 'form.partial_refunded',
  REFUNDED = 'form.refunded',
  FAILED = 'form.failed',
  PENDING = 'form.pending',
}
