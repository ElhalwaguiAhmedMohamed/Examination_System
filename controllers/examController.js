const sql = require("mssql");


exports.generateExam = function(req,res,next){
    let tf_questionNumber;
    let multipleChoiceNumber;
    tf_questionNumber = Math.floor(Math.random()*9)+1;
    multipleChoiceNumber =  10 - tf_questionNumber ;


    console.log(tf_questionNumber,multipleChoiceNumber);
    const request = new sql.Request();
    request.input('c_name',sql.VarChar(20),'JavaScript');
    request.input('tf_Number',sql.Int,tf_questionNumber);
    request.input('multipleChoice_Number',sql.Int,multipleChoiceNumber);
    request.execute('GenerateExam',(err,result)=>{
        res.status(200).json({Data:result.recordsets});
    });
}


exports.answerExam = function (req,res,next) {
    const request1 = new sql.Request();
    request1.input('stdId',sql.Int,req.body.studentID);
    request1.input('examId',sql.Int,req.body.examID);
    for(let i=1 ; i<=10 ; i++){
        request1.input(`qus${i}ID`,sql.Int,eval(`req.body.ques${i}ID`));
        request1.input(`ans${i}`,sql.VarChar,eval(`req.body.answer${i}`));
    }

    request1.execute('studentAnswerExam',(err,result)=>{

    });

    for(let i=1; i<=10 ; i++){
        let request2 = new sql.Request();
        request2.input('st_id',sql.Int,req.body.studentID);
        request2.input('Ex_id',sql.Int,req.body.examID);
        request2.input('q_Id',sql.Int,eval(`req.body.ques${i}ID`));
        request2.input('st_ans',sql.VarChar,eval(`req.body.answer${i}`));
        request2.execute('correct_Exam',(err,result)=>{
            console.log(result);
        })
    }

    let request3 = new sql.Request();
    request3.input('std_ID',sql.Int,req.body.studentID);
    request3.input('c_ID',sql.Int,145);
    request3.execute('getStudentGradeInCourse',(err,result)=>{
        res.status(200).json({Data:result})
    })


}