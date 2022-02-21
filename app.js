const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const sql = require("mssql");
const port = 8000;
const app = express();
const authenticationRouter = require("./routers/authenticationRouter");
const examRouter = require("./routers/examRouter");


const config = {
    server: 'localhost',
    authentication: {
      type: 'default',
      options: {
        userName: 'test',
        password: 'test',
      }
    },
    options: {
      port: 1433,
      database: 'Examination_System',
      rowCollectionOnDone: true,
      useColumnNames: false,
      trustServerCertificate: true
    }
}

sql.connect(config).then(()=>{
    console.log("BD Connected");
    app.listen(process.env.port || port , ()=>{
        console.log(`listening on port ${port}`);
    });

}).catch((err)=>{
    console.log(`DB Connection Problem ---> ${err}`);
})


//*MiddleWares*//

app.use(morgan("dev")); //by default calls the next middleware


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/home", (req, res) => {
    res.send("HOME PAGE");
});

app.use(authenticationRouter);

app.use("/exam",examRouter);

app.use((err,req,res,next)=>{
    res.end(`This is the error : ${JSON.stringify(err)}`);
})



