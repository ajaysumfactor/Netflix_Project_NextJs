import { NextResponse } from "next/server";
import { verifyToken } from "./lib/utils";

export async function middleware(req,ev){
    const token = req ? req.cookies.token : null;
      const userId= await verifyToken(token);
      const {pathname} = req.nextUrl;
      if(token && userId || pathname.includes("/api/login") ){
        console.log("here");

        return NextResponse.next();

      }
    //check the token
    //if token is valid
    //|| if page is /login
    // return new Response("hello world");

    if(!token && pathname !== pathname){
    return NextResponse.redirect("/login");
    }
    //if no token
    //redirect to login
}