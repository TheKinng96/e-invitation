import { ref } from 'vue';
import { IPaymentError } from '@/_types/payment.types';
import Api from '@/services/registration.api';
import AccountApi from '@/services/account.api';

import { useRegistration } from '@/_store/registration';
import { useRouter } from 'vue-router';
import { GmoTokenAndBrand } from '@/_store/registration/types';
import { useUser } from '@/_store/user';

export const useAccountCreation = () => {
  const router = useRouter();

  const user = useUser();
  const registrationStore = useRegistration();

  const isAccountCreateLoading = ref(false);
  const cardError = ref<Array<any>>([]);
  const error = ref<IPaymentError>({
    title: '',
    error: '',
  });

  const cleanError = () => {
    error.value = {
      title: '',
      error: '',
    };
  };

  const assignYahooAdAccount = () => {
    return Api.assignYahooAdAccount()
      .then((result: any) => {
        if (result) {
          return true;
        }
      })
      .catch((err: any) => {
        cardError.value.push(err.response.data.message);
        // messageGenerator(error, 'assignYahooAdAccount');
        return false;
      })
      .finally(() => {
        isAccountCreateLoading.value = false;
      });
  };

  const sendAdminEmail = () => {
    Api.sendAdminEmail()
      .then((result: any) => {
        if (result) {
          registrationStore.changeStepAction('5');
        } else {
          registrationStore.changeStepAction('4');
        }
      })
      .catch((error: any) => {
        cardError.value.push(error.response.data.message);
        // messageGenerator(error, 'sendAdminEmail');
        return false;
      })
      .finally(() => {
        isAccountCreateLoading.value = false;
      });
  };

  const createGmoAccount = (token: GmoTokenAndBrand) => {
    return AccountApi.saveUserCardGmo(token)
      .then((response) => {
        user.logUserIn({ user: response.data as any });
        return true;
      })
      .catch((err) => {
        const { title, message } = err.response.data;
        error.value = {
          title,
          error: message,
        };
        // messageGenerator(error, 'saveUserCardGmo');
        return error;
      })
      .finally(() => {
        isAccountCreateLoading.value = false;
      });
  };

  const createAccount = async (token?: GmoTokenAndBrand) => {
    const user = useUser();
    isAccountCreateLoading.value = true;
    cardError.value = [];
    let createResult: any = true;

    if (token) {
      createResult = await createGmoAccount(token);
    }
    if (createResult === true) {
      assignYahooAdAccount();
      sendAdminEmail();
      router.push({
        name: user.isColormeAppStoreUser
          ? 'colormeRegisterFinish'
          : 'registerFinish',
      });
    }

    return createResult;
  };

  return {
    createAccount,
    isAccountCreateLoading,
    cleanError,
    cardError,
    error,
  };
};
