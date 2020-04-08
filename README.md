# pink punk blog


## Description

Pink punk is a place where you can find your fellow punks,pinks, pink-punks and punk-pinks.

## Installation Guide
* git clone this repo
* `npm install` to set up node modules
* Initialise a local database
* Create .env file in project route
* Add PGDATABASE variable in your .env file and assign to initialised database

___

## How to run development server
To run dev server on your local machine you can type `npm run start:dev` that wil start nodemon server.

____

## Schema.sql

Our databse has two tables that are referencing each other on user id.


```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(225) NOT NULL
);

CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES users(id),
    post TEXT NOT NULL,
    post_date DATE NOT NULL DEFAULT CURRENT_DATE 
);
```

## Things we learned

* estimated time is always than actual time
* strong planning is the key
* SQL syntax is very deceptive and it is harder than it looks
* you can add date stamp in sql table
    * `post_date DATE NOT NULL DEFAULT CURRENT_DATE `
* pg.pool() can have a object that can be configured and can be connected with remote database. If it doesn't have connection string it defaults back to .env variables
```javascript=
const db = new pg.Pool({connectionString: process.env.DATABASE_URL})
```


## Things that we could not make in time

* testing database
* formating posting date in human format
