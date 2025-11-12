// lint-staged.config.mjs
export default {
  '*.{js,ts,vue}': 'eslint --fix',
  '*.{json,css,scss,md}': 'prettier --write'
}
