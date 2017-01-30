# Changing Perspectives API

* node with babel
* expressjs
* mongoDB

Procfile set up to run on [heroku]

## API Resources

### POST /users/
Creates a new user.
#### Example
#### Request body:
**Required Fields**
```
{
  "username": "test@test.com",
  "role": 1   // the role will be 1 => admin, 2 => teacher, 3 => student
}
```
Note: the `role` field will be 1 for admin, 2 for teacher, and 3 for student.
**Optional Fields**
```
{
  "categories": "test@test.com",
  "activities": 1
}
```

#### Response data:
```
{
  "message": "User created!",
  "user": {
    "__v": 0,
    "role": 1,
    "username": "test100",
    "_id": "588fb92fbcfa0136c6cd821a",
    "id": "588fb92fbcfa0136c6cd821a"
  }
}
```

#### GET /users/
Returns a list of users as users, including subcategories nested.

#### GET /users/:id
Gets a user by ID.

#### DELETE /users/:id/
Deletes a user if the delete is permitted. Returns a json error in the case of failure to delete.

#### PUT /users/:id/
Updates a body element of a user by ID.


#### POST /activities/
Creates a new activity.

#### GET /activities/
Returns a list of activities as activities, including subcategories nested.

#### GET /activities/:id/
Gets an activity by ID.

#### DELETE /activities/:id/
Deletes an activity if the delete is permitted. Returns a json error in the case of failure to delete.

#### PUT /users/:id/
Updates a body element of an activity by ID.
