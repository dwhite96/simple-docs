# README

SimpleDocs is a Dropbox/Google Drive clone used to demo React components using Ruby on Rails as a backend.
This app is not intended to be used commercially. It features a React tree structure UI for folders and
files similar to macOS Finder. Code for this "tree view" is based on <a href="https://github.com/reduxjs/redux/tree/master/examples/tree-view" target="_blank">this</a> Redux example. Feel free to clone this repository to your local machine to run and play around with.

- Ruby version: 2.4.1

- Rails version: 5.1.5

- React on Rails version: 11.0.8

### System dependencies

- React and Redux for the primary frontend views
- Webpacker gem for frontend module bundler
- Node
- Yarn for package manager
- React on Rails for convenient helper methods and functions to tie Rails and React
- Postgresql for the database
- Carrierwave for file uploading

### Setup and Configuration

1. Clone the app: `git clone https://github.com/dwhite96/simple-docs.git` and `cd simple-docs/`
2. Install dependencies: `bundle install && yarn install`
3. Create and initialize the database: `rails db:create db:migrate db:seed`
    - This will seed the database with some folders so you can immediately demo the app.

### Starting the Rails and Node servers in development environment

1. Ensure foreman is installed: `gem install foreman`
2. Run `foreman start -f Procfile.dev-server`
3. Visit <a href="localhost:3000" target="_blank">localhost:3000</a>

### How to run the test suite

1. Run `rails rspec`
