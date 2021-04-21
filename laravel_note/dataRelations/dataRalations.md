### How to insert data into database
```php
Route::get('/insert', function(){
	DB::insert('INSERT INTO posts(title, content) VALUES (?, ?)', ['title', 'content']);
})
```
> —>make sure you have `posts` as table in database first

### How to fetch data from database:
```php
Route::get('/read', function(){
	$results = DB::select('SELECT * FROM posts WHERE id=?', [1]);
// $results is an object
  foreach ($results as $result){
    return $result->title;
    // return var_dump($results);
  }
})
```

### How to update data in database:
```php
Route::get('/update', function(){
  $updated = DB::update('UPDATE posts SET title=? WHERE id=?', ['updated title', 1]);

  return $updated; // 1
})
```

### How to delete from database:
```php
Route::get('/delete', function(){
  $deleted = DB::delete('DELETE FROM posts WHERE id=?', [1]);
  return $deleted; // 1
  <!-- if($deleted == 1) {
    return 'Ok, it's deleted';
  } -->
})
```

### Why need protected $table='posts'
```php
class PostAdmin extends Model{
  protected $table = 'posts'; // Because the class name is not the same as $table name in database, the default table name should be 'postadmins'
}
```

### if we have a Model, we can read data easier by Eloquent:
```php
Route::get('/read', function(){
  $posts = Post::all();
  foreach($posts as $post) {
    return $post->title;
  }
})
```
##  Eloquent ORM: object-relational mapper
## We can use Eloquent anywhere as long as we import the App\Models\Model
```php
Route::get('/find', function($id){
  $post = Post::find($id);
  return $post->title;
})
```
### Retrieve data with condition
```php
Route::get('/findwhere', function(){
  $post = Post::where('id', 2)->orderBy('id', 'desc')->take(1)->get();
  return $post;
})
```

### findOrFail to show the error or to redirect user to 404 page
```php
Route::get('/findmore', function(){
  $posts = Post::findOrFail(2);
  return $posts;
  // $posts = Post::where('user_account', '<', 50)->firstOrFail();
})
```

### Inserting data using Eloquent
```php
Route::get('/insertpost', function(){
  $post = new Post;
  $post->title = 'A title';
  $post->content = 'A content';
  $post->save(); // 'save()' function will insert and update in database
})
```

### To update data
```php
Route::get('/updatepost', function(){
  $post = Post::find($id);
  $post->title = 'New title';
  $post->content = 'New content';
  $post->save(); // 'save()' function will insert and update in database
})
```
### Mass assignment: create multiple data and insert into database, it has to be an array
```php
// Add in Model:
  protected $fillable = [
  'title',
  'content'
]
Route::get('/create', function(){
  Post::create(['title' => 'create title', 'content' => 'create content']);
})
```

### Eloquent update
```php
Route::get('/update', function(){
  Post::where('id', 2)->where('is_admin', 0)->update(['title' => 'New title', 'content' => 'New content']);
})
```
### Eloquent delete
```php
Route::get('/delete/{id}', function(){
  $post = Post::find($id);
  $post->delete();
})
```
### Delete by key
```php
Route::get('/delete2', function(){
  Post::destroy([$id1, $id2]);
})
```

### softDelete: not deleted until I force it
import database in Model.php: `use Illuminate\Database\Eloquent\SoftDeletes`
`use SoftDeletes;`
let laravel treat it as a timestamp column: `protected $dates = ['deleted_at'];`
`php artisan make:migration add_deleted_at_to_posts_table --table=posts`
go to the new table in laravel and add in up():
`$table->softDeletes();`
in down(): `$table->dropColumn('deleted_at');`
then, `php artisan migrate`
In case you want to delete a column, don't delete the new table in laravel directly, because it infects the database, just do `php artisan migrate:reset` first, then delete the new table, then do `php artisan migrate`

```php
Route::get('/softdelete', function(){
  Post::find($id)->delete(); // Now the 'deleted_at' is shown in database, it's a deleted record.
})
```

### Retrieve the softDeleted data
```php
Route::get('/readsoftdeleteddata', function(){
  $post = Post::withTrashed()->where('id', $id)->get();
  return $post;
})
```
#### Retrieve only trashed data
```php
Route::get('/readsoftdeleteddata', function(){
  $post = Post::onlyTrashed()->where('is_admin', 0)->get();
  return $post;
})
```

### Re-store trashed data
```php
Route::get('/restore', function(){
  Post::withTrashed()->where('is_admin', 0)->restore();
})
```

### Delete a record permanently
```php
Route::get('/forcedelete', function(){
  Post::onlyTrashed()->where('id', $id)->forceDelete();
})
```

### One to one relation, eg. in User.php
```php
public function post(){
    return $this->hasOne('App\Models\Post'); // it will search user_id by default, if you named it as another_name, put it in the param ('App\Models\Post', 'another_name')
}
```

### Eloquent relationships
Add `use App\Models\User` in `routes.php` or `web.php`
```php
Route::get('users/{id}/post', function($id){
  return User::find($id)->post; // Or return User::find($id)->post->title;
})
```

### The reverse relation
Add `public function user()` in `Post.php`
```php
public function user() {
  return $this->belongsTo('App\Models\User');
}
```
Then in `web.php`
```php
use App\Models\Post;

Route::get('/posts/{id}/user', function($id){
  return Post::find($id)->user->name; //user() function is been used as a property in laravel
})
```

### One to many relationship
Add in `User.php`
```php
public function posts(){
    return $this->hasMany('App\Models\Post');
}
```
Then `web.php`
```php
Route::get('/posts/user/{id}', function($id){
    $user = User::find($id);
    foreach($user->posts as $post) {
        echo $post->title.'<br>'; // Can't return multiple data, so use `echo`
    }
});
```
#### If `php artisan migrate:refresh/rollback/reset` doesn't work, delete all the tables in database first, then try again.

### Many to many relations
Run ` php artisan make:model Role -m`
Laravel has a convention to make pivot 枢纽 table names in order of alphabet, and lower case, in singular, so no `user_role`, but `role_user`, run `php artisan make:migration create_users_roles_table --create=role_user`
Then go to fill all the neccessary columns in the new tables `name`,`user_id`, `role_id`
Then run `php artisan migrate`
Add in database table `roles`: `admin` and `subscriber`
Insert in database some data in `role_user`
In `User.php`
```php
public function roles(){
    return $this->belongsToMany('App\Models\Role');
}
```
Then in `web.php`
```php
Route::get('users/{id}/roles', function($id){
    $user = User::find($id)->roles()->orderBy('id', 'desc')->get();
    return $user;
    // foreach ($user->roles as $role) {
    //     return $role->name;
    // }
});
```

### Create a custom column name in `User.php`
```php
public function roles() {
  return $this->belongsToMany('App\Models\Role', 'user_roles', 'user_id', 'role_id');
} // 'user_roles' is a custom column we create if we didn't use the conventional column name, 'user_id', 'role_id' are foreign keys.
```


### Accessing the pivot table/intermediate table
In `User.php`, add 
```php
public function roles(){
    return $this->belongsToMany('App\Models\Role')->withPivot('created_at');
}
```
In `web.php`
```php
Route::get('users/pivot/{id}', function($id){
    $user = User::find($id);
    foreach($user->roles as $role) {
        echo $role->pivot->created_at; // pivot: {"user_id":1,"role_id":1} // 2021-04-20 00:38:10
    }
});
```

### Many through relation 跨越式
`php artisan make:model Country -m`, add `-m` will give us the model and the table
`php artisan make:migration add_country_id_to_users --table=users`
Add `country_id` to `users` table
Add `$table->string('name');` to Model `Country.php`
`php artisan migrate`
Add some countries name in database
Give each existing users a `country_id` in database
In `Country.php`, add
```php
public function posts(){
    return $this->hasManyThrough('App\Models\Post', 'App\Models\User');
    // By default, it will search as('App\Models\Post', 'App\Models\User', 'user_id','country_id'), if you have other column names instead of these, precise them here
}
```
In `web.php`
```php
use App\Models\Country;

Route::get('user/country/{id}', function($id){
    $country = Country::find($id);
    // From user_id, and country_id, that you got from two models in `hasManyThrough` relation, you got all the posts of this user 
    foreach($country->posts as $post){
        echo $post->title;
    }
});
```

### Polymorphic relations 多元
`php artisan make:model Photo -m`
Add some infos in the table, 
```php
$table->string('path'); // photo's name
$table->integer('imageable_id'); // which id in the corresponding table, or 'ref_id'
$table->string('imageable_type'); // which namespace, or 'ref_type'
```
Run `php artisan migrate`
Comment out `$table->integer('user_id')->unsigned();` in `create_posts` table;
Run `php artisan migrate:refresh`, so no more `user_id` in `posts` table
Add some data in database, in tables: `users`, `roles`, `role_user`, `countries`, `posts`, `photos`
In both `User.php` and `Post.php`, add
```php
public function photos(){
    return $this->morphMany('App\Models\Photo', 'imageable'); // 'imageable' means from either `posts` or `users` table
}
```
#### Get the photo from the owner: post or user
```php
Route::get('user/{id}/photo', function($id){
    $user = User::find($id);
    foreach($user->photos as $photo) {
        echo $photo->path; // lili.png
    }
});
```
```php
Route::get('post/{id}/photo', function($id){
    $post = Post::find($id);
    foreach($post->photos as $photo) {
        echo $photo->path; // laravel.png
    }
});
```

### Find the owner from photo, polymorphic relation in the reverse
Add `use App\Models\Photo;` in `web.php`
You get all the info of the post from the photo's id
```php
Route::get('photo/{id}/post', function($id){
    $photo = Photo::findOrFail($id);
    return $photo->imageable;
        
});
```
Or all the info of the user from the photo's id
```php
Route::get('photo/{id}/user', function($id){
    $photo = Photo::findOrFail($id);
    return $photo->imageable;
});
```

### Polymorphic relation many to many
`php artisan make:model Video -m`
`php artisan make:model Tag -m`
`php artisan make:model Taggable -m`
Add infos to these tables like `name`, `taggable_id`, `taggable_type`
Add a function in `Tag.php`
```php
public function posts(){
    // This model can be shared by, in table 'taggables'
    return $this->morphedByMany('App\Models\Post', 'taggable');
}
```
```php
public function videos(){
    // This model can be used by, in table 'taggables'
    return $this->morphedByMany('App\Models\Video', 'taggable');
}
```
In both `Post.php` and `Video.php`, add this function
```php
public function tags(){
    // This model use a lot of tags
    return $this->morphToMany('App\Models\Tag', 'taggable');
}
```
In `web.php`
```php
Route::get('/post/{id}/tag', function($id){
    $post = Post::find($id);
    foreach($post->tags as $tag){
        return $tag->name;
    }
});
```
```php
Route::get('/video/{id}/tag', function($id){
    $video = Video::find($id);
    foreach($video->tags as $tag){
        return $tag->name;
    }
});
```
> -> So now post and video are both related to tag

### Retrieve the owner (post or video) from tag
In `web.php` add `use App\Models\Tag;`
```php
Route::get('tag/{id}/post', function($id){
    $tag = Tag::find($id);
    foreach($tag->posts as $post){
        echo $post->title;
    }
});
```
Or 
```php
Route::get('tag/{id}/video', function($id){
    $tag = Tag::find($id);
    foreach($tag->videos as $video){
        echo $video->name;
    }
});
```
