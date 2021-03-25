# Todo List

Todo List is a simple RESTful web application built with Node.js, Express, and MySQL for users to manage tasks.

## Features

- Sign up for an account by providing name, email, and password
- Log in with email or Facebook account
- Log out of an account

After login, a user can:

- View all tasks
- View a task
- Add a task
- Edit a task
- Delete a task

![Home page](/public/photos/index.png)
![Login page](/public/photos/login.png)
![Register page](/public/photos/register.png)

## Prerequisites

- [Git](https://git-scm.com/downloads)
- [Node.js v14.15.1](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MySQL](https://dev.mysql.com/)
- [Sequelize](https://sequelize.org/master/index.html)

## Install Todo List

#### Clone the repository locally

```
$ git clone https://github.com/ivyhungtw/todo-list-sequelize.git
```

#### Install project dependencies

```
$ cd todo-list-sequelize
$ npm install
```

#### Add .env file

To properly use the app and Facebook login feature, make sure you have filled out the following information in .env file.

You can get your own Facebook id and secret on [Facebook Developers](https://developers.facebook.com/).

```
FACEBOOK_ID=<Your Facebook app ID>
FACEBOOK_SECRET=<Your Facebook app secret>
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
SESSION_SECRET=ThisIsMySecret
PORT=3000
```

## Use Todo List

#### Import seed data

To have default user and tasks set up, run the following script.

```
$ npm run seed
```

#### Start the app

If you have installed [nodemon](https://www.npmjs.com/package/nodemon), run the following script.

```
$ npm run dev
```

Or just run:

```
$ npm run start
```

The server will start running on http://localhost:3000/
