# firebase-auth-hasura

## Sample Hasura Auth with Firebase

1. Install Hasura on Heroku
   https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku

2. Configure Hasura instance on Heroku to enable JWT token for Firebase Auth: Inside Heroku dashboard in Settings - Config Var add the following Config Vars

```
HASURA_GRAPHQL_ACCESS_KEY   blablabalalbablabalabl
HASURA_GRAPHQL_ENABLE_CONSOLE true
HASURA_GRAPHQL_JWT_SECRET {"type":"RS512","jwk_url": "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"}
```

2. Click on Open App, add the Access Key to access Hasura Console

3. Clone project from github

```
git clone https://github.com/leoalves/hasura-firebase-auth.git
```

4. Install Firebase cli

```
npm install -g firebase-tools
```

5. Go to the Firebase Console

6. Create a new Firebase Project

7. In the Firebase Project click in the hosting tab to enable hosting

8. In the Firebase Console change the Plan from Free to Blaze - pay as you go (The free plan does not allow request to a separate url (The Hasura inside Heroku))

9. Initiate your Firebase Project in the project root, creating a new project

```
firebase init
```

⋅⋅⋅ Are you ready to proceed? Y
⋅⋅⋅ Which Firebase CLI features do you want to setup? (Select Hosting and Functions)
⋅⋅⋅ Are you ready to proceed? Y
⋅⋅⋅ What language would you like to use to write Cloud Functions? Select Typescript
⋅⋅⋅ Do you want to use TSLint to catch probable bugs and enforce style? Y
⋅⋅⋅ File functions/package.json already exists. Overwrite? N
⋅⋅⋅ File functions/tsconfig.json already exists. Overwrite? N
⋅⋅⋅ File functions/src/index.ts already exists. Overwrite? N
⋅⋅⋅ File functions/.gitignore already exists. Overwrite? N
⋅⋅⋅ Do you want to install dependencies with npm now? Y
⋅⋅⋅ What do you want to use as your public directory? (public) ./app/build
⋅⋅⋅ Configure as a single-page app (rewrite all urls to /index.html)? Y
⋅⋅⋅ File /app/public/index.html already exists. Overwrite? N

10. Change the project to the new one you just created

```
firebase use --add new-project-id
```

5. Go to the functions folder

```
cd functions
```

6. Install dependencies

```
npm install
```

7. Change the functions config url to the Heroku graphql instance you just created. Open the file ./functions/src/config/graphql.ts and change the graphql_host variable to the new graphql endpoint. You can get the Graphql endpoint in the Hasura Console where the GraphIQL is. Also change the hasuraAccessKey variable to the one defined in the env vars in Heroku (step 2)

8. Deploy the Firebase function to create the user ( If on windows rename the firebase.json from the root directory from `$RESOURCE_DIR` with `%RESOURCE_DIR%`)

```
firebase deploy --only functions
```

8. Open /app/src/config/config.ts and change the firebaseUrl variable with the function url returned from the firebase deploy command

9. In the same file (/app/src/confg/config.ts) change the graphqlUrl and subscriptionUrl with the Hasura Graphql endpoint.

10. Change the Firebase Web Config settings in the React App. Go to the Firebase console. Select your project. Select Settings - Project Settings - Under Your Apps section. Select the web icon and copy the Firebase config variable and replace the config variables in the file /app/src/firebase/index.ts

11. Go to the app folder. Install dependencies and build the React App

```
cd app
```

11. Install Dependencies

```
npm install
```

12. Build Production App

```
npm run build
```

11. Deploy the Build React App to Firebase Hosting

```
firebase deploy --only hosting
```

12. Go to the url of the new site deployed. You should be able to create new users, login and reset password.
