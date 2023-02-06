export default {
  has_duplicate_symbol: '「 {symbol} 」は2回以上使用できません。',
  has_double_symbol: '「 {symbol} 」は2回以上使用できません。',
  has_forbidden_symbol: '「 {symbol} 」は使用できません。',
  has_triplicate_symbol: '「 {symbol} 」は3回以上使用できません。',
  consecutive_symbol: '記号を連続で使用できません。(例: !! , ??, **)',
  same_symbol: '※「！」「？」は同種の記号です。',
  nonsensical_characters:
    '意味不明な文字の羅列は使用できません。(例: ああああ, 111111, \\\\)',
  ornamental_symbol: '記号や文字の装飾的な使用はできません。(例: ＞AdSIST＜)',
  smileys: '顔文字は使用できません。(例: :), ;), (・∀・), (^_^))',
  emojis: ' 記号と絵文字は禁止されています。',
  ornamental_spacing: 'スペースの装飾的な使用はできません。(例: T O W E R)',
  unpaired_brackets:
    '種類の違う括弧を組み合わせて使用できません。(例:（Official＞)',
  all_caps_character: '単語をすべて大文字で入力することはできません。',
  spacing_letters:
    '一文字置きにスペースを挿入することはできません。また、スペースの装飾的な使用はできません。(例: T O W E R, T  OWER)',
  phone_numbers_not_allowed: '電話番号は使用できません。',
  same_headline: '広告見出しが同ーです。別の広告見出しを入力してください。',
  same_content: '内容は同じです。別の内容を入力してください。',
  same_description: '説明文が同一です。別の説明文を入力してください。',
  required: '必ずご入力ください',
  max_length: '{length}文字以内で入力をお願いします。',
  byte_max_length:
    '全角{full_width}（半角{half_width}）文字以下で入力してください。',
  email: 'メールアドレスが不正です。',
  url: '「https://」または「http://」から始まるURLをご入力ください。',
  numeric: '半角数字で入力してください。',
  decimal: 'このフィールドは小数値を受け入れます。 小数点以下1桁まで。',

  // Google Delivery Setting Modal
  min_value_days: '前に入力した日数より大きい日数にしてください。',
  min_value_zero: '日数は1から入力してください。',
  at_least_to_pick_one: '少くとも一つを選択してください。',

  // Area Targeting
  duplicate_validation: '入力した値はすでに記録されています。',
  postal_code: '正しい郵便番号を入れてください（160-0004または1600004）',
  valid_postal_code:
    '入力された郵便番号は存在しないか、すでに選択されています。',
  postal_code_zeros: '正しい郵便番号を入れてください',
  radius: '{min}から{max}の範囲内にしてください。',
};
