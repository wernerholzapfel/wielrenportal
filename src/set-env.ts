// import {writeFile} from 'fs';
// import {argv} from 'yargs';
// // This is good for local dev environments, when it's better to
// // store a projects environment variables in a .gitignore'd file
// import 'dotenv/config';
//
//
//
//
// // Would be passed to script like this:
// // `ts-node set-env.ts --environment=dev`
// // we get it from yargs's argv object
// const environment = argv.environment;
// const isProd = environment === 'prod';
//
// const targetPath = isProd ? `./src/environments/environment.${environment}.ts` : `./src/environments/environment.ts`;
// const envConfigFile = `
// export const environment = {
//   production: ${isProd},
//    apiBaseUrl: '${process.env.apiBaseUrl}',
//   firebase: {
//     apiKey: '${process.env.APIKEY}',
//     authDomain: 'wielerspel-aec4b.firebaseapp.com',
//     databaseURL: 'https://wielerspel-aec4b.firebaseio.com',
//     projectId: 'wielerspel-aec4b',
//     storageBucket: '',
//     messagingSenderId: '${process.env.messagingSenderId}'
//   },
//   hmr: false
// };
// `
// writeFile(targetPath, envConfigFile, function (err) {
//   if (err) {
//     console.log(err);
//   }
//
//   console.log(`Output generated at ${targetPath}`);
// });
