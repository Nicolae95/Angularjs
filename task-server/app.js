var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');


app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

app.use(bodyParser.json());

var task = require('./controllers/db');
app.get('/', task.getAllTasksApi);
app.get('/task/:id', task.getTaskByIdApi);
app.post('/task', task.addTaskApi);
app.put('/task', task.updateTaskApi);
app.delete('/task', task.deleteTaskApi);

app.listen(3300, function () {
    console.log('localhost:3300');
});
