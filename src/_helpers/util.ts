import moment from 'moment';
import i18n from '@/plugins/i18n';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { IUpdateLocalStorage, LocalStorage } from '@/_types/common';
import { useUser } from '@/_store/user';
import { useI18n } from 'vue-i18n';

export function dateFormatter(date: any) {
  if (typeof date === 'string') {
    let dateFormat = /[12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])/;

    if (date.match(dateFormat)) {
      // Skip: in correct format
      return date;
    }
  }

  try {
    date = moment.parseZone(date).format('YYYY/MM/DD');
  } catch (error) {
    // Skip: Invalid date format
    return;
  }
  return date;
}

export function promiseTimeout(ms: number, promise: any) {
  let timeout = new Promise((resolve, reject) => {
    let timeoutID = setTimeout(() => {
      clearTimeout(timeoutID);
      reject('Timed out in ' + ms + 'ms.');
    }, ms);
  });

  return Promise.race([promise, timeout]);
}

export function i18nTranslator(message: any, namespace: string) {
  const { t } = useI18n();

  if (typeof message === 'object' && message.locale) {
    let { locale, params } = message;

    if (params && typeof params === 'object') {
      for (let key in params) {
        let { value, translate } = params[key] as any;

        params[key] = translate ? t(`${namespace}.${value}`) : value;
      }
    }
    return t(`${namespace}.${locale}`, params);
  }

  return message;
}

export function hexToRgbA(hex: string, alpha: string) {
  let c: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return (
      'rgba(' +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
      `,${alpha})`
    );
  } else {
    return 'Bad hex';
  }
}

export function adjust(color: string, amount: number) {
  return (
    '#' +
    color
      .replace(/^#/, '')
      .replace(/../g, (color) =>
        (
          '0' +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2),
      )
  );
}

export function isEquivalent(a: any, b: any) {
  // Removing the 'collapsed' attribute while comparing
  if (a.collapsed || b.collapsed) {
    delete a['collapsed'];
    delete b['collapsed'];
  }

  let aProps = Object.getOwnPropertyNames(a);
  let bProps = Object.getOwnPropertyNames(b);

  if (aProps.length !== bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];
    if (aProps[i] !== '__ob__') {
      if (a[propName] !== b[propName]) {
        // Number couldnt be tracked correctly
        if (
          !isNaN(a[propName]) &&
          !isNaN(b[propName]) &&
          a[propName] == b[propName]
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  return true;
}

/**
 * Eslint update related - solving hasOwnProperty
 * 「no-prototype-builtins」: https://eslint.org/docs/rules/no-prototype-builtins
 */
export function hasProperty(obj: any, key: string) {
  return !!obj && Object.prototype.hasOwnProperty.call(obj, key);
}

export function useBreakpoints() {
  let width = ref(window.innerWidth);

  const onWidthChange = () => (width.value = window.innerWidth);
  onMounted(() => window.addEventListener('resize', onWidthChange));
  onUnmounted(() => window.removeEventListener('resize', onWidthChange));

  const windowType = computed(() => {
    if (width.value < 550) return 'xs';
    if (width.value >= 550 && width.value < 1200) return 'md';
    if (width.value >= 1200) return 'lg';
    return null;
  });

  const windowWidth = computed(() => width.value);

  return { windowWidth, windowType };
}

/**
 * To sync the data in localstorage when user login back
 * @param namespace
 * @param defaultValue
 * @returns null | string | object | boolean
 */
export function syncLocalStorage(namespace: string, defaultValue: any): any {
  /**
   * UserType is not a json variable in the localStorage in the old app
   * Because store has not initialized yet, so will need to manually do the checking and replace the value
   **/
  if (
    namespace === LocalStorage.USER_TYPE &&
    typeof localStorage.getItem(namespace) !== 'object'
  ) {
    let user;
    if (localStorage.getItem(LocalStorage.USER)) {
      user = JSON.parse(localStorage.getItem(LocalStorage.USER) as string);
    }
    updateLocalStorage({
      namespace: namespace,
      value: user?.user_type ?? defaultValue,
    });
  }
  return localStorage.getItem(namespace)
    ? JSON.parse(localStorage.getItem(namespace) as string)
    : defaultValue;
}

/**
 * Update localstorage
 * @param IUpdateLocalStorage
 * @returns void
 */
export function updateLocalStorage({
  namespace,
  value,
}: IUpdateLocalStorage): void {
  localStorage.removeItem(namespace.toString());
  localStorage.setItem(namespace.toString(), JSON.stringify(value));
}
