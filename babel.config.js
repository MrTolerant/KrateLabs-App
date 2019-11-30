module.exports = {
  'presets': [
    ['@babel/env', {
      'targets': {
        'browsers': '> 0.25%, not dead'
      },
      'loose': true
    }],
    '@babel/preset-react',
    '@babel/typescript'
  ],

  'plugins': [
    'emotion',
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-runtime',
    [
      'css-modules-transform',
      {
        'extensions': ['.styl', '.css', '.scss']
      }
    ]
  ]
}
