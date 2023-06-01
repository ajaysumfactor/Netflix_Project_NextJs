import jwt from 'jsonwebtoken';
import { mAdmin } from "@/lib/magic";
import { isNewUser, createNewUser } from '@/lib/db/hasura';
import { setTokenCookie } from '@/lib/cookies';
export default async function login(req, res) {
    if (req.method === "POST") {
        try {
            const auth = req.headers.authorization; //Barrer Token
            const didToken = auth ? auth.substr(7) : ''; //Extract Token here in this it is didToken
            console.log({ didToken });
            //invoke magic here
            const metadata = await mAdmin.users.getMetadataByToken(didToken);
            console.log({ metadata });//get all the metadata(issuer,publicAddress,email);



            //create Jwt

            const token = jwt.sign(
                {
                    ...metadata,
                    iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
                    "https://hasura.io/jwt/claims": {
                        "x-hasura-default-role": "user",
                        "x-hasura-allowed-roles": ["user", "admin"],
                        "x-hasura-user-id": `${metadata.issuer}`,
                    },
                }, process.env.JWT_SECRET
            );
            // console.log({token});

            // implement if user exist?
            const isNewUserQuery = await isNewUser(token, metadata.issuer);
            isNewUserQuery && (await createNewUser(token, metadata));
            setTokenCookie(token, res);
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