const mongoose=require("mongoose");
const Schema= mongoose.Schema;
const urlSchema= new Schema({
    url:{
        type:String,
        required:true
    },
    shortenedUrl:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

urlSchema.statics.getUrls = function() {
    return new Promise((resolve, reject) => {
        this.find((err, docs) => {
            if(err) {
                console.error(err)
                return reject(err)
            }
            resolve(docs)
        })
    })
}

mongoose.model('url_data', urlSchema);