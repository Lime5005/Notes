### How to connect mysql with larval
Firstly, check `env.`->  ‘host’, ‘database’, ‘user’, ‘password’  
Create database `database name` in mysql;  
Then, check `config`->`database.php`, get the correct `host`: `localhost` or `127.0.0.1`, change the 3 infos above.  

> You have to edit `.env` files. 
> You have to add the database name, database user and database password if exists. Once you save it, you need to hit a command in the terminal `php artisan serve`(Without quotes). Whenever you edit the `.env` file, make sure to hit that command.


1. Laravel built-in server, run by `php artisan serve`:
In `.env`
```php
APP_URL=http://127.0.0.1:8000/

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=database_name
DB_USERNAME=ur_username
DB_PASSWORD=ur_password
```
In `database.php`
```php
'host' => env('DB_HOST', '127.0.0.1'),
'port' => env('DB_PORT', '3306'),
'database' => env('DB_DATABASE', 'database_name'),
'username' => env('DB_USERNAME', 'ur_username'),
'password' => env('DB_PASSWORD', 'ur_password'),
```

2. Laravel run by __localhost__, __MAMP__
Url:  
(http://localhost:8888/folder_name/public/)  
How to config in `.env` and `database.php`:  
```php
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=database_name
DB_USERNAME=root
DB_PASSWORD=ur_password
DB_SOCKET=/Applications/MAMP/tmp/mysql/mysql.sock
```
```php
'host' => env('DB_HOST', 'localhost'),
'port' => env('DB_PORT', '3306'),
'database' => env('DB_DATABASE', 'database_name'),
'username' => env('DB_USERNAME', 'root'),
'password' => env('DB_PASSWORD', 'ur_password'),
// 'unix_socket' => env('DB_SOCKET', ''),
'unix_socket' => env('DB_SOCKET', '/Applications/MAMP/tmp/mysql/mysql.sock'),
```
> —> Test by run `php artisan migrate`, see `users` table in __phpMyAdmin__
