import jwt from 'jsonwebtoken';
import { findVideoIdByUser } from '@/lib/db/hasura';
export default async function stats(req, res) {
    if (req.method === 'POST') {
        try {
            const token = req.cookies.token;

            if (!token) {
                res.status(403).send({});
            }
            else {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                console.log({ decoded });
                const userId = "did:ethr:0xFF9D7617bED57730B9DbedE6fA4327E9eB5c6B50";
                const videoId = "4zH5iYM4wJo";
                const findVideoId = await findVideoIdByUser(token,userId,videoId);
                res.send({ msg: "it's working", decoded,findVideoId });
            }
        }
        catch (error) {
            console.error("Error occured /stats", error);
            res.status(500).send({ done: false, error: error?.message });
        }
    }
}