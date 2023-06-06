import { verifyToken } from "@/lib/utils";

export const redirectUser = async(context)=>{
    const token = context.req ? context.req.cookies.token : null;
    console.log({token});
     const userId= await verifyToken(token);
     console.log({userId});
     return {
        userId,token
     };
};