import * as yup from 'yup';

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

export const getShiftJISByteLength = (s: any) => {
  // count japanese characters as two-bytes
  return s.replace(
    /[^\x00-\x80｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ ﾞ ﾟ]/g,
    'xx',
  ).length;
};
