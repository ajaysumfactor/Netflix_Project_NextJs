# Section_14

### Netflix component Architecture
### Made following component for the front page----- 
#### Banner component
    1. title
    2. Subtitle
    3. Play Button(icon+play)
    4. Backgrount image
#### NavBar component
    1. Netflix logo
    2. Home 
    3. Mylist
    4. user_name shows after login,+ dropdown--> on click  show signout -on click sign out render to login .
#### Card Component
    1.images
#### Section-card component
    1. takes title ,videos ,size as a props and render cards according to card content .
    2. Invoked from index.js

### Worked on Youtube API
### Implement Youtube search API 

### Data-fetching--Server side rendering

### Implement three section 
#### Home section
    1. Disney
    2. Productivity
    3. Travel
    4. Popular Videos

# =====================================================================================================================
# Section_15

## Authentication with Magic link(Getting more popular these days)
### Overview
    1. User Request
    2. Generating the Magic Link
    3. Sending the Magic Link
    4. Clicking the magic link
    5. Validating the magic link
    6. Authenticating the User

#### Challenges with stored passward:
    1. Passward is stored in database if database gets Hacked then Hackers is going to hacked all the passward Automatically.(Passwardless helps with this problem)
### Passwardless Authentication
    1. Passwardless Authentication Is a method of verifying a user's identity without the need for a passward.
    2. It aims to increase the security.
    3. Get rid from week passward,passward reuse,pishing attack.


### Step to work Ahead with Magic link
#### Set up Magic Account (Magic Auth)[https://dashboard.magic.link/signup]
#### Make a new app ,Go to start with Magic Auth
#### run the command (npm install --save magic-sdk)
#### Set up Magic Api key in (.env.local file)
#### go to (web section)[https://magic.link/docs/auth/overview]
#### Create SDK Instance (in new file (magic-client.js))
    
    import { Magic } from 'magic-sdk';

    const m = new Magic('API_KEY'); 

#### Implement magic in (login.js)
#### Implement routing delay with login
#### Implement to show username on navBar dynamically
#### Sign out user
#### Route App once user login
#### Fixed Routing Flicker with login
#### Implemet Loading component(loding...)[https://projects.lukehaas.me/css-loaders/]