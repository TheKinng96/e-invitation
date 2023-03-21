import axios from 'axios';
import router from '@/router';

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

  return instance;
};
