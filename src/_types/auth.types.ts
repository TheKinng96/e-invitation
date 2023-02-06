export interface Password {
  token: string;
  password: string;
  password_confirmation?: string;
}

export interface ILoginParam {
  email: string;
  password: string;
}

export interface IRegistrationParam {
  email: string;
  last_name: string;
  first_name: string;
  password: string;
  password_confirmation: string;
  affiliate?: string;
  language: string;
}

export interface Code {
  code: string;
}

export interface Token {
  token: string | null;
}
