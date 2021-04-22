### One to many relations CRUD
`php artisan make:model Post -m`  
Add these lines in the new table `create_posts`  
```php
$table->integer('user_id')->unsigned()->nullable()->index();
$table->string('title');
$table->text('content');
```
> `user_id` must be `unsigned` as the key `id` of `post` is `unsigned`  
Run `php artisan migrate`  

### Build relations between models
In `User.php`, add a funciton, this function can be used as an object or a function    
```php
public function posts(){
    return $this->hasMany('App\Models\Post');// By default, it will search for 'user_id' and insert in the posts
}
```
Tell laravel it's OK for `Post.php` to have property as assigned     
```php
protected $fillable = [
    'title',
    'content',
];
```

### Using tinker to quickly create a user, then create a post in route
`php artisan tinker`, data must be in an array:   
```php
App\Models\User::create(['name'=>'lili', 'email'=>'lili@gmail.com', 'password'=>bcrypt('123')]);
```
> Exit tinker by `exit;`     
Now in `web.php`, build a route to create a post  
```php
Route::get('user/{id}/create', function($id){
    $user = User::findOrFail($id);
    $post = new Post(['title'=>'New post 1', 'content'=>'New content 1']);
    $user->posts()->save($post); // posts() is a method
});
```

### Read data
```php
Route::get('user/{id}/read', function($id){
  $user = User::findOrFail($id);
  return $user->posts;  // posts is an object
  // To debug, dd($user), dd is die or dump
  // If the user has many posts
  // foreach ($user->posts as $post){
  //       echo $post->title.'<br>';
  //   }
});
```

### Update data
```php
Route::get('user/{userId}/update/{postId}', function($userId, $postId){
    $user = User::findOrFail($userId);
    $user->posts()->whereId($postId)->update(['title'=>'Updated title', 'content'=>'Updated content']);
    // Or
    // $user->posts()->where('id', '=', $postId)->update(['title'=>'Updated title 2', 'content'=>'Updated content 2']);
    // Or
    // $user->posts()->where('title', '=', $title)->update(['title'=>'Updated title 2', 'content'=>'Updated content 2']);

});
```

### Delete data
```php
Route::get('user/{userId}/delete/{postId}', function($userId, $postId){
    $user = User::find($userId);
    // $user->posts()->delete($postId); // Wrong!!! This will delete all the posts of the user
    $user->posts()->whereId($postId)->delete();
});
```
