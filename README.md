# Hacker News Client

This is simply a rails app to play around with the Hacker News API

## The mechanics

This app is written in *ruby on rails* and *nodejs*. Nodejs is to communicate with the firebase API and the updates and relayed to rails to update its database. Views are then rendered in ruby on rails

## Setting Up (Development)

You have to configure several environment variables:

* **HN_CLIENT_AUTHENTICITY_TOKEN** A secure token to be validated during updates

## Running on dev server

run the rails server then only the nodejs server (inside the directory node-server)

## Production (working on it)

