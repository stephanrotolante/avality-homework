import express from 'express'
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { PORT = 3333 } = process.env;

import { UserModel } from './schema';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true,limit:'50mb'}));
app.use(bodyParser.json({extended:true,limit:'50mb'}));

app.get('/',(req,res) => {
    res.send('healthy');
})

app.post('/send-info', async (req,res) => {

    const user = new UserModel({...req.body});

    const result = await user.save();

    res.send(!!result)

})

const startServer = async () => {
    
        
    await mongoose.connect('mongodb://root:example@mongo:27017', { useNewUrlParser: true, useUnifiedTopology: true });
      
    app.listen(PORT, () => console.log(`Server up at ${PORT}`))
}

startServer();