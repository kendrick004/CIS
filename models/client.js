var db = require('../functions/mysql_db.js');

exports.searchClient = function(keyword, done) {
    db.get().query("SELECT * FROM client WHERE name LIKE '%" + keyword + "%'", function(err, rows, fields) {
        var result = {
            status: err ? 0 : 1,
            msg: err,
            rows: rows
        }
        done({ result: result });
    });
};

exports.addClient = function(name, address, type, done) {
    db.get().query("INSERT INTO client(name, address, type) VALUES('" + name + "', '" + address + "', '" + type + "')", function(err, rows, fields) {
        var result = {
            status: err ? 0 : 1,
            msg: err,
            rows: rows
        }
        done({ result: result });
    });
};

exports.editClient = function(query, id, done) {
    db.get().query("UPDATE client SET " + query + " WHERE id = " + id, function(err, rows, fields) {
        var result = {
            status: err ? 0 : 1,
            msg: err,
            rows: rows
        }
        done({ result: result });
    });    
};

exports.deleteClient = function(client_id, done) {
    db.get().query("UPDATE client SET is_deleted = 1 WHERE id = " + client_id, function(err, rows, fields) {
        var result = {
            status: err ? 0 : 1,
            msg: err,
            rows: rows
        }
        done({ result: result });
    });
};