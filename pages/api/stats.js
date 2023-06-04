import jwt from 'jsonwebtoken';
import { findVideoIdByUser, insertStats, updateStats } from '@/lib/db/hasura';
export default async function stats(req, res) {
    if (req.method === 'POST') {
        try {
            const token = req.cookies.token;

            if (!token) {
                res.status(403).send({});
            }
            else {
                const { videoId } = req.body;
                if (videoId) {
                    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                    const userId = decodedToken.issuer;

                    const findVideo = await findVideoIdByUser(token, userId, videoId);
                    const doesStatsExist = findVideo?.length > 0;
                    const { favourited, watched = true } = req.body;
                    console.log({ doesStatsExist })
                    if (doesStatsExist) {
                        //update it
                        const response = await updateStats(token, {
                            watched,
                            userId,
                            videoId,
                            favourited,
                        });
                        res.send({ data: response });

                    }
                    else {
                        //add it 
                        const response = await insertStats(token, {
                            watched,
                            userId,
                            videoId,
                            favourited
                        });
                        res.send({ data: response });
                    }
                }
                else {
                    res.status(500).send({ msg: "videoId is required" });
                }

            }
        }
        catch (error) {
            console.error("Error occured /stats", error);
            res.status(500).send({ done: false, error: error?.message });
        }
    }
    else {

        const token = req.cookies.token;
        console.log({token});
        console.log({req})

        if (!token) {
            res.status(403).send({});
        }
        else {
            console.log(req.query)
            const { videoId } = req.query;
            console.log({videoId});
            if (videoId) {
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                const userId = decodedToken.issuer;

                const findVideo = await findVideoIdByUser(token, userId, videoId);
                const doesStatsExist = findVideo?.length > 0;
                const { favourited, watched = true } = req.body;
                if (doesStatsExist) {
                    res.send(findVideo);

                }
                else {
                    res.status(404);
                    res.send({ user: null, msg: "video not found" });

                }
            }


        }
    }
}