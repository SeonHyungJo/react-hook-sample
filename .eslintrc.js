module.exports =  {
    parser:  '@typescript-eslint/parser', 
    extends:  [
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    ],
   parserOptions:  {
      ecmaVersion:  2018, 
      sourceType:  'module',
    },
    rules:  {
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
      "indent": "off",
      "@typescript-eslint/indent": ["error", 2]
    },
  };