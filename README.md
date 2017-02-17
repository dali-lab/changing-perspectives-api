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
## POST /api/users
Creates a new user.
### Request body:
**Required Fields**
```
{
  "username": "test100",
  "role": 1
}
```
Note: the `role` field will be 1 for admin, 2 for teacher, and 3 for student.
### Optional Fields
```
{
  "categories": "test@test.com",
  "activities": [
    {
      id: ACTIVITY_ID,
      started_activity: "1/1/17 1:00pm",
      finished_activity: "1/1/17 2:00pm"
    },
  ]
}
```
### Response data:
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

## GET /api/users
Returns a list of users as users, including subcategories nested.
### Response data:
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

## GET /api/users/:id
Gets a user by ID.
### Response data:
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

## DELETE /api/users/:id
Deletes a user if the delete is permitted. Returns a json error in the case of failure to delete.
### Response data:
```
{
  "message": "User Removed!",
  "result": {
    "n": 1,
    "ok": 1
  }
}
```

## PUT /api/users/:id
Updates a body element of a user by ID.
### Response data:
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

## POST /api/classrooms
Creates a new classroom.
### Request body:
```
{
	"name": "My Class",
	"teacher": "588bb7e9a3518802df860925",
	"expirationDate": "06/11/2017",
	"imageUrl": "www.fakeimage.com"
}
```
### Response data:
```
{
  "message": "Classroom created!",
  "classroom": {
    "__v": 0,
    "teacher": "588bb7e9a3518802df860925",
    "expirationDate": "2017-06-11T04:00:00.000Z",
    "imageUrl": "www.fakeimage.com",
    "name": "My Class",
    "_id": "589e40dc9802792a260eb6bb",
    "students": [],
    "id": "589e40dc9802792a260eb6bb"
  }
}
```

## GET /api/classrooms
Returns a list of classrooms as classrooms, including subcategories nested.
### Response data:
```
{
  "message": "All classrooms returned!",
  "classrooms": [
    {
      "_id": "589e40dc9802792a260eb6bb",
      "teacher": "588bb7e9a3518802df860925",
      "expirationDate": "2017-06-11T04:00:00.000Z",
      "imageUrl": "www.fakeimage.com",
      "name": "My Class",
      "__v": 0,
      "students": [],
      "id": "589e40dc9802792a260eb6bb"
    }
  ]
}
```

## GET /api/classrooms/:id
Gets a classroom by ID.
### Response data:
```
{
  "message": "Single Classroom found!",
  "classroom": {
    "_id": "589e40dc9802792a260eb6bb",
    "teacher": "588bb7e9a3518802df860925",
    "expirationDate": "2017-06-11T04:00:00.000Z",
    "imageUrl": "www.fakeimage.com",
    "name": "My Class",
    "__v": 0,
    "students": [],
    "id": "589e40dc9802792a260eb6bb"
  }
}
```

## DELETE /api/classrooms/:id
Deletes a classroom if the delete is permitted.
Returns a json error in the case of failure to delete.
### Response data:
```
{
  "message": "Classroom Removed!",
  "classroom": {
    "n": 1,
    "ok": 1
  }
}
```

## PUT /api/classrooms/:id
Updates a body element of a classroom by ID.
### Request body:
```
{
	"name": "Your Class"
}
```
### Response data:
```
{
  "message": "Classroom Updated!",
  "classroom": {
    "n": 1,
    "nModified": 1,
    "ok": 1
  }
}
```

## POST /api/activities
Creates a new activity.
### Request body:
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
### Optional Fields
```
{
  "name": "StringPlayer",
  "url": "www.example.com/game",  
  "instructions": "This is how to play a game.",
  "body": "XYZ",
  "shortName": "game",  // the text that will be used for the URL of the activity
}
```
### Response data:
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

## GET /api/activities
Returns a list of activities as activities, including subcategories nested.
### Response data:
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

## GET /api/activities/:id
Gets an activity by ID.
### Response data:
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

## DELETE /api/activities/:id
Deletes an activity if the delete is permitted. Returns a json error in the case of failure to delete.
### Response data:
```
{
  "message": "Activity Removed!",
  "result": {
    "n": 1,
    "ok": 1
  }
}
```

## PUT /api/activities/:id
Updates a body element of an activity by ID.
### Response data:
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
  "name": "Physical Disabilities",
  "gradeLevel": 1
}
```
Note: gradeLevel is 1, 2, or 3 => 1 is "easy", 2 is "medium", 3 is "hard"

#### Response data:
```
{
  "message": "category created!",
  "category": {
    "__v": 0,
    "name": "Physical Disabilities",
    "_id": "589e3824d0c7b910a527e540"
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
      "_id": "589e37e2d0c7b910a527e53f",
      "name": "category1",
      "__v": 0,
      "gradeLevel": 3
    },
    {
      "_id": "589e3824d0c7b910a527e540",
      "name": "lmaoPlzWorkLesGOOOO",
      "__v": 0,
      "gradeLevel": 2
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
    "_id": "589e6fdb8a2e2612113a9589",
    "name": "doug",
    "__v": 0,
    "gradeLevel": 1
  }
}
```

#### DELETE /categories/:id/
Deletes a category if the delete is permitted. Returns a json error in the case of failure to delete.
#### Response data:
```
{
  "message": "Category Removed!",
  "category": {
    "n": 1,
    "ok": 1
  }
}
```

#### PUT /categories/:id/
Updates a body element of a category by ID.
#### Response data:
```
{
  "message": "Category Updated!",
  "category": {
    "n": 1,
    "nModified": 0,
    "ok": 1
  }
}
```
