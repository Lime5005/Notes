### Many to many Eloquent CRUD
Create a `Role` model    
`php artisan make:model Role -m`    
Create a pivot table   
`php artisan make:migration create_role_user_table -create=role_user`    
Relate the pivot table with other tables      
Fill in some info in the new tables, like `name` in `roles_table`, `user_id`, `role_id` in `role_user_table`     
Run `php artisan migrate`    

### Relate the two tables: users and roles
In `User.php`  
```php
public function roles(){
    return $this->belongsToMany('App\Models\Role');
}
```
Don't forget to write the fillable info in `Role.php`  
`protected $fillable = ['name'];`  

### Create a role and assign it to a user
In `web.php`  
```php
use App\Models\Role;
Route::get('user/{id}/create_role', function($id){
    $user = User::find($id);
    $user->roles()->save(new Role(['name'=>'administrator']));
});
```

### Read data
```php
Route::get('user/{id}/roles', function($id){
    $user = User::findOrFail($id);
    // dd($user->roles);// You can get a collection of data, eg. pivot->table->'role_user'
    foreach($user->roles as $role){
        echo $role->name.'<br>';
        // Or dd($role);
    }
});
```

### Update data
```php
Route::get('user/{id}/update_role', function($id){
    $user = User::findOrFail($id);
    if($user->has('roles')){
        foreach($user->roles as $role){
            if($role->name == 'administrator'){
                $role->name = 'admin';
                $role->save();
            }
        }
    }
});
```

### Delete roles and user's according roles
```php
Route::get('user/{id}/delete_role', function($id){
    $user = User::findOrFail($id);
        if($user->has('roles')){
        foreach($user->roles as $role){
            // $role->whereId(1)->delete();
            $role->whereName('author')->delete();
            // In pivot table, nothing changed
        }
    }
});
```

### Attaching, detaching and Syncing roles
- Detaching role, this role is still in `roles` table, but the user doesn't have this role anymore    
```php
Route::get('user/{id}/detach_role/{roleId}', function($id, $roleId){
    $user = User::findOrFail($id);
    $user->roles()->detach($roleId); // In pivot table, it's deleted
    // Detach all the roles
    $user->roles()->detach();
});
```
- Attaching role     
```php
Route::get('user/{id}/attach_role/{roleId}', function($id, $roleId){
    $user = User::findOrFail($id);
    $user->roles()->attach($roleId); // The attached roles can be duplicated, be carefull
});
```
- Syncing role, make sure all the roles you want are in the array, if not, it will be deleted, the existing roles will be replaced by new ones.    
```php
Route::get('user/{id}/sync_role', function($id){
    $user = User::findOrFail($id);
    $user->roles()->sync([5, 6]); // I had 3, 6, now it's 6, 5
});
```
