import express from 'express';
import path from 'path';
import { route } from './routes/api';
const cors=require('cors');
const app = express();
app.use(cors());


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', express.static(path.join(__dirname, '../public')))

app.use('/api', route)

app.get('/', (req, res) => {
    res.redirect('index.html')
})

app.listen(process.env.PORT || 5555, function () {
    console.log("Server started");
});