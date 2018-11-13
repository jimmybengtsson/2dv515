## 2dv515 - Assignment 1 - Server

This is an Node.js/Express implementation for the recommendation system.

### API-requests

```
GET /users
```
Get all users from the dataset.

```
GET /items
```
Get all movies from the dataset.

```
GET /ratings
```
Get all ratings from the dataset.

```
POST /users/euclidean
```
Get a users matching users and recommended movies by user-based Euclidean distance.

**Required:** A users **UserID** in a JSON-object.

**Example:** `{ "UserID": "1", }`

```
POST /users/pearson
```
Get a users matching users and recommended movies by user-based Pearson correlation.

**Required:** A users **UserID** in a JSON-object.

**Example:** `{ "UserID": "1", }`


```
POST /items/euclidean
```
Get a movies matching movies and recommended users by item-based Euclidean distance.

**Required:** A movies name in a JSON-object.

**Example:** `{ "Movie": "Superman Returns", }`

```
POST /items/pearson
```
Get a movies matching movies and recommended users by item-based Pearson correlation.

**Required:** A movies name in a JSON-object.

**Example:** `{ "Movie": "Superman Returns", }`

```
POST /users/ib-euclidean
```
Get a users recommended movies by item-based Euclidean distance.

**Required:** A users **UserID** in a JSON-object.

**Example:** `{ "UserID": "1", }`

```
POST /users/ib-pearson
```
Get a users recommended movies by item-based Pearson correlation.

**Required:** A users **UserID** in a JSON-object.

**Example:** `{ "UserID": "1", }`