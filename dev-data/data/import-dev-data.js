const fs = require('fs')
const dotenv = require('dotenv');
dotenv.config({path:"../../config.env"});
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');
const dbURL = process.env.DATABASE_URL.replace(
                "<PASSWORD>",
                process.env.DATABASE_PASSWORD
            );
//read json file

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));

// IMPORT DATA into dbURL

const importData = async() =>{
    try{
        await Tour.create(tours);
        console.log('Data successfully loaded!');
        process.exit(); // stops the application
    } catch(err){
        console.log(err);
    }
};

//DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
    try{
        await Tour.deleteMany();
        console.log('Data successfully deleted!');
        process.exit(); // stops the application
    } catch(err){
        console.log(err);
    }
}

if(process.argv[2] === "-i"){
    mongoose.connect(dbURL, {
        useNewUrlParser: true,
    }).then(()=>{
        console.log('DB connection successful');
        importData();
    });
}else if (process.argv[2] === "-d"){
    mongoose.connect(dbURL, {
        useNewUrlParser: true,
    }).then(()=>{
        console.log('DB connection successful');
        deleteData();
    });
}

console.log(process.argv);