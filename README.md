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


## ============================================================================================================
# Section_16:->>>>>>>>>>

# Project Architecture
    TO Make a brand new Model page such that We click on any card of Homepage of our project There must open full page containing:---
        1. Youtube video player 
        2. Discription
        3. Count view
        4. time
        5. cast
        6. summery 

#### Create Dynamic route VideoId page
#### Install react modal Component And use When we click on any card we go to detail of card with youtube player by id ,title,discription,viewcount.
#### Style modal component
#### Implement Youtube API Player
#### style YouTube Player
#### Data fetching technique :-Incremental static Regeneration(view count)
#### Implement content using Youtube Api by ID
#### Implement navBar on dynamic route ([videoId].js);

# ===================================================================================================================
# Section_17:----->>>>>>

## Overview
    Set up all necessary things for the "watch it again" section.

#### watch it again:----list of video just i saw.
#### My list:---->contained list of liked video 
    like----added
    dislike---removed from the mylist
    Not build recommendations things
### GraphQL
    1. query language that is going to query to database give specific json object.
    2. we can specify in query language to only return ,data that i only looking for.
    3.specific data from API.
     if(specific data)-->Does not matter ||low speed || high speed internet
    4. In graphQL it does not matter from where i do get data from.

### Mutation:--
    updating
    deleting
    creating new data

### Hasura
    1. It add layer on top of graphQL on the top of database.
    2. Easier way where i necessary not need to build graphQL server from scratch.
    3. All Hasura needs database.
    4. We do not need to go ahead and write any sort of sql query at all.
        database------>Hasura<-------->graphQl(user only write graphQL query and get response)
#### Hasura API Explorer
#### Signup on Hasura and gone through dashboard
#### Hasura create PostGres Database
#### set up database
    1. make table named--users,stats(connect them with foreign key)
    2. Assign User role
#### step:--To use a JWT and permissions to limit a query to only the user making the request.
##### (steps...)[https://hasura.io/docs/latest/auth/quickstart/]


### JWT (Json Web Token)
    1. Header-->encryption Algorithms
    2. Payload--->Unique id 
    3. Signature-->(secret key + unique_id+ Algo)
    4. JWT Token :- Header.Payload.Signature
#### Secret key 
    Only backend have secret key.
    Frontend dont have secret key.

### How JWT Works ?
    1. 1st time request ---signature
    2. response send(JWT)
    3. Again request(JWT).
    4. Now backend will verify user in such a way
        (Take--(header+payload) from front end) and mix their secret key---->make "new signature".
        if(frontend signature===new signature)
            valid user
        else
            Abort mission

# =====================================================================================================================
# Section_18 
GraphQL Used By--facebook,intuit,pinerest,Github,Coursera,Paypal,Starbugs

## Overview
1. Make A login API.
    1. Authorization_token.
    2. Create new JSON token(JWT)
    3. Now check If(new user in hasura)
                {
                    Create the user and save data in hasura(GQL Mutation)-->Store token as cookie
                }
                else
                {
                   Store token as cookie
                }


### Steps

#### Authorization
    1. Install the Magic Admin SDK to get started.(npm install --save @magic-sdk/admin)
    2. Create SDK Instance.
    3. Retriving user information 
        const metadata = await mAdmin.users.getMetadataByToken(DIDToken);
        metadata have -->issuer,email,publicAddress

#### Login API Create Auth Header.
#### Login API Magic server side SDK.
#### Login Api Magic server side SDK Testing.
#### Crete JWT Token
    1. Install jsonWebtoken (npm install jsonwebtoken).
    2. create token (token=jwt.sign(payload,secret/private key,{options}))
        payload--have "metadata"

#### Login API Created JSON WEB Token in console.
#### Check if a user exist in hasura 
#### if(new user)
    {
        Create new user store information in hasura(GraphQL Mutation)--store cookie
    }
    else
    {
       store cookie
    }
#### Login Api create new user(mutation) Hasura if new user.
 
#### cookie
    1. small piece of data server sends to a browser and browser stored Automatically in browser for specific website,and that data (token in our case).
    2. An HTTP cookie is used to tell if two requests come from the same browser—keeping a user logged in.
    
#### Setting cookie
    1. Install cookie (npm install cookie)
    2. const setCookie = cookie.serialize('name',value,{Optional});
        maxAge:--
        secure:--localhost--false,production--true
        Path:--Specifies the value for the Path



#### Login API Set token cookie 
#### Invoked login API in login


# ==================================================================================================================

# Section_19

## App Architecture
    In this section we focus on --
    1. My list page of a particular user
        1. My list page contain list of liked video(favourited) only.
        2. If any video present in myList as soon as i dislike that video particular video get removed from that list.
    2. Watch it Again section
        1. Watch it again --List of liked or dislike video (either video is liked or dislike it will be in watch it again)

#### Like and dislike button functionality added.
#### like and dislike button styling done
#### like and dislike button stats added (if like is clicked dislike is disappear vice-verca)
## Stats API creation
    1. Read token from cookies
    2. Verify JSON token(JWT)
    3. Find video by Id and by user
        if(present)
        {
            update stats for that user
        }
        else
        {
            create new stats for that user
        }

## Watch it again 
    1. Get videosId form the database where (userId and watched:"true)
    2. Render it on page 

### Serverside redirect
1. An optional redirecting value to allow redirecting to internal or external resources.
2. Redire to user to login page if user not logged in.
## My List Page 
    1. Make a query to database to get VideoId for the valid user where(favourited :1 )
    2. Render it on My list page .

## Logout Api 
    Make a logout API Such that when a user click on sign out (logout.js will invoked).
        1. When it invoked it delete the cookies.By which after refreshing the page ,user would not logged in.




# Section_20 ---------------------------------------------------------

## MiddleWare
    1. Enable you to use code over configration.
    2. This gives us fully flexibility in next.js ,because i can run code before request is completed.
    3. Based on user incomming request you can modify the response by rewriting,redirecting,and adding header.
    4. Every time request is come it check if token is valid/exist or not

## create middleware file in root folder as per new convention 
#### (docs..)[https://nextjs.org/docs/pages/building-your-application/routing/middleware]

## issue in deployment  (related source to resolve)
#### (install jose library to verify token used in "/lib/utils.js")[https://github.com/panva/jose/blob/HEAD/docs/functions/jwt_verify.jwtVerify.md] 

#### to get token from request in middleware.js use(.get("token"))
    token is in (token.value);

### While building next app there is some sort of restrictions:---
#### (restrictions)[https://nextjs.org/docs/pages/api-reference/edge#unsupported-apis]
    1. According to issue i use "jsonwebtoken" to verify the token --and jsonwebtoken uses (crypto module for node)
        for further operation and doing some file operation their which is voileted by (edge run time)
#### (crypto module)[https://www.w3schools.com/nodejs/ref_crypto.asp#:~:text=Definition%20and%20Usage,way%20of%20handling%20encrypted%20data.]

#### To resolve i use jose library to verify token .