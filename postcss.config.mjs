/** @type {import('postcss-load-config').Config} */
const config = {
  "plugins": {
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {
      "autoprefixer": {
        "flexbox": "no-2009"
      },
      "stage": 3,
      "features": {
        "custom-properties": false
      }
    },
    "tailwindcss": {},
    "postcss-rtlcss": {
      mode: "combined"
    },
    "postcss-pxtorem":{
      rootValue: 16,
      propList: ['*'],
    }
  }
}

export default config;
