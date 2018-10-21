// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  firebase: {
    apiKey: "AIzaSyD6LEXz9Z1A9Ak9P5FWu8eVsT3l_Qrs8yw",
    authDomain: "assessment-marking-tool.firebaseapp.com",
    databaseURL: "https://assessment-marking-tool.firebaseio.com",
    projectId: "assessment-marking-tool",
    storageBucket: "assessment-marking-tool.appspot.com",
    messagingSenderId: "167373632050"
  }
};
