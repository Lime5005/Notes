### Create a new laravel project in MAMP/htdocs folder
`cd /Applications/MAMP/htdocs`  
`laravel new ProjectName`  
Or `composer create-project laravel/laravel ProjectName --prefer-dist`  

### Structures
Folder `App` for `Models` and `Controllers`   
Folder `Config`->`database.php` to connect database, `mail.php` for if you want to use   mail
Folder `Database`: to create tables  
Folder `Public` for js  
`Resource` for compile files using `webpack.mix.js`  
`View` for pages  
`Controller` is a middleman for database and views  
`Resources` once compiled will go to public folder  

### How to Make a route
In `web.php`
```php
Route::get(‘url/{id}/{name}’, function($id, $name){
	return view(with the $id, $name);
});
```
### How to make a model and a table
`php artisan make:model User -m`

### How to make a controller
- make a file directly in controllers folder;
- use `php artisan make:controller PostController`
- use `php artisan make:controller PostController —resource`

### Know all the php artisan can do
`php artisan`

### Get all the methods from `controller`
`Route::resource(‘posts’, ‘PostsController’);`

### How to write php code in `blade.php`
`{{ php code }}`

### How to pass variables from `controller` to `view`:  ‘name’ => $variable
- `return view('posts.category', ['cat' => $cat]);`  
- `return view('users.edit', compact('user’, ‘id’, ‘username’));`  
- `return view('users.edit’)->with(‘user’, $user);`  

### How to retrieve data from `controller` to `blade.php`
> Eg. $data is [];
> @if(count($data))
>	@foreach($data as $entry)
> code something
>	@endforeach
> @endif

### What is migration
Table generators, column generators

### Create a table
`php artisan make:migration create_posts_table —create=“posts”`  
`$table` can be `->nullable() / ->default(false) / ->unique()`  

### Add  a column to a table
`php artisan make:migration add_is_admin_to_users_table  —table=“users”`  
Add data type in the `$table`, then run `php artisan migrate`  

### `php artisan migrate`
- migrate:fresh        Drop all tables and re-run all migrations
- migrate:install      Create the migration repository
- migrate:reset        Rollback all database migrations
- migrate:refresh      Reset and re-run all migrations
- migrate:rollback     Rollback the last database migration
- migrate:status       Show the status of each migration

> If you have data that you don’t want to delete, use `php artisan migrate`
> Make sure Model/View/Controller are all changed, otherwise the database will not accept.
