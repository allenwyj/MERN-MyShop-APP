# MyShop eCommerce Platform

> eCommerce platform built with the MERN stack & Redux.

This is the course project for learning MERN

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product, admin user list and admin order list pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

## Usage

### ES Modules in Node

ES Modules are used in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

You can also install and setup Babel if you would like

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = 'YOUR_MONGODB_URI'
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = 'YOUR_PAYPAL_CLIENT_ID'
```

### Install Dependencies (frontend & backend)

```
yarn
cd frontend
yarn
```

### Run

```
# Run frontend (:3000) & backend (:5000)
yarn dev

# Run backend only
yarn server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
yarn build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
yarn data:import

# Destroy data
yarn data:destroy
```

```
Sample User Logins

admin@example.com (Admin)
123456

sample@example.com (Customer)
123456

allen@example.com (Customer)
123456
```
