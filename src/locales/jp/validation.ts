export default {
  error: {
    required: '必ずご入力ください',
    format: 'Error: format invalid',
    email_format: 'メールアドレスが不正です。',
    passwords_must_match: '入力したパスワードと確認用パスワードが一致しません',
    min_length: 'Minimum characters: ',
    max_length: 'Maximum characters: ',
    alphabet_only: '半角英数字8~12桁にてご入力ください',
    regex_error_only_half_width: '半角でご入力ください',
    invalid_credentials:
      'ログインに失敗しました。メールアドレスとパスワードをご確認下さい。',
    incorrect_credit_card: 'カード情報が正しくありません',
    inquire_card_company: 'カード会社にお問い合わせください。',
    half_width_numbers_only: '半角数字で入力してください。',
    must_be_hundred_multiple: '100の倍数になるように値の必要性。',
    campaign_name_create:
      '漢字・ひらがな・カタカナ、英数字、ダッシュ（ - ）、アンダースコア（ _ ）から３５０文字以内で入力をお願いします。',
    missing_http:
      '「https://」または「http://」から始まるURLをご入力ください。',
    missing_https:
      '最適なパフォーマンスのために「https://」 を使用してください。',
    forbidden_duplicated_symbols: '「 {symbol} 」は2回以上使用できません。',
    forbidden_triplicated_symbols: '「 {symbol} 」は2回以上使用できません。',
    forbidden_symbols: '「 {symbol} 」は使用できません。',
    inactive_user:
      '現在アカウントが停止されており、登録ができません。お手数ですが、下記の「メールでお問い合わせ」より弊社までご連絡をお願いいたします。',
    inactive_colorme_store_user:
      'AdSISTアプリはアンインストールされています。ColormeアプリストアよりAdSISTアプリをインストールしてください。',
    card_number: 'クレジットカード番号が正しくありません。',
    expire: 'クレジットカードの有効期限をご確認のうえ、入力し直してください。',
    security_code: 'セキュリティーコードをご確認のうえ、入力し直してください。',
    card_name:
      'クレジットカードの名義人が入力されていないか、正しく入力されていません。名義人は、半角英字でカードに記載されているとおりに入力してください。',
    unknown_error:
      '予期せぬエラーが発生しました。管理者にお問い合わせください。',
  },
  toast: {
    inactive_user: 'アカウントは非アクティブです。',
    inactive_colorme_store_user: 'AdSISTアプリをインストールしてください。',
    invalid_credentials: 'ログインできませんでした。',
  },
  required: '必ずご入力ください',
  email: 'メールアドレスが不正です。',

  // Password reset
  passwords_must_match: '入力したパスワードと確認用パスワードが一致しません',
  password_min_length: '新しいパスワードは半角英数字8~12桁にてご入力ください。',

  // Registration
  password_policy: 'パスワードは、英大文字、英小文字、数字、および記号すべて1文字以上含む8文字以上（全て半角）で入力してください'
};
