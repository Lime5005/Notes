### Create data in tinker
Run `php artisan tinker`  
`$post = App\Models\Post::create(['title'=>'tinker title','content'=>'tinker content']);`  
Or create a post in this way:  
`$post = new App\Models\Post;`  
`$post`  
`$post->title = 'New title from object'`  
`$post->content = 'New content from object'`  
`$post->save();`, see return `true`  

### Retrieve data using Eloquent in tinker
Run `php artisan tinker`  
`$post = App\Models\Post::find($id);`  
`$post = App\models\Post::where('id', $id)->first();`  
`$post = App\models\Post::whereId($id)->first();`  


### Update data in tinker
Run `php artisan tinker`  
`$post = App\Models\Post::find($id);`  
`$post->title = 'Updated title in tinker';`  
`$post->content = 'Updated content in tinker';`  
`$post->save();`, see return `true`  

### Delete data in tinker
Run `php artisan tinker`  
`$post = App\Models\Post::find($id);`  
`$post->delete();`, it's a soft delete  
To delete permanently the deleted data,  
`$post = App\Models\Post::onlyTrashed();`  
`$post->forceDelete();`, see return `1`  

### Get relations in tinker
`$user = App\Models\User::find($id);`  
`$user->roles;`  
`$user->photos;`  
`$user->posts;` // Only if we have `user_id` in table `posts`  
#### Conclusion, tinker can make things done faster, no need route.
