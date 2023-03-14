import { setLocale, addMethod, string } from 'yup';
import i18n from '@/plugins/i18n';

const { t } = i18n.global;
const locale = (
  key: string,
  placeholder?: any,
): string => {
  return t(key, placeholder);
};

export const alphabetOnly = (value: string | undefined) => {
  if (value && value.length > 0) {
    return /^([a-zA-Z0-9]{8,12})$/.test(value);
  }
  return true;
};

export const validShopNameLength = (value: string | undefined) => {
  // count japanese characters as two-bytes
  if (value && value.length > 0) {
    let stringLength = value.replace(
      /[^\x00-\x80｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ ﾞ ﾟ]/g,
      'xx',
    ).length;

    return stringLength <= 20;
  }

  return true;
};

export const urlRegexValidator = (value: string | undefined) => {
  if (value && value.length > 0) {
    return /^([a-zA-Z0-9!@#$&()-`.+,/\]|[\uff66-\uff9f])+$/.test(value);
  }
  return true;
};

// Example: https://www.programcreek.com/typescript/?api=setLocale
// Official doc: https://github.com/jquense/yup#localization-and-i18n
setLocale({
  mixed: {
    required: locale('required'),
    oneOf: locale('passwords_must_match'),
  },
  string: {
    email: locale('email_format'),
    max(params) {
      return locale('max_length', { length: params.max });
    },
  },
});

addMethod(
  string,
  'alphabetOnly',
  function (
    mapper = (a: any) => a,
    message = t('validation.error.alphabet_only'),
  ) {
    return this.test('alphabetOnly', message, (value) => alphabetOnly(value));
  },
);

addMethod(
  string,
  'validShopNameLength',
  function (
    mapper = (a: any) => a,
    message: string = 'Invalid shop name length',
  ) {
    return this.test('validShopNameLength', message, (value) =>
      validShopNameLength(value),
    );
  },
);

addMethod(
  string,
  'urlRegexValidator',
  function (
    mapper = (a: any) => a,
    message: string = t('validation.error.regex_error_only_half_width'),
  ) {
    return this.test('urlRegexValidator', message, (value) =>
      urlRegexValidator(value),
    );
  },
);
