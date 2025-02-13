module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'chore',
        'docs',
        'style',
        'refactor',
        'test',
        'revert',
        'ci',
      ],
    ],
    'header-max-length': [2, 'always', 100], // Giới hạn độ dài tiêu đề
  },
};
