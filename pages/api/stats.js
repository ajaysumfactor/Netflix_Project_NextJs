export default async function stats(req,res){
    if(req.method==='POST'){
        console.log({cookies: req.cookies});
        try{
        if(!req.cookies.token){
            res.status(403).send({});
        }
        else{
        res.send({msg:"it's working"});
        }
    }
    catch(error)
    {
        console.error("Error occured /stats",error);
        res.status(500).send({done: false,error:error?.message});
    }
    }
}