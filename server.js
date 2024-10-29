const express = require('express');
const app = require ('./src/app');
const port = 3000;
app.use(express.json());



app.get('/', (req, res) => {
    res.sendFile(__dirname+'/public/views/index.html');
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/`);
});
