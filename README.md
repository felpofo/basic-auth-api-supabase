# Basic Authentication API

this is an very basic api that handles _user_ and _admin_ access control
already with some tests

## Environment

the .env file needs to have 3 fields

- **SUPABASE_URL**
  - which looks like this: https://abcdefghijklmnopqrst.supabase.co
- **SUPABASE_PUBLIC_KEY**
  - which is the anom jwt from supabase
- **SUPABASE_JWT_SECRET**
  - which don't need explanation

## Running the project
to run the project you can open your terminal and run:
- `yarn start` to start directaly from typescript
- `yarn dev` to watch that typescript
- `yarn build && node .` (or `node build/server.js`)


## Routes

- [ GET ] /
  - only returns a live signal
- [ POST ] /signup
  - create an account
- [ POST ] /login
  - login to an account
- [ GET ] /user-content
  - see the user content if it's logged in
- [ GET ] /admin-content
  - see the admin content if have the permission
