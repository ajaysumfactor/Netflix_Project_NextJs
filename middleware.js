import { NextResponse } from "next/server";

export function middleware(req,ev){
    console.log({req,ev});
    //check the token
    //if token is valid
    //|| if page is /login
    return NextResponse.next();
    // return new Response("hello world");

    //if no token
    //redirect to login
}