var db = require('../functions/mysql_db.js');

exports.getListProject = function(role, user_id, done) {
    var query = "SELECT * FROM project WHERE is_deleted = 0";
    if(role !== 1) {
        query += " AND (created_by = " + user_id + " OR assigned_to = " + user_id + ")";
    }
    db.get().query(query, function(err, rows, fields) {
        if(!err) {
            var result = {
                status: err ? 0 : 1,
                msg: err,
                rows: rows
            };
            done({ result: result }); 
        } else {
            var result = {
                status: err ? 0 : 1,
                msg: err,
                rows: rows
            };
            done({ result: result });            
        }
    });
};

exports.searchProject = function(keyword, done) {
    db.get().query("SELECT * FROM project WHERE name LIKE '%" + keyword + "%'", function(err, rows, fields) {
        var result = {
            status: err ? 0 : 1,
            msg: err,
            rows: rows
        }
        done({ result: result });
    });
};

exports.addProject = function(name, user_id, done) {
    db.get().query("INSERT INTO project(name, created_by) VALUES('" + name + "', '" + user_id + "')", function(err, rows, fields) {
        var result = {
            status: err ? 0 : 1,
            msg: err,
            rows: rows
        }
        done({ result: result });
    });
};

exports.editProject = function(query, id, done) {
    db.get().query("UPDATE project SET " + query + " WHERE id = " + id, function(err, rows, fields) {
        var result = {
            status: err ? 0 : 1,
            msg: err,
            rows: rows
        }
        done({ result: result });
    });    
};

exports.deleteProject = function(project_id, done) {
    db.get().query("UPDATE project SET is_deleted = 1 WHERE id = " + project_id, function(err, rows, fields) {
        var result = {
            status: err ? 0 : 1,
            msg: err,
            rows: rows
        }
        done({ result: result });
    });
};