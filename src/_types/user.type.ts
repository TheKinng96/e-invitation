import { AffiliateUser } from './affiliateUser.type';
import { LineAccount, Providers } from './providers/lineAccount.type';

export interface IUser {
  name: string;
  email: string;
  company: string;
  plan_id: string;
  completed_at: Date;
  status: UserStatus;
  user_type: UserType;
  affiliate: string;
  affiliate_linked_at: Date;
  dashboard_access_at: Date;
  last_activity: Date;
  current_plan_id: string;
  is_set_gmo_payment: boolean;
  is_gmo_member: boolean;
  is_gmo_card_invalid: boolean;
  gmo_card_brand: string;
  language: string;
  reminders: Reminder;
  preferences: Preferences;
  email_verified_at: string;
  plan_name: string;
  plan_charges: number;
  user_plan_histories: UserPlanHistory[];
  shop: Shop;
  affiliate_user?: AffiliateUser;
  line_account?: LineAccount;
  first_name?: string;
  last_name?: string;
}

export interface Reminder {
  flag?: string;
  is_flagged: boolean;
  tags_installed: Providers[];
  updated_at: Date;
  created_at: Date;
  _id: string;
}

export interface Preferences {
  updated_at: Date;
  created_at: Date;
  _id: string;
  send_reminders: boolean;
  verification_at: Date;
  theme_id: string;
  thank_you_at: Date;
  getting_started_guide: string;
  with_trash: boolean;
  suggest_upload_yahoo_logo: boolean;
  tour_edit_image: boolean;
}

export interface UserPlanHistory {
  _id: string;
  user_id: string;
  plan_id: string;
  updated_at: string;
  created_at: string;
}

export interface Shop {
  _id: string,
  name: string,
  platform_id: Platform,
  industry_id: string,
  shop_url: string,
  site_url?: string,
  shop_id: string,
  user_id: string,
  updated_at: string,
  created_at: string,
  api?: string,
  token_invalid: boolean,
  shopify_preferences?: ShopifyPreferences,
  hostname?: string,
  supplies_alcohol?: boolean,
  industry: Industry;
}

export interface Industry {
  _id: string,
  name: string,
  amount: number,
  order: number,
  type: ShopType,
  archive: boolean,
  updated_at: string,
  created_at: string,
  line_interest_ids: [string],
  yahoo_interest_ids: [string],
  facebook_interest_ids: [string];
}

export interface ShopifyPreferences {
  has_many_products?: boolean,
  max_products_in_collection?: number,
  max_smart_collections?: number;
}

export interface Preferences {
  name: UserPreference;
  value: any;
}

export enum ShopType {
  EC = 'EC',
  NON_EC = 'NON-EC'
}

export enum UserStatus {
  NOT_VERIFIED = 'not_verified',
  COMPLETED = 'completed',
  INCOMPLETE = 'incompleted',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
  GUEST = 'guest',
}

export enum UserType {
  INHOUSE = 'inhouse',
  STANDARD = 'standard',
  COLORME_STORE = 'colorme_store',
  DEFAULT = ''
}

export enum Platform {
  COLORME = 'カラーミーショップ',
  MAKESHOP = 'MakeShop',
  BASE = 'BASE',
  SHOPIFY = 'Shopify',
  WORDPRESS = 'WordPress',
  WELCART = 'WordPress_welcart',
  WOOCOMMERCE = 'WordPress_woocommerce',
  FUTURESHOP = 'futureshop',
  OTHER_NON_EC = 'other_non_ec',
  OTHER_EC = 'other_ec',
}

export enum UserPreference {
  ADSIST_TOUR = 'adsistTour',
}