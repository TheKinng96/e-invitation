import Api from '@/services/api';
import { Password } from '@/_types/auth.types';

const changePassword = (password: Password) => {
  return Api().post('/user/auth/password/change', password);
};

export default {
  changePassword,
};
