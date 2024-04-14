module.exports = {
  presets: [
    [
      '@vue/app', 
      {
        // polyfills: [
        //   'es.promise',
        //   'es.symbol'
        // ]
      }
    ],
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'entry',
        'corejs': '3.8.3'
      }
    ]
  ]
}
