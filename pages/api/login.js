export default async function login(req, res) {
    if (req.method === "POST") {
        try {
            const auth = req.headers.authorization;
            const token = auth ? auth.substr(7): '';
            console.log({token});
            //invoke magic here
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