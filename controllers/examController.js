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
    const request = new sql.Request();
    request.input('stdId',sql.Int,req.body.studentID);
    request.input('examId',sql.Int,req.body.examID);
    request.input('qus1ID',sql.Int,req.body.ques1ID);
    request.input('ans1',sql.VarChar,req.body.answer1);
    request.input('qus2ID',sql.Int,req.body.ques2ID);
    request.input('ans2',sql.VarChar,req.body.answer2);
    request.input('qus3ID',sql.Int,req.body.ques3ID);
    request.input('ans3',sql.VarChar,req.body.answer3);
    request.input('qus4ID',sql.Int,req.body.ques4ID);
    request.input('ans4',sql.VarChar,req.body.answer4);
    request.input('qus5ID',sql.Int,req.body.ques5ID);
    request.input('ans5',sql.VarChar,req.body.answer5);
    request.input('qus6ID',sql.Int,req.body.ques6ID);
    request.input('ans6',sql.VarChar,req.body.answer6);
    request.input('qus7ID',sql.Int,req.body.ques7ID);
    request.input('ans7',sql.VarChar,req.body.answer7);
    request.input('qus8ID',sql.Int,req.body.ques8ID);
    request.input('ans8',sql.VarChar,req.body.answer8);
    request.input('qus9ID',sql.Int,req.body.ques9ID);
    request.input('ans9',sql.VarChar,req.body.answer9);
    request.input('qus10ID',sql.Int,req.body.ques10ID);
    request.input('ans10',sql.VarChar,req.body.answer10);

    request.execute('studentAnswerExam',(err,result)=>{
        try{
            res.status(200).json({Data:result,Message:"Answers posted successfully"});
        }catch{
            res.status(404).json({Data:err});
        }
    });

}