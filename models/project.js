var db = require('../functions/mysql_db.js');

exports.getListProject = function(role, user_id, done) {
    var query = "SELECT * FROM project WHERE is_deleted = 0";
    if(role !== 1) {
        query += " AND (created_by = " + user_id + " OR assigned_to = " + user_id + ")";
    }
    db.get().query(query, function(err, rows, fields) {
        if(!err) {
            db.get().query("SELECT id, name FROM user WHERE role != 3", function(err2, rows2, fields2) {
                if(!err2) {
                    db.get().query("SELECT * FROM client WHERE is_deleted = 0", function(err3, rows3, fields3) {
                        if(!err3) {
                            var result = {
                                status: err ? 0 : 1,
                                msg: err,
                                rows: rows
                            };
                            var result2 = {
                                status: err2 ? 0 : 1,
                                msg: err2,
                                rows: rows2
                            };
                            var result3 = {
                                status: err3 ? 0 : 1,
                                msg: err3,
                                rows: rows3
                            };
                            done({ result: result, result2: result2, result3: result3 });
                        } else {
                            var result = {
                                status: err3 ? 0 : 1,
                                msg: err3,
                                rows: rows3
                            };
                            done({ result: result });            
                        }
                    });
                } else {
                    var result = {
                        status: err2 ? 0 : 1,
                        msg: err2,
                        rows: rows2
                    };
                    done({ result: result });            
                }
            });
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

exports.getProject = function(id, done) {
    db.get().query("SELECT pr.*, pe.sales, pe.marketing, pe.brand, pe.finance, pe.service, pe.software, pe.hardware, pe.maintenance, pe.executive FROM project pr LEFT JOIN personnel pe ON pr.id = pe.project_id WHERE pr.is_deleted = 0 AND pr.id = " + id, function(err, rows, fields) {
        // db.get().query("SELECT * FROM milestone WHERE project_id = " + id, function(err2, rows2, fields2) {
            db.get().query("SELECT * FROM valueframe WHERE project_id = " + id, function(err3, rows3, fields3) {
                var result = {
                    status: err ? 0 : 1,
                    msg: err,
                    rows: rows
                }
                // var result2 = {
                //     status: err2 ? 0 : 1,
                //     msg: err2,
                //     rows: rows2
                // }
                var result3 = {
                    status: err3 ? 0 : 1,
                    msg: err3,
                    rows: rows3
                }
                done({ result: result, result3: result3 });
                // done({ result: result, result2: result2, result3: result3 });
            });
        // });
    });
}

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

exports.editProjectPersonnel = function(query, id, done) {
    db.get().query("UPDATE personnel SET " + query + " WHERE project_id = " + id, function(err, rows, fields) {
        var result = {
            status: err ? 0 : 1,
            msg: err,
            rows: rows
        }
        done({ result: result });
    });    
};

// exports.editProjectFrame = function(id, curr_milestone, new_milestone, curr_valueframe, new_valueframe, done) {
exports.editProjectFrame = function(id, curr_valueframe, new_valueframe, done) {
    // if(curr_milestone !== undefined) {
    //     for(var i = 0; i < curr_milestone.length; i++) {
    //         db.get().query("UPDATE milestone SET description = '" + curr_milestone[i][1] + "' WHERE id = " + curr_milestone[i][0], function(err, rows, fields) {});    

    //         //current valueframe of milestone
    //         if(curr_milestone[i][2] !== undefined) {
    //             for(var j = 0; j < curr_milestone[i][2].length; j++) {
    //                 db.get().query("UPDATE valueframe SET description = '" + curr_milestone[i][2][j][1] + "', completion_date = '" + curr_milestone[i][2][j][2] + "', is_done = " + curr_milestone[i][2][j][3] + " WHERE id = " + curr_milestone[i][2][j][0], function(err, rows, fields) {});
    //             }
    //         }
    //         //new valueframe of milestone
    //         if(curr_milestone[i][3] !== undefined) {
    //             for(var j = 0; j < curr_milestone[i][3].length; j++) {
    //                 db.get().query("INSERT INTO valueframe(project_id, milestone_id, description, completion_date, is_done) VALUES(" + id + ", " + curr_milestone[i][0] + ",'" + curr_milestone[i][3][j][1] + "', '" + curr_milestone[i][3][j][2] + "', " + curr_milestone[i][3][j][3] + ")",  function(err, rows, fields) {});    
    //             }                
    //         }
    //     }
    // }
    // if(new_milestone !== undefined) {
    //     for(var i = 0; i < new_milestone.length; i++) {
    //         var new_mi_new_vf = new_milestone[i][2];
    //         db.get().query("INSERT INTO milestone(description, project_id) VALUES('" + new_milestone[i][1] + "', " + id + ")", function(err, rows, fields) {
    //             if(new_mi_new_vf !== undefined) {
    //                 for(var j = 0; j < new_mi_new_vf.length; j++) {
    //                     db.get().query("INSERT INTO valueframe(project_id, milestone_id, description, completion_date, is_done) VALUES(" + id + ", " + rows.insertId + ", '" + new_mi_new_vf[j][1] + "', '" + new_mi_new_vf[j][2] + "', " + new_mi_new_vf[j][3] + ")",  function(err2, rows2, fields2) {});
    //                 }                
    //             }
    //         });
    //     }        
    // }

    if(curr_valueframe !== undefined) {
        for(var i = 0; i < curr_valueframe.length; i++) {
            db.get().query("UPDATE valueframe SET description = '" + curr_valueframe[i][1] + "', completion_date = '" + curr_valueframe[i][2] + "', is_done = " + curr_valueframe[i][3] + " WHERE id = " + curr_valueframe[i][0], function(err, rows, fields) {});    
        }
    }
    if(new_valueframe !== undefined) {
        for(var i = 0; i < new_valueframe.length; i++) {
            db.get().query("INSERT INTO valueframe(project_id, description, completion_date, is_done) VALUES(" + id + ", '" + new_valueframe[i][1] + "', '" + new_valueframe[i][2] + "', " + new_valueframe[i][3] + ")",  function(err, rows, fields) {});    
        }
    }

    var result = {
        status: 1,
        msg: "success",
        rows: null
    }

    done({ result: result });
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