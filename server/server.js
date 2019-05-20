const express = require('express')
const app = express()
const port = 3003;
const mongoose = require('mongoose');
// console.log("Mongo URLS",mongodb://<dbuser>:<dbpassword>@ds159216.mlab.com:59216/urldatabase);
mongoose.connect("mongodb://sahtushar30:yahoo123@ds159216.mlab.com:59216/urldatabase", {
    useNewUrlParser: true
})
    .then(() => console.log("mongoose connected to mongodb.."))
    .catch((err) => console.log(err));
require('./models/url_data');
const Url = mongoose.model('url_data');


app.get('/', (req, res) => res.send('Hello World!'));
app.use(
    require("body-parser").json({
        limit: "5mb"
    })
);
app.use(
    require("body-parser").urlencoded({
        extended: false
    })
);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        req.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});


let router = require("express").Router();
app.use("/", router);

router.post('/short_url', async (req, res) => {

    try {
        const url = req.body.url;
        console.log(url);
        let doc = await Url.findOne({url: url});
        let short_url = "";
        if (!doc) {
            try {
                let new_url = new Url({
                    url: url
                });
                await new_url.save();

                doc = await Url.findOne({url: url});
                //create shortURL
                short_url = doc.id.substring(10, doc._id.length);
                short_url = "http://zyla/" + short_url;
                console.log(short_url);

                await Url.findOneAndUpdate({
                        url: url
                    },
                    {
                        shortenedUrl: short_url
                    })
            } catch (e) {
                console.log(e);
            }

            let data = {
                url: url,
                shortenedUrl: short_url
            }

            await res.send(JSON.stringify(data, null, 4));

        } else {
            let data={
                url:doc.url,
                shortenedUrl:doc.shortenedUrl
            }
            await res.send(JSON.stringify(data, null, 4));

        }


    } catch (e) {
        console.log(e);
    }
});
router.post('/getData', async (req, res) => {
    let all_urls=await Url.getUrls();
    await res.send(JSON.stringify(all_urls));

});


app.listen(port, () => console.log(`UrlShortener Server listening on port ${port}!`));

