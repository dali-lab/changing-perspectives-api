# Changing Perspectives API

TODO: add project description

## Setup

To set up the dev environment, just run `npm install`.

## Deployment

To run the development server, run `npm run dev`.
To run the production server, run `npm run prod`.

## Architecture

* node with babel
* expressjs
* mongoDB

Procfile set up to run on [heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app)

# Request & Response Examples
DDDDD
### POST /users/
Creates a new user.
#### Request body:
**Required Fields**
```
{
  "username": "test@test.com",
  "role": 1   // the role will be 1 => admin, 2 => teacher, 3 => student
}
```
Note: the `role` field will be 1 for admin, 2 for teacher, and 3 for student.

#### Optional Fields
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
#### Response data:
```
{
  "message": "All users returned!",
  "users": [
    {
      "_id": "588fb92fbcfa0136c6cd821a",
      "role": 2,
      "username": "test100",
      "__v": 0,
      "students": [],
      "categories": [],
      "gradeLevels": [],
      "activities": [],
      "id": "588fb92fbcfa0136c6cd821a"
    },
    {
      "_id": "588fbb85bcfa0136c6cd821b",
      "role": 1,
      "username": "test10",
      "__v": 0,
      "students": [],
      "categories": [],
      "gradeLevels": [],
      "activities": [],
      "id": "588fbb85bcfa0136c6cd821b"
    }
  ]
}
```
#### GET /users/:id
Gets a user by ID.
#### Response data:
```
{
  "message": "Single User found!",
  "user": {
    "_id": "588fbb85bcfa0136c6cd821b",
    "role": 1,
    "username": "test10",
    "__v": 0,
    "students": [],
    "categories": [],
    "gradeLevels": [],
    "activities": [],
    "id": "588fbb85bcfa0136c6cd821b"
  }
}
```
#### DELETE /users/:id/
Deletes a user if the delete is permitted. Returns a json error in the case of failure to delete.
#### Response data:
```
{
  "message": "User Removed!",
  "result": {
    "n": 1,
    "ok": 1
  }
}
```
#### PUT /users/:id/
Updates a body element of a user by ID.
#### Response data:
```
{
  "message": "User Updated!",
  "user": {
    "n": 0,
    "nModified": 0,
    "ok": 1
  }
}
```

#### POST /activities/
Creates a new activity.
#### Request body:
**Required Fields**
```
{
  "gradeLevels":{
    "type": "1"},
  "category":{
    "type": 1}
}
```
Note: the `type` field for gradeLevels will be 1 for K-2, 2 for 3-5, 3 for 6-8.
Note: the `type` field for category will be  1 for autism, 2 for hearing, 3 for visual, 4 for learning, 5 for physical, 6 for social, 7 for speech, 8 for cognitive.

#### Optional Fields
```
{
  "name": "StringPlayer",
  "url": "www.example.com/game",  
  "instructions": "This is how to play a game.",
  "body": "XYZ",
  "shortName": "game",  // the text that will be used for the URL of the activity
}
```

#### Response data:
```
{
  "message": "Activity created!",
  "activity": {
    "gradeLevels:{
      "type": "1",
    }
    "category":{
      "type": "1",
    }
    "name": "Cool Game",
    "_id": "588fb92fbcfa0136c6cd821b",
    "id": "588fb92fbcfa0136c6cd821b"
  }
}
```

#### GET /activities/
Returns a list of activities as activities, including subcategories nested.
#### Response data:
```
{
  "message": "All activities returned!",
  "activities": [
    {
      "_id": "588fb92fbcfa0136c6cd821a",
      "gradeLevels:{
        "type": "1",
      }
      "category":{
        "type": "1",
      }
      "name": "Cool Game",
      "url": "www.example.com/game",  
      "instructions": "This is how to play a game.",
      "body": "XYZ",
      "shortName": "game",
      "id": "588fb92fbcfa0136c6cd821a"
    }
    ]
}
```

#### GET /activities/:id/
Gets an activity by ID.
#### Response data:
```
{
  "message": "Single activity found!",
  "activity": {
    "_id": "588fb92fbcfa0136c6cd821a",
    "gradeLevels:{
      "type": "1",
    }
    "category":{
      "type": "1",
    }
    "name": "Cool Game",
    "url": "www.example.com/game",  
    "instructions": "This is how to play a game.",
    "body": "XYZ",
    "shortName": "game",
    "id": "588fb92fbcfa0136c6cd821a"
  }
}
```
#### DELETE /activities/:id/
Deletes an activity if the delete is permitted. Returns a json error in the case of failure to delete.
#### Response data:
```
{
  "message": "Activity Removed!",
  "result": {
    "n": 1,
    "ok": 1
  }
}
```

#### PUT /users/:id/
Updates a body element of an activity by ID.
#### Response data:
```
{
  "message": "Activity Updated!",
  "activity": {
    "n": 0,
    "nModified": 0,
    "ok": 1
  }
}
```

#### POST /categories/
Creates a new category
### Request body:
**Required Fields**
```
{
  "categoryName": "test@test.com",
  "gradeLevels":   [1,2]
}
```
Note: gradeLevels is a list of numbers for each grade

#### Response data:
```
{
  "message": "Category created!",
  "category": {
    "gradeLevels": [1,3],
    "name": "disability1",
    "_id": "588fb92fbcfa0136c6cd821a",
  }
}
```
#### GET /categories/
Returns a list of categories
#### Response data:
```
{
  "message": "All categories returned!",
  "categories": [
    {
      "_id": "588fb92fbcfa0136c6cd821a",
      "gradeLevels": [2,3,4,5],
      "name": "disability4"
    },
    {
      "_id": "588fb92fbcfa0136c6cd821a",
      "gradeLevels": [0,1],
      "name": "disability8"
    }
  ]
}
```
#### GET /category/:id
Gets a category by its ID.
#### Response data:
```
{
  "message": "Single Category found!",
  "category": {
    "_id": "588fbb85bcfa0136c6cd821b",
    "gradeLevels": [1,2,3],
    "name": disability4
  }
}
```
