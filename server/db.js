const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();
const dbUsername = process.env.USERNAME;
const dbHost = process.env.HOST;
//const dbPassword = process.env.PASSWORD;
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});
//console.log(dbUsername+" "+dbHost);

connection.connect((err)=>{
    if(err) console.log(err);
    else console.log("DB Connected!");
});

class Db{
    static getDbInstance(){
        return instance ? instance : new Db();
    }
    async getAllWards(){
        try {
            const response = await new Promise((resolve,reject)=>{
                const query = "SELECT WARD_ID,DETAILS FROM complaint;";
                connection.query(query,(err,results)=>{
                   if(err) reject(new Error(err.message));
                   resolve(results); 
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = Db;