export interface AffiliateUser {
  _id: string;
  name: string;
  affiliate_user_id: string;
  created_at: string;
  updated_at: string;
  logo?: Logo;
  theme_code: ThemeCode;
  skin_feature: boolean;
  use_special_plans?: boolean;
}

export interface Logo {
  _id: string;
  favicon_img_path: string;
  normal_img_path: string;
  small_img_path: string;
  created_at: string;
  updated_at: string;
}

export interface ThemeCode {
  _id: string;
  name: string;
  primary: string;
  secondary: string;
  success: string;
  backgroundDeep: string;
  backgroundSurface: string;
  textNormal: string;
  textActive: string;
  textHover: string;
  subtitleSide: string;
  paginationActive: string;
  dashboardClick: string;
  dashboardSpent: string;
  dashboardImpression: string;
  dashboardConversion: string;
}
