export enum Providers {
  FACEBOOK = 'Facebook',
  YAHOO = 'Yahoo',
  YAHOO_SEARCH_AD = 'YahooSearchAd',
  GOOGLE = 'Google',
  LINE = 'LINE',
}

export interface LineAccount {
  _id: string,
  user_id: string,
  account_id: string,
  account_status: AccountStatus,
  install_tag_attempts?: boolean,
  line_id_name: string,
  line_id_image?: string,
  updated_at: string,
  created_at: string,
  delivery_status: DeliveryStatus,
  delivery_status_reasons?: [string],
  tag_base_code?: string,
  tag_id?: string,
  account_idx: string,
  tag_install_attempt?: boolean,
  approved_message_date?: string;
}

export enum DeliveryStatus {
  DELIVERY_STATUS_ACTIVE = 'ACTIVE',
  DELIVERY_STATUS_NOT_DELIVERING = 'NOT_DELIVERING',
  DELIVERY_STATUS_IN_REVIEW = 'ACCOUNT_IN_REVIEW',
  DELIVERY_STATUS_LINK_NOT_APPROVED = 'LINE_ACCOUNT_LINK_NOT_APPROVED',
  DELIVERY_STATUS_NOT_APPROVED = 'NOT_APPROVED',
}

export enum AccountStatus {
  ACCOUNT_STATUS_ACTIVE = 'ACTIVE',
  ACCOUNT_STATUS_PAUSED = 'PAUSED',
  ACCOUNT_STATUS_REMOVED = 'REMOVED',
}