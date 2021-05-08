- First, `make:model Product`  
- Then, `make: ProductController`  
- And, `$fillable` all the infos `‘name’, ‘price’, ‘description’, ‘slug’`  
- Give all the CRUD functions  
- Test in `Postman`, all the functions `GET, POST, PUT, DELETE, search`  

1. `composer require laravel/sanctum`  
- See `composer.json` if the `sanctum` is installed  

2. Migrate
- `php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"`  
- See `database`-> `migrations`->`create_personal_accsess_tokens`  

3. `php artisan migrate`
- add in the database, see DB browser for SQLite  

4. Add in `Kernal.php` file
- Find the `api` line, and replace them by  
```php
'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
```
5. Go to `User.php`, add
```php
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
}
```

6. Add to protected routes:  `search`  by `sanctum`
```php
Route::group(['middleware' => ['auth:sanctum']], function(){
    Route::get('products/search/{name}', [ProductController::class, 'search']);
});
```

7. Test in `Postman`
- `Header`-> `accept, application/json`  
- `GET http://127.0.0.1:8000/api/products/search/iphone`  
- See  `"message": "Unauthenticated."`  
- Test success!  

> Now you can decide which routes you want to protect by sanctum   
> And move them to the group, such as ‘post’, ‘put’, ‘delete’, only authenticated user can have access.   

### Go to make a user controller
- `php artisan make:controller AuthController`  
- See in `Http` -> `Controllers` -> `AuthController`  
1. Add below:
```php
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

public function register(Request $request) {
  $fields = $request->validate([
      'name' => 'required|string',
      'email' => 'required|string|unique:users,email',
      'password' => 'required|string|confirmed'
  ]);

  $user = User::create([
      'name' => $fields['name'],
      'email' => $fields['email'],
      'password' => bcrypt($fields['password'])
  ]);

  // Give us a token
  `$token = $user->createToken('myapptoken')->plainTextToken;`

  $response = [
      'user' => $user,
      'token' => $token
  ];

  return response($response, 201);
}
```

2. Now add a route to `api.php`
```php
use App\Http\Controllers\AuthController;
Route::post('/register', [AuthController::class, 'register']);
```

3. Test in `Postman`
- Add `name`, `email`, `password`, `password_confirmation`, `header` : `accept app/json`, and use `POST`, it gives a token, success!

4. Test to use this token to post a new product in `Postman`
- Copy it to `Authorisation`, choose Type `Bearer token`, and change the infos(`name`, `price`, ect.) in `Body`, use `POST`,  success!

> Destroy the token once user logout:
- Go to `AuthController.php` -> add a function as below:
```php
public function logout(Request $request){
    auth()->user()->tokens()->delete();

    return [
        'message' => 'Logged out'
    ];
}
```

5. Create a route in the protected routes group to logout in `api.php`:
- `Route::post('/logout', [AuthController::class, 'logout']);`

6. Try to logout without token in `Postman`, `"message": "Unauthenticated."`  
- Try to use the token to logout, success! `"message": "Logged out"`  
- Try to post a product without the token, `"message": "Unauthenticated." ` All right!  

7. Create a login function in `AuthController.php`
```php
public function login(Request $request) {
    $fields = $request->validate([
        'email' => 'required|string',
        'password' => 'required|string'
    ]);
    
    // Check email
    $user = User::where('email', $fields['email']) -> first();
    // Check password
    if(!$user || !hash::check($fields['password'], $user->password)) {
        return response([
                'message' => 'Bad request'
            ], 401
        );
    }

    // Give us a token
    $token = $user->createToken('myapptoken')->plainTextToken;

    $response = [
        'user' => $user,
        'token' => $token
    ];

    return response($response, 201);
}
```

8. Add a route to public routes  
- `Route::post('/login', [AuthController::class, 'login']);`

9. Now test to login in `Postman`, with the email and password, it works!
