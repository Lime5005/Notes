### Eloquent polymorphic relations CRUD
- Create 3 models   
`php artisan make:model Staff -m`  
`php artisan make:model Product -m`  
`php artisan make:model Photo -m`  
- Add neccessary infos in the new tables, `name` for staffs and products, `path`, `imageable_id`, `imageable_type` for photos  
`php artisan migrate`  

### Build relations between them  
- In `Photo.php`  
```php
public function imageable(){
  return $this->morphTo();
}
```
- In `Staff.php`  
```php
public function photos(){
  return $this->morphMany('App\Models\Photo', 'imageable');
}
```
- In `Product.php`, add the same morphMany() function.  
- Mass assignment in `Photo.php`  
`protected $fillable = ['path'];`    
- In `Staff.php` and `Product.php`   
`protected $fillable = ['name'];`  

### Inserting data, photo for both staff and product
```php
Route::get('staff/{id}/insert_photo', function($id){
    $staff = Staff::findOrFail($id);
    $staff->photos()->create(['path'=>'example.jpg']);
});
```

### Read data
```php
Route::get('staff/{id}/read_photo', function($id){
  $staff = Staff::findOrFail($id);
  foreach($staff->photos as $photo){
    echo $photo->path.'<br>'; // Or return $photo;
  }
});
```

### Update data: photo
```php
Route::get('staff/{id}/update_photo', function($id){
  $staff = Staff::findOrFail($id);
  $photo = $staff->photos()->whereId(1)->first();
  // first() returns a collection, get() returns an object
  $photo->path = 'updated_example.jpg';
  $photo->save();
});
```

### Delete data
```php
Route::get('staff/{id}/delete_photo', function($id){
  $staff = Staff::findOrFail($id);
  $staff->photos()->wherePath('example_c.jpg')->delete();
  // $staff->photos()->delete(); // Delete all photos of the staff
});
```

### Assign data, like attach
Create a photo in database, `id=6`, then in `web.php`  
```php
Route::get('staff/{id}/assign_photo', function($id){
  $staff = Staff::findOrFail($id);
  $photo = Photo::findOrFail(6);
  $staff->photos()->save($photo);
});
```

### Un-assign data, like detach
```php
Route::get('staff/{id}/unassign_photo', function($id){
  $staff = Staff::findOrFail($id);
  $staff->photos()->whereId(6)->update(['imageable_id' => 0, 'imageable_type' => '']);
});
```

### Many to many with polymorph
- Build 4 models: Post, Video, Tag, Taggable  
- Add neccessary infos in new tables, `name`, for Post/Video/Tag, `tag_id`, `taggable_id`, `taggable_type` for Taggable  
- We are going to share Tag with Post and Video  
- In `Post.php` and `Video.php`, add  
```php
public function tags(){
    return $this->morphToMany('App\Models\Tag', 'taggable'); // 'taggable' is the table in database
}
```
- In `Tag.php`, add  
```php
public function posts(){
    return $this->morphedByMany('App\Models\Post', 'taggable');
}

public function videos(){
    return $this->morphedByMany('App\Models\Video', 'taggable');
}
```
- Now find a post id, test in route `web.php`, after import Models   
```php
Route::get('post/{id}/insert_tag', function($id){
    $post = Post::findOrFail($id);
    $tag = Tag::findOrFail(1);
    $post->tags()->save($tag);
});
Route::get('video/{id}/insert_tag', function($id){
    $video = Video::findOrFail($id);
    $tag = Tag::findOrFail(2);
    $video->tags()->save($tag);
});
```
- Or create data in route directly for test  
`$post = Post::create(['title'=>'title 1', 'content'=>'content1']);`  

### Reading data
```php
Route::get('post/{id}/read_tag', function($id){
  $post = Post::findOrFail($id);
  foreach($post->tags as $tag){
    echo $tag->name;
  }
});
Route::get('video/{id}/read_tag', function($id){
    $video = Video::findOrFail($id);
    foreach($video->tags as $tag){
      echo $tag->name;
    }
});
```
### Updating data
```php
Route::get('post/{id}/update_tag', function($id){
    $post = Post::findOrFail($id);
    foreach($post->tags as $tag){
      return $tag->whereName('Laravel')->update(['name'=>'PHP']); // Laravel tag is replaced by PHP in table `tags`!!!
    }
});
```
### Attach tags
```php
Route::get('post/{id}/attach_tag', function($id){
    $post = Post::findOrFail($id);
    $tag = Tag::findOrFail(3);
    $post->tags()->attach($tag);
})
```

### Sync tags
```php
Route::get('post/{id}/sync_tag', function($id){
    $post = Post::findOrFail($id);
    $post->tags()->sync([1, 4]); // All the tags of the post is replaced by tagId=[1, 4]
});
```

### Delete tag
```php
Route::get('post/{id}/delete_tag', function($id){
    $post = Post::findOrFail($id);
    foreach($post->tags as $tag){
      return $tag->whereId(1)->delete(); // 1
      // This will not change the `taggable` table, but `tags` table, and the post's tag is also deleted
    }
});
```

### Detach tag
```php
Route::get('post/{id}/detach_tag', function($id){
    $post = Post::findOrFail($id);
    $tag = Tag::findOrFail(3);
    $post->tags()->detach($tag);
});
```
