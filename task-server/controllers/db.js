var mysql = require('mysql');
var uuid = require('node-uuid');
var nJwt = require('jwt-simple');

var connection = mysql.createConnection({
    multipleStatements: true,
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'mydatabase'
});

connection.connect(function(err) {
    if (err){
        console.error('error connecting: ' + err.stack);
        throw err;
    }
});


function myError (code, msg) {
    return {code: code, msg: msg};
}

var secretKey = "ikjhk";


function getAllTasks (cb) {
    connection.query('SELECT * from tasks', function(err, rows, fields) {
        cb(err, rows);
    });
}

exports.getAllTasksApi = function getAllTasksApi (req, res) {
    getAllTasks(function (err, data) {
        if (err) {
            res.status(err.code).send(err.msg);
        } else {
            res.header('Content-Type', 'application/json');
            res.send(JSON.stringify(data));
        }
    });
}

function getTaskById (id, cb) {
    connection.query('SELECT * from tasks WHERE id = ?', id , function(err, rows, fields) {
        cb(err, rows);
    });
}

exports.getTaskByIdApi = function getTaskByIdApi (req, res) {
    getTaskById(req.params.id, function (err, data) {
        if (err) {
            res.status(err.code).send(err.msg);
        } else {
            res.header('Content-Type', 'application/json');
            res.send(JSON.stringify(data));
        }
    });
}

function addTask (body, cb) {
    if (!body.amount) {
        return cb(myError(409, 'amount is mandatory'));
    }
    if (!body.name) {
        return cb(myError(409, 'name is mandatory'));
    }

    var Task = {
        amount: body.amount,
        name: body.name
    };


    connection.query('INSERT INTO tasks SET ?', Task, function(err, rows, fields) {
        cb(err, rows);
    });

}

exports.addTaskApi = function addTaskApi (req, res) {
    addTask(req.body, function (err, data) {
        if (err) {
            res.status(err.code).send(err.msg);
        } else {
            res.send(data)
        }
    });
}

function updateTask (body, cb) {
    if (!body.amount) {
        return cb(myError(409, 'amount is mandatory'));
    }
    if (!body.name) {
        return cb(myError(409, 'name is mandatory'));
    }
    if (typeof body.made !== 'number') {
        // console.log(typeof body.made);
        return cb(myError(409, 'made is mandatory'));
    }


    getTaskById(body.id, function (err, data) {
        if (err) {
            return cb(err);
        }
        connection.query('UPDATE tasks SET amount = ?, name = ?, made = ? WHERE id = ?', [body.amount, body.name, body.made, body.id], function(err, rows, fields) {
            cb(null, rows);
        });

    });

}

exports.updateTaskApi = function updateTaskApi (req, res) {
    updateTask(req.body, function (err, data) {
        if (err) {
            res.status(err.code).send(err.msg);
        } else {
            res.send(data)
        }
    });
}


function deleteTask (body, cb) {
    if (!body.id) {
        return cb(myError(409, 'id is mandatory'));
    }

    connection.query('DELETE FROM tasks WHERE id = ?', body.id , function(err) {
        cb(null, 'Task with id ' + body.id + ' was successfully deleted');
    });

}

exports.deleteTaskApi = function deleteTaskApi (req, res) {
    deleteTask(req.body, function (err, data) {
        if (err) {
            res.status(err.code).send(err.msg);
        } else {
            res.send(data);
        }
    });
}
