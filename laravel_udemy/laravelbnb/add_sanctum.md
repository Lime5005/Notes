### Why sanctum?
> Easy to implement, and based on user sessions, for it's own application, which is not intend to be provided for other users outside of the APP.   
- See in dev tools -> Application -> Cookies, you find a `laravel_session` and `XSRF-TOKEN` data, so it's secure.

### Install sanctum
- `composer require laravel/sanctum`.
- `php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"`. 
- `php artisan migrate`.
- Go to `Kernel.php`, add in array `api`: `\Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,`.

### Config sanctum
- In `config` folder, find `sanctum.php`, you'll have to config this file for the server & domain that you use, see detail explanation in the comments of the file.
- You'll have to add `SANCTUM_STATEFUL_DOMAINS=localhost, 127.0.0.1, laravel.dev, etc`, in the `.env` file.

#### Cors and cookies
> If you are using a separate subdomain, you'll have to:   
> 1, set `'supports_credentials' => true` in `config/cors.php` .    
> 2, in `resources/js/bootstrap.js`, add `window.axios.defaults.withCredentials = true;`.   
> See details in [sanctum_cors_and_cookies_doc](https://laravel.com/docs/8.x/sanctum#cors-and-cookies).    

### Generate some fake users
- In `UserFactory`, see users will have one password.
- We still need user seeder, run `php artisan make:seeder UsersTableSeeder`.
- In the new file, in method `run`: `User::factory()->count(100)->create();`, so we can generate 100 user and save them to database.
- Register this seeder in `DatabaseSeeder.php`: `UsersTableSeeder::class,`, put it on the top of the array to run first, because all the other data need to be linked with the user!
- Run `php artisan migrate:refresh --seed`.
- See in database, we now have 100 users with the same password, as described in `UserFactory`.

### Auth
- Run `composer require laravel/ui`.
- Generate basic scaffolding `php artisan ui vue`, then `npm install & npm run dev & npm run watch`.
- Generate login/registration scaffolding: `php artisan ui vue --auth`.
- Then `npm install & npm run dev & npm run watch`.
- Now run `php artisan route:list`, we have the routes like: "login", "logout", "password/confirm", and also GET `sanctum/csrf-cookie`, etc.
- See [sanctum_auth](https://laravel.com/docs/8.x/sanctum#spa-authenticating).
- See in `web.php`, we have new lines of code added automatically:
```php
use Illuminate\Support\Facades\Auth;
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
```

### Instead of redirect, after login, what 
- In `LoginController.php`, we see it will redirect user to home page, if we use it's form, but here we'll use our own form from Vue, and the data transfer from vue using axios.
- What does the redirect do, see details in `AuthenticatesUsers.php` -> `redirectPath()`.
> Click control + click, go to definition, open the file where has the function.   
- In `RedirectsUsers.php`, see how the function is defined.
- See the function `authenticated` is empty, so laravel will always lead to redirect to another page by default, when user is authenticated, we don't want this since we have a vue frontend, so copy the function, move it to `LoginController.php`, to override the default behavier.
```php
use Illuminate\Http\Request;
protected function authenticated(Request $request, $user)
{
    if ($request->isXmlHttpRequest()) {
        return response(null, 204); // 204 is success, but return 0 content.
    }
}
```
- Move this route from `api.php` to `web.php`:
```php
Route::middleware('auth')->get('/user', function (Request $request) {
    return $request->user(); // auth:api changed to auth
});
``` 

### Now implement laravel's auth to Vue
> Meet some errors, the file `app.js` is disapeared, cannot find `FetalErrors` or `ValidationErrors` component, after copy from github, changed the name, and solved a `Vue.use is not a function` error; if the font awesome doesn't work, check `app.scss`.   
- Add below in `app.js` -> `beforeCreate()`,
```js
await axios.get('/sanctum/csrf-cookie')
await axios.post('login', {
    email: 'xxx',
    password: 'xxxx'
})
```
- Refresh the page, see Network -> Name -> `csrf-cookie`, Status 204, -> Name -> login -> Status 422 -> Preview -> `message: errors [These credentials do not match our records]`.
- Try to login with a fake email copied from database, password is `password`, refresh the page, login -> Status 204 No content, so now we are authenticated!
- Try `await axios.get('/user')`, Network -> user -> user's info appeared.
- Delete from Application -> Cookies, comment `axios.post('login')` in `app.js`, refresh the page, see Network -> user -> message: "Unauthenticated."
- So the user's info and login route is protected by sanctum.

### Create all components for auth
- In `js` folder, create a new `auth` folder, and a new component `Login`, and add some content in the template.
- Add a path `/auth/login` in `route.js`, try in page, see the component content.
- In the new component, use bootstrap `card` to style a form.
- Add a router link for register page, then another for forget password page.

#### Add a logic for login
- Handling user input errors by re-using the mixins `validationErrors`.
- Use async/try,catch/await pattern for method `login()`.
```js
async login() {
    this.loading = true
    this.errors = null
    try {
    await axios.get('/sanctum/csrf-cookie')
    await axios.post('/login', {
        email: this.email,
        password: this.password
    })
    await axios.get('/user')
    } catch(error) {
    this.errors = error.response && error.response.data.errros
    }
    this.loading = false
}
```
- Try to login with a fake email and 'password' from database, see Netword -> user -> Preview, the user data is returned as requested by `await axios.get('/user')`.


#### Save the user's login/logout session in the store
- In `store.js`, add a state property: `isLoggedIn: false`, and a `user` object, to auto-fill the user info when he wants to book.
- In `utils` folder, create a new file `auth.js`, to export functions `'isLoggedIn', 'logIn', 'logOut'` to keep the sessions in localStorage.
- Add a mutation to modify the `user`'s state `setUser`, and `setLoggedIn` to modify `isLoggedIn`.
- Add an action `async loadUser()` to call axios get user data, and modify states: `'user', 'isLoggedIn'` by calling the mutations and then store the user's session by calling the `auth.js` functions.
- In `app.js`, add `loadUser()` just in `async beforeCreate()`, so the user's data is auto-filled.

#### Re-use the functions in `auth.js` for localStorage
- In `Login.vue`, use `logIn` from `auth.js` to save the user's session.
- use `this.$store.dispatch('loadUser')` to load user data.
- Use the same function in `app.js`->`beforeCreate()`.

#### Add router-link in `Index.vue` for user to login/logout/register
- Use `v-if="isLoggedIn"` or `v-if="!isLoggedIn"` to show/hide the links according to user's session.

#### What does laravel do to logout user?
- From `LoginController.php`, right click ->`AuthenticatesUsers` -> Go to Definition -> `AuthenticatesUsers.php`, see the function `logout()`, it's the default function to redirect the user, we copy the empty function below it `loggedOut()` to `LoginController.php`, and redefine it as:
```php
if ($request->isXmlHttpRequest()) {
    return response(null, 204);
}
```
- So the user is not redirect anywhere.

### Logic for register user in `Register.vue`
- In `Register.vue`, also use `logIn` from `auth.js` to save the user's session.
- The `register()` method is similar as `login()`, we post an axios request to register a new user, then `logIn()`, and `loadUser`, then redirect to home page.
- Check if a user can register, try the errors message.
- But before register a user, check in `RegisterController.php`, -> right click `RegistersUsers` -> Go to Definition -> in the new file `trait RegistersUsers`, see function `register`, the default behavior is to redirect user, since the function `registered` is empty;
> We don't want the default behavior, we need to return the user data in JSON format, as defined in `Register.vue`, so the user is at the same time been authenticated.   
- So just copy it to `RegisterController.php` and re-write it.
```php
use Illuminate\Http\Request;
protected function registered(Request $request, $user)
    {
        if ($request->isXmlHttpRequest()) {
            return $user;
        }
    }
```
> We should never modify Laravel library itself, but just copy from it.   
- Now clear the cookies, and try to register a new user.
- See Applications -> isLoggedIn: true; -> Network -> user -> Preview: all data; -> Vuex -> setLoggedIn: true, so the user is registered, and logged in, and been authenticated immediately.
