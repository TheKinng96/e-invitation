export interface IToast {
  id?: string;
  message?: string;
  type?: ToastType;
  duration?: number;
  isSnackbar?: boolean;
}

export enum ToastType {
  success = 'is-success',
  danger = 'is-danger',
  warning = 'is-warning'
}

export interface ToastState {
  queue: IToast[];
}