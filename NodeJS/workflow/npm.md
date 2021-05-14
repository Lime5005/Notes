### Debug and easier development
- We use `node app.js` to run the script, there is a better way.
- `npm init`, answer all the questions, got a new `package.json` file.
- Add `"start": "node app.js"` in `script`.
- Run `npm start` instead of `node app.js`.
> In Angular or React or Vue, we run `npm run dev`, it's the same, if key-value is `"start-server": "node app.js"`, then run `npm run start-server`.

### Install 3rd party packages
- We use "ctl + c" to quit the server, there is a package to help for this.
- `npm install nodemon --save-dev` or `-g` to intall globally
- Now we have `node_modules`, `package-lock.json` and updated `package.json`.
- `npm install`
- To free space when you don't use your project, delete the `node_modules`, and later when you need it, run `npm install` to re-install it.
> Unlike Core Node.js modules (they just need to be imported), 3rd party modules need to be installed (by `npm install`) AND imported.
```js
npm install --save express-session
const sessions = require('express-session)
```
- Change in `package.json`, the script to `"start": "nodemon app.js"`, then run `npm start`, so we don't have to re-start each time the server, it'll catch the update code and re-start automatically.

### Fixing errors
#### Type of errors:
- Syntax errors: mistakes in lack of a "}" or key word typo error. 
- Runtime errors: read the error message in terminal carefully.
- Logical errors: use VScode debug
