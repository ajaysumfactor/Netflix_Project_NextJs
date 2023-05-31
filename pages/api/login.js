import { mAdmin } from "@/lib/magic";
export default async function login(req, res) {
    if (req.method === "POST") {
        try {
            const auth = req.headers.authorization; //Barrer Token
            const didToken = auth ? auth.substr(7): ''; //Extract Token here in this it is didToken
            console.log({didToken});
            //invoke magic here
            const metadata = await mAdmin.users.getMetadataByToken(didToken);
            console.log({metadata});//get all the metadata(issuer,publicAddress,email);
            res.send({ done: true });
        }
        catch (error) {
            console.error("something went wrong logging in", error);
            res.status(500).send({ done: false });

        }
    }
    else {
        res.send({ done: false });
    }
}