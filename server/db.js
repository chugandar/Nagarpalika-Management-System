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
                const query = `SELECT *FROM usertable WHERE USERNAME='${username}' and USER_ID='${password}';`;
                connection.query(query,(err,result) => {
                    if(err) reject(new Error(err.message));
                    console.log(result);
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getZones(){
        try {
            const response = await new Promise((resolve,reject) => {
                const query = `SELECT zone.ZONE_ID, ward.WARD_ID,COUNT(complaint.STATUS) AS Complaints FROM (zone NATURAL JOIN ward) NATURAL JOIN complaint WHERE complaint.STATUS=0 GROUP BY zone.ZONE_ID;`;
                connection.query(query,(err,result) => {
                    if(err) reject(new Error(err.message));
                    console.log(result);
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async register(username,password,wardid){
        try {
            console.log(username+""+wardid);
            const response = await new Promise((resolve,reject) => {
                const query = `INSERT INTO usertable VALUES('${password}','${username}','${wardid}');`;
                connection.query(query,(err,result) => {
                    if(err) reject(new Error(err.message));
                    console.log(result);
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getAllUsers(){
        try {
            
        } catch (error) {
            console.log(error);
            
        }
    }
}
module.exports = Db;