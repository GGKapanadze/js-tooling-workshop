## Javascript Tooling

#### 📅 7.11.2019

#### 🏰 Caucasus University

---

## Chapter 1 - `Formating`

#### Main Tool: `prettier`(https://prettier.io/)

#### Installation: `npm i --save-dev prettier`

#### Basic config: `.prettierrc`

```json
{
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```

### NPM Script:

```json
{
  "scripts": {
    "format": "prettier --write",
    "format:all": "prettier --write 'src/**/*.js'",
}
```

#### 🔔 VSCode extension: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

### Chapter 1.1 - `git hooks 🚀`

#### Tools: `husky` and `pretty-quick`

- `husky` - tool for githooks (https://www.npmjs.com/package/husky)
- `pretty-quick` - prettier githook implementation (https://www.npmjs.com/package/pretty-quick)

#### Installation: `npm i --save-dev husky pretty-quick`

#### `package.json` config :

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "pretty-quick --staged --pattern 'src/**/*.js'"
    }
  }
}
```

---

## Chapter 2 - `Linting`

#### Main Tool: `eslint`(https://eslint.org/)

#### Installation: `npm i --save-dev eslint`

#### Init command: `/node_modules/.bin/eslint --init`

### NPM Script:

```json
{
  "scripts": {
    "lint": "eslint 'src/**/*.js'",
}
```

#### Basic config: `.eslintrc.json`

```json
{
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": ["eslint:recommended", "prettier"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "no-console": "off"
  }
}
```

#### `eslint:recomendder` rules - https://eslint.org/docs/rules/

### Chapter 2.1 - `eslint prettier integration`

#### Aim : make prettier rules valid for eslint

#### Tools: `eslint-plugin-prettier` and `eslint-config-prettier`

#### Installation: `npm i --save-dev eslint-config-prettier eslint-plugin-prettier`

#### prettier supported config: `.eslintrc.json`

```json
{
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": ["eslint:recommended", "prettier"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "prettier/prettier": "error",
    "no-console": "off"
  },
  "plugins": ["prettier"]
}
```

### Chapter 2.2 - `airbnb eslint`

#### Aim : implement airbnb rules

#### Airbnb javascript: https://github.com/airbnb/javascript

#### Tools: `eslint-config-airbnb-base`(https://www.npmjs.com/package/eslint-config-airbnb-base)

#### Installation: `npx install-peerdeps --dev eslint-config-airbnb-base`

#### airnb & prettier supported config: `.eslintrc.json` (final)

```json
{
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": ["eslint:recommended", "airbnb-base/legacy", "prettier"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "prettier/prettier": "error",
    "no-console": "off"
  },
  "plugins": ["prettier"]
}
```

#### 🔔 VSCode extension for eslint: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

---

## Chapter 3 - `Transpiling`

#### Main Tool: `babel`(https://babeljs.io)

#### Installation: `npm i --save @babel/core @babel/cli @babel/preset-env`

#### Basic config: `.babelrc`

```json
{
  "presets": ["@babel/preset-env"]
}
```

### NPM Script:

```json
{
  "scripts": {
    "babel": "babel 'src/**/*.js' -d transpiled/",
}
```

### Chapter 3.1 - `browserslist`

#### Basic config: `.browserslistrc`

```
> 0.25%
not dead
```

#### browserslist project - https://github.com/browserslist/browserslist

---

### Chapter 4 - `webpack`(basics)

#### Main Tool: `webpack`(https://webpack.js.org/)

#### Installation: `npm i --save webpack webpack-cli`

### NPM Script:

```json
{
  "scripts": {
    "build": "webpack",
}
```

#### Chapter 4.1 - `webpack config`

#### Tools:

- `webpack-dev-server` (https://webpack.js.org/configuration/dev-server/)
- `webpack-merge` (https://github.com/survivejs/webpack-merge)
- `clean-webpack-plugin` (https://github.com/johnagan/clean-webpack-plugin)
- `html-webpack-plugin` (https://github.com/jantimon/html-webpack-plugin)
- `uglifyjs-webpack-plugin` (https://github.com/webpack-contrib/uglifyjs-webpack-plugin)
- `babel-loader`(https://github.com/babel/babel-loader)

#### Installation: `npm i --save webpack-dev-server webpack-merge clean-webpack-plugin html-webpack-plugin uglifyjs-webpack-plugin babel-loader`

#### Main config file `webpack.config.js`

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[hash]-bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin()]
};
```

#### Prod config file `webpack.prod.js`

```js
const merge = require('webpack-merge');
const mainConfig = require('./webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(mainConfig, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.(js)$/
      })
    ]
  }
});
```

#### Dev config file `webpack.dev.js`

```js
const path = require('path');
const merge = require('webpack-merge');
const mainConfig = require('./webpack.config.js');

module.exports = merge(mainConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
});
```

### NPM scripts

```json
{
  "scripts": {
    "build": "webpack --config webpack.prod.js",
    "dev": "webpack-dev-server --open --config webpack.dev.js"
  }
}
```
