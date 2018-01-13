// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDu5q6RPZOEB6strhLzDBLvJy36FAa30Y4",
    authDomain: "ng4-task-tracker.firebaseapp.com",
    databaseURL: "https://ng4-task-tracker.firebaseio.com",
    projectId: "ng4-task-tracker",
    storageBucket: "ng4-task-tracker.appspot.com",
    messagingSenderId: "311151891896"
  }
};
