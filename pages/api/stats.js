import jwt from 'jsonwebtoken';
import { findVideoIdByUser,insertStats,updateStats} from '@/lib/db/hasura';
export default async function stats(req, res) {
    if (req.method === 'POST') {
        try {
            const token = req.cookies.token;

            if (!token) {
                res.status(403).send({});
            }
            else {
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                 const userId = decodedToken.issuer;
                const videoId = req.query.videoId;
                const doesStatsExist = await findVideoIdByUser(token,userId,videoId); 
                if(doesStatsExist)
                {
                    //update it
                    const response=await updateStats(token, {
                        watched: false,
                        userId,
                        videoId,
                        favourited:1,
                      });
                      res.send({ msg: "it works", response });
 
                }
                else{
                    //add it 
                  const response= await insertStats(token,{watched: true,
                    userId,
                    videoId,
                    favourited: 0,});
                    res.send({msg: "it works",response});
                }
             }
        }
        catch (error) {
            console.error("Error occured /stats", error);
            res.status(500).send({ done: false, error: error?.message });
        }
    }
}