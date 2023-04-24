const mongoose = require("mongoose");
// Used for deprecated versions
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);
// mongoose.set('useFindAndModify', false);

class DataBase {

    constructor(){
        this.connect();
    }

    connect(){
        mongoose.connect('mongodb+srv://admin:babytracker@babytrackercluster.qk1l8zn.mongodb.net/BabyTrackerDB?retryWrites=true&w=majority')
        .then(()=>{
            console.log("DataBase Connection Successful!")
        })
        .catch((err)=>{
            console.log("DataBase Connection Failed" + err)
        })
    }
}

module.exports = new DataBase();