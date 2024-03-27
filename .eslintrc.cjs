module.exports = {
  extends: [
    'alloy',
    'alloy/react',
    'alloy/typescript',
  ],
  env: {
    browser: true,
    node: true,
  },
  globals: {},
  rules: {
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/method-signature-style': 'off',
    '@typescript-eslint/prefer-for-of': 'off',
    'max-params': 'off',
    'no-template-curly-in-string': 'off'
  },
};
