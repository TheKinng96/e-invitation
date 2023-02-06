import Vue from 'vue';
import moment from 'moment';

Vue.filter('currencyFormat', function(value: any) {
  if (!value) return value;
  return value.toLocaleString();
});

Vue.filter('dateFormat', function(value: any) {
  if (!value) return value;
  return moment(value).format('YYYY/DD/MM');
});

Vue.filter('onlyNumber', function(value: any) {
  if (!value) return value;
  return value.replace(/\D+/g, '');
});

Vue.filter('noSpecialButDashSpaceUnder', function(
  value: any,
  onlyValidate: any,
) {
  if (!value) return value;
  else if (onlyValidate) {
    return /[^ー-龯ぁ-んァ-ン0-9a-zA-Z\- /_＿\s]+$/.test(value);
  }
  return value.replace(/[^ー-龯ぁ-んァ-ン0-9a-zA-Z\- /_＿\s]+$/, '');
});

Vue.filter('baseURL', function(value: any) {
  if (!value) return value;

  value = value.replace(/(http(s)?:\/\/)|(\/.*){1}/g, '');

  return value.toUpperCase();
});
