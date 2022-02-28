const sql = require("mssql");


exports.generateExam = function(req,res,next){
    let tf_questionNumber;
    let multipleChoiceNumber;
    tf_questionNumber = Math.floor(Math.random()*9)+1;
    multipleChoiceNumber =  10 - tf_questionNumber ;

    console.log(tf_questionNumber,multipleChoiceNumber);
    const request = new sql.Request();
    request.input('c_name',sql.VarChar(20),req.body.cname);
    request.input('tf_Number',sql.Int,tf_questionNumber);
    request.input('multipleChoice_Number',sql.Int,multipleChoiceNumber);
    request.execute('GenerateExam',(err,result)=>{
        console.log(result);
        let comingResult = result.recordsets[0];
        let questionsArr = [];
        if(tf_questionNumber>5){
            tf_questionNumber=5;
        }
        if(multipleChoiceNumber>5){
            multipleChoiceNumber=5;
        }
        for(let i=0 ; i < (tf_questionNumber*2) ; i+=2){
            questionsArr.push({questionID:comingResult[i].ques_ID,question:comingResult[i].ques_Body,answer1:'True',answer2:'False'});
        }

        let choice1='';
        let choice2='';
        let choice3='';
        let choice4='';
        for(let i=tf_questionNumber*2 ; i < comingResult.length ; i+=4){
                console.log(i);
                choice1 = comingResult[i].choice;
                choice2 = comingResult[i+1].choice;
                choice3 = comingResult[i+2].choice;
                choice4 = comingResult[i+3].choice;

            questionsArr.push({questionID:comingResult[i].ques_ID,question:comingResult[i].ques_Body,answer1:choice1,answer2:choice2,answer3:choice3,answer4:choice4});

        }
        res.status(200).json({Data:questionsArr});



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