// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'https://wielrenapi.herokuapp.com',
  // apiBaseUrl: 'http://localhost:3000',
  firebase: {
    apiKey: 'AIzaSyDqZ6wBr5VZ2w3E0lt1fqaWdGeTLdsaHUM',
    authDomain: 'wielerspel-aec4b.firebaseapp.com',
    databaseURL: 'https://wielerspel-aec4b.firebaseio.com',
    projectId: 'wielerspel-aec4b',
    storageBucket: '',
    messagingSenderId: '121086252622'
  },
  hmr: false
};
