const {validationResult} = require("express-validator");
const sql = require("mssql");

exports.loginController = function(req,res,next){
    if(req.body.user === 'Student'){
        const request = new sql.Request();
        request.input('name',sql.VarChar,req.body.name)
        request.execute('SelectStudentByName',(err,result)=>{
            if(result.recordset.length != 0){
                if(req.body.password === result.recordsets[0][0].password){
                    res.status(200).json({Data:result.recordsets});
                }else{
                    next(new Error("Wrong name or password"));
                    res.status(404).json({Message:"Wrong name or password"});
                }
            }else{
                next(new Error("Wrong name or password"));
                res.status(404).json({Message:"Wrong name or password"});
            }

        })
    }else if(req.body.user === 'Instructor'){
        const request = new sql.Request();
        request.input('name',sql.VarChar,req.body.name)
        request.execute('SelectInstructorByName',(err,result)=>{
            if(result.recordset.length != 0){
                if(req.body.password === result.recordsets[0][0].password){
                    res.status(200).json({Data:result.recordsets});
                }else{
                    next(new Error("Wrong name or password"));
                    res.status(404).json({Message:"Wrong name or password"});
                }

            }else{
                next(new Error("Wrong name or password"));
                res.status(404).json({Message:"Wrong name or password"});
            }

        });
    }

}

