const {validationResult} = require("express-validator");
const sql = require("mssql");

exports.loginController = function(req,res,next){
    if(req.body.user === 'Student'){
        const request = new sql.Request();
        request.input('name',sql.VarChar,req.body.name)
        request.execute('SelectStudentByName',(err,result)=>{
        res.status(200).json({Data:result.recordsets});
        })
    }else if(req.body.user === 'Instructor'){
        const request = new sql.Request();
        request.input('name',sql.VarChar,req.body.name)
        request.execute('SelectInstructorByName',(err,result)=>{
        res.status(200).json({Data:result.recordsets});
        })
    }

}