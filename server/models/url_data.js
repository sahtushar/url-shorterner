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

mongoose.model('url_data', urlSchema);