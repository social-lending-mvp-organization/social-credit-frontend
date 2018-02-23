module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "es6": true,
    "browser": true,
    "jest": true,
  },
  "rules": {
    // .jsx is legacy according to 
    // https://github.com/facebook/create-react-app/issues/3052
    "react/jsx-filename-extension": false,
    // Disable props validation for objects
    "react/forbid-prop-types": false
  }
};