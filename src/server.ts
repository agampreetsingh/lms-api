import express from 'express';
import path from 'path';
import { route } from './routes/api';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', express.static(path.join(__dirname, '../public')))

app.use('/api', route)

app.get('/', (req, res) => {
    res.redirect('index.html')
})

app.listen(process.env.PORT || 8181, function () {
    console.log("Server started");
});