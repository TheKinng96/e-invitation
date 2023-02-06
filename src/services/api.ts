import axios from 'axios';
import router from '@/router';
import { useToast } from '@/_store/toast';
import { ToastType } from '@/_store/toast/types';

let showMessage = true;

export default () => {
  const instance = axios.create({
    baseURL: location.protocol + '//' + import.meta.env.VITE_API_URL + '/',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-with': 'XMLHttpRequest',
      'Origin-location': router.currentRoute.value.path,
      Authorization:
        'Bearer ' + JSON.parse(localStorage.getItem('jwt') as string),
    },
  });

  instance.interceptors.response.use(function (response) {
    // Todo: user authorization pinia. If the response have a new token, refresh it.

    // Check app version
    if (
      response.headers['app-version'] &&
      import.meta.env.VITE_APP_VERSION !== response.headers['app-version']
    ) {
      showMessageAndCheckAuthentication(
        'ブラウザーをリロードして、最新のAdsistをご利用いただけます。',
        'snackbar',
      );
    } else {
      return response;
    }

    return Promise.reject();
  });
  return instance;
};

function showMessageAndCheckAuthentication(
  message: string,
  type = 'toast',
  keepAlive = false,
) {
  const toast = useToast();

  // Default will log user out
  if (!showMessage) {
    return;
  }

  showMessage = false;

  switch (type) {
    case 'snackbar': {
      toast.append({
        message,
        type: ToastType.danger,
        isSnackbar: true,
      });
      break;
    }
    default: {
      toast.append({
        message,
        type: ToastType.danger,
        duration: 5000,
      });
    }
  }

  if (!keepAlive) {
    // TODO: pinia logout user Logout the user
    // store.dispatch('user/logUserOut');

    // Redirect to login or if on homepage stay there.
    if (router.currentRoute.value.name !== 'login') {
      router.push({ name: 'login' });
    }
  }

  setTimeout(() => {
    showMessage = true;
  }, 200);
}
