import express from 'express'
const bodyParser = require('body-parser');
const cors = require('cors');
const { PORT = 3333 } = process.env;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true,limit:'50mb'}));
app.use(bodyParser.json({extended:true,limit:'50mb'}));


const validateString = (text:string): boolean => {

    const cleanString:string = text.replace(/([a-z]|[0-9]|[!@#$%^&*_+-={[\]|\\,.'"<>/?}])/g,'');

    let count:number = 0;

    cleanString.split('').forEach(char => {
        switch(char){
            case '(':
                ++count;
                break;
            case ')':
                --count;
                break;
            default:
                break;
        }

        if(count < 0)  return false;
    });

    if(count === 0)  return true;
    
    return true;
}

app.get('/',(req,res) => {
    res.send('healthy');
})
app.post('/validate-file',(req,res) => {
    try {
        const image:any = req.body.file.split(",")[1];

        const buff:any = Buffer.from(image, 'base64');
        
        const valid = validateString(buff.toString());

        res.send({valid});
       
    } catch {
        res.end();
    }
});

app.post('/validate-text',(req,res) => {

    const { text } = req.body;

    const valid = validateString(text);

    res.send({valid});

})
app.listen(PORT, () => console.log(`Server up at ${PORT}`))