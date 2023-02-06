import { setLocale, addMethod, string } from 'yup';
import {
  alphabetOnly,
  validShopNameLength,
  urlRegexValidator,
} from '@/_helpers/validators';
import i18n from '@/plugins/i18n';

const { t } = i18n.global;
const locale = (
  key: string,
  file = 'validation',
  placeholder?: any,
): string => {
  return t(`${file}.${key}`, placeholder);
};

// Example: https://www.programcreek.com/typescript/?api=setLocale
// Official doc: https://github.com/jquense/yup#localization-and-i18n
setLocale({
  mixed: {
    required: locale('error.required'),
    oneOf: locale('passwords_must_match'),
  },
  string: {
    email: locale('error.email_format'),
    max(params) {
      return locale('max_length', 'validations', { length: params.max });
    },
    url: locale('error.missing_http'),
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
