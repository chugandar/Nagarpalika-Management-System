const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

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

    async getLogin(username,password){
        try {
            const response = await new Promise((resolve,reject) => {
                const query = "SELECT *FROM USER WHERE USERNAME = ? AND PASSWORD = ?;";
                connection.query(query,[username,password],(err,result) => {
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