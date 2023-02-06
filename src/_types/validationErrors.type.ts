export interface ValidationErrors<T> {
  data: {
    errors: T;
  };
}

export interface RegistrationErrors {
  email?: Array<string>;
  message?: string;
  error?: string;
}

export interface ShopErrors {
  shop?: {
    name?: Array<string>;
    shop_url?: Array<string>;
  };
  message?: string;
}
