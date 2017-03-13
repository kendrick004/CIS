$(document).ready(function() {
    listeners();

    $("#add-project").on("click", function() {
        var $this = $(this);

        $this.attr('disabled', true);
        $this.html('<span class="fa fa-spin fa-spinner" style="color:#0f0f0f; cursor:pointer;"></span>');

        $.ajax({
            url: 'project/add',
            type: 'POST',
            data: {
                name: $("#new_project_name").val(),
            },
            dataType: 'json',
            success: function(cb) {
                add_project_card(cb.insert_id, $("#new_project_name").val(), 'N/A');

                $this.attr('disabled', false);
                $this.html('Save');

                $("#new-project-modal").modal("hide");
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();

                listeners();
                console.log("Successfully deleted.");
            },
            error: function(xhr, status, error) {
                console.log("Error: " + xhr.responseText);
            }
        });
    });

    $("#datetimepicker_duration").datetimepicker({
        format: "YYYY-MM-DD",
        minDate: moment(),
    });

    $("#new-project-modal").on("hide.bs.modal", function() {
        $("#new_project_name").val("");
    });

    $("#project-modal").on("hide.bs.modal", function() {
        $("#project_id").val("");
        $("#project_name").val("");
        $("#text_client").val("");
        $("#text_qnx").val("");
        $("#text_duration").val("");
        $("#text_sales").val("");
        $("#text_marketing").val("");
        $("#text_brand").val("");
        $("#text_finance").val("");
        $("#text_service").val("");
        $("#text_software").val("");
        $("#text_hardware").val("");
        $("#text_maintenance").val("");
        $("#text_executive").val("");
        $(".collapse").collapse("hide");
    });    
});

function listeners() {
    $(".delete-project").on("click", function() {
        var del_id = this.id;
        var $this = $(this);

        $this.attr('disabled', true);
        $this.html('<span class="fa fa-spin fa-spinner" style="color:#0f0f0f; cursor:pointer;"></span>');

        $.ajax({
            url: 'project/delete',
            type: 'POST',
            data: {
                id: del_id
            },
            dataType: 'json',
            success: function(cb) {
                $this.attr('disabled', false);
                $this.html('<span class="fa fa-trash-o"></span>');
                delete_project_card(del_id);
                console.log("Successfully deleted.");
            },
            error: function(xhr, status, error) {
                console.log("Error: " + xhr.responseText);
            }
        });
    });

    $(".edit-project").on("click", function() {
        var id = this.id;
        var $this = $(this);

        $this.attr('disabled', true);
        $this.html('<span class="fa fa-spin fa-spinner" style="color:#0f0f0f; cursor:pointer;"></span>');

        $.ajax({
            url: 'project/id',
            type: 'POST',
            data: {
                id: id
            },
            dataType: 'json',
            success: function(cb) {
                $this.attr('disabled', false);
                $this.html('<span class="fa fa-pencil-square-o"></span>');

                $("#project_id").val(cb.project.id);
                $("#project_name").val(cb.project.name);
                if(cb.project.client_id !== null) { $("#client").collapse("show"); $("#text_client").val(cb.project.client_id); }
                if(cb.project.assigned_to !== null) { $("#qnx").collapse("show"); $("#text_qnx").val(cb.project.assigned_to); }
                if(cb.project.duration !== null) { $("#duration").collapse("show"); $("#text_duration").val(moment(cb.project.duration).format('YYYY-MM-DD')); }
                if(cb.project.sales !== null) { $("#sales").collapse("show"); $("#text_sales").val(cb.project.sales); }
                if(cb.project.marketing !== null) { $("#marketing").collapse("show"); $("#text_marketing").val(cb.project.marketing); }
                if(cb.project.brand !== null) { $("#brand").collapse("show"); $("#text_brand").val(cb.project.brand); }
                if(cb.project.finance !== null) { $("#finance").collapse("show"); $("#text_finance").val(cb.project.finance); }
                if(cb.project.service !== null) { $("#services").collapse("show"); $("#text_service").val(cb.project.service); }
                if(cb.project.software !== null) { $("#software").collapse("show"); $("#text_software").val(cb.project.software); }
                if(cb.project.hardware !== null) { $("#hardware").collapse("show"); $("#text_hardware").val(cb.project.hardware); }
                if(cb.project.maintenance !== null) { $("#maintenance").collapse("show"); $("#text_maintenance").val(cb.project.maintenance); }
                if(cb.project.executive !== null) { $("#executive").collapse("show"); $("#text_executive").val(cb.project.executive); }

                // if(cb.milestone.rows.length > 0) {
                //     $("#milestone").collapse("show");

                //     var list = "";
                //     $.each(cb.milestone.rows, function(i1, v1) {
                //         list += '\
                //             <div class="col-md-12 col-sm-12 col-xs-12">\
                //                 <label for="address" class="control-label col-md-2">\
                //                     Milestone Description\
                //                 </label>\
                //                 <div class="col-md-10 col-sm-10 col-xs-10 col-sm-10 col-xs-10" style="margin-top:3px;">\
                //                     <div class="input-group">\
                //                         <span class="input-group-addon"><i class="fa fa-fw fa-edit"></i></span>\
                //                         <input type="hidden" class="m_id" value="' + v1.id + '"/>\
                //                         <input type="text" class="m_description form-control" tabindex="-1" value="' + v1.description + '"/>\
                //                     </div>\
                //                 </div>\
                //             </div>\
                //             <input type="hidden" id="mi_' + v1.id + '_vf_new_counter" value="0"/>\
                //             <div class="col-md-12 col-xs-12 col-sm-12">\
                //                 <table id="mi_vf_' + v1.id + '" class="table table-bordered" style="text-align:left;">\
                //                     <thead>\
                //                         <tr>\
                //                             <th style="display:none;">ID</th>\
                //                             <th style="width:60%">Valueframe Description</th>\
                //                             <th style="width:30%">Completion Date</th>\
                //                             <th style="width:10%">Done</th>\
                //                         </tr>\
                //                     </thead>\
                //                     <tbody id="mv_list">\
                //         ';
                        
                //         $.each(cb.valueframe.rows, function(i2, v2) {
                //             if(v2.milestone_id == v1.id) {
                //                 list += '\
                //                     <tr>\
                //                         <td style="display:none;" class="mi_' + v2.milestone_id + '_v_id">' + v2.id + '</td>\
                //                         <td contenteditable="true" class="mi_' + v2.milestone_id + '_v_description">' + v2.description + '</td>\
                //                         <td>\
                //                             <div class="input-group date" id="dtp_mi_v_completion_' + v2.id + '">\
                //                                 <div class="input-group-addon">\
                //                                     <i class="fa fa-fw fa-calendar"></i>\
                //                                 </div>\
                //                                 <input class="mi_' + v2.milestone_id + '_v_completion form-control pull-right" id="mi_v_completion_' + v2.id + '" type="text" value="">\
                //                             </div>\
                //                         </td>\
                //                         <td>\
                //                             <div class="checkbox text-center">\
                //                                 <label><input class="mi_' + v2.milestone_id + '_v_done" type="checkbox" value=""' + ( v2.is_done == 1 ? ' checked' : '') + '></label>\
                //                             </div>\
                //                         </td>\
                //                     </tr>\
                //                 ';
                //             }
                //         });

                //         list += '\
                //                     </tbody>\
                //                 </table>\
                //             </div>\
                //             <div class="col-md-12 col-xs-12 col-sm-12 text-center" style="margin-bottom:20px;">\
                //                  <button id="' + v1.id + '" class="mi_add_vf btn bg-olive">Add Valueframe</button>\
                //             </div>\
                //         ';
                //     });
                //     $("#milestone_list").html(list);

                //     $.each(cb.milestone.rows, function(i1, v1) {
                //         $.each(cb.valueframe.rows, function(i2, v2) {
                //             if(v2.milestone_id == v1.id) {
                //                 $("#dtp_mi_v_completion_" + v2.id).datetimepicker({
                //                     format: "YYYY-MM-DD",
                //                     minDate: moment(),
                //                 });
                //                 $("#mi_v_completion_" + v2.id).val(moment(v2.completion_date).format('YYYY-MM-DD'));                                
                //             }
                //         });
                //     });

                //     $(".mi_add_vf").on("click", function() {
                //         var mi_id = $(this).attr('id');

                //         var counter = $("#mi_" + mi_id + "_vf_new_counter").val();
                //         counter++;
                //         $("#mi_vf_" + mi_id + " > tbody").append('\
                //             <tr>\
                //                 <td style="display:none;" class="mi_' + mi_id + '_v_id_new">new_' + counter + '</td>\
                //                 <td contenteditable="true" class="mi_' + mi_id + '_v_description_new"></td>\
                //                 <td>\
                //                     <div class="input-group date" id="dtp_completion_mi_' + mi_id + '_new_' + counter + '">\
                //                         <div class="input-group-addon">\
                //                             <i class="fa fa-fw fa-calendar"></i>\
                //                         </div>\
                //                         <input class="mi_' + mi_id + '_v_completion_new form-control pull-right" id="v_completion_mi_' + mi_id + '_new_' + counter + '" type="text" value="">\
                //                     </div>\
                //                 </td>\
                //                 <td>\
                //                     <div class="checkbox text-center">\
                //                         <label><input class="mi_' + mi_id + '_v_done_new" type="checkbox" value=""></label>\
                //                     </div>\
                //                 </td>\
                //             </tr>\
                //         ');
                //         $("#dtp_completion_mi_" + mi_id + "_new_" + counter).datetimepicker({
                //             format: "YYYY-MM-DD",
                //             minDate: moment(),
                //         });
                //         $("#mi_" + mi_id + "_vf_new_counter").val(counter);
                //     });
                // } else {
                //     $("#milestone").collapse("hide");

                //     $("#milestone_list").html("");
                //     $("#mi_new_counter").val("0")
                // }

                if(cb.valueframe.rows.length > 0) {
                    $("#value_frame").collapse("show");

                    var list = "";
                    $.each(cb.valueframe.rows, function(i3, v3) {
                        if(v3.milestone_id == null) {
                            list += '\
                                <tr>\
                                    <td style="display:none;" class="v_id">' + v3.id + '</td>\
                                    <td contenteditable="true" class="v_description">' + v3.description + '</td>\
                                    <td>\
                                        <div class="input-group date" id="dtp_completion_' + v3.id + '">\
                                            <div class="input-group-addon">\
                                                <i class="fa fa-fw fa-calendar"></i>\
                                            </div>\
                                            <input class="v_completion form-control pull-right" id="v_completion_' + v3.id + '" type="text" value="">\
                                        </div>\
                                    </td>\
                                    <td>\
                                        <div class="checkbox text-center">\
                                            <label><input class="v_done" type="checkbox" value=""' + ( v3.is_done == 1 ? ' checked' : '') + '></label>\
                                        </div>\
                                    </td>\
                                </tr>\
                            ';
                        }
                    });
                    $("#value_frame_list").html(list);

                    $.each(cb.valueframe.rows, function(i3, v3) {
                        if(v3.milestone_id == null) {
                            $("#dtp_completion_" + v3.id).datetimepicker({
                                format: "YYYY-MM-DD",
                                minDate: moment(),
                            });
                            $("#v_completion_" + v3.id).val(moment(v3.completion_date).format('YYYY-MM-DD'));
                        }
                    });
                } else {
                    $("#value_frame").collapse("hide");

                    $("#value_frame_list").html("");
                    $("#vf_new_counter").val("0")
                }

                $("#project-modal").modal();
                console.log("Successfully fetched.");
            },
            error: function(xhr, status, error) {
                console.log("Error: " + xhr.responseText);
            }
        });
    });

    //add new milestone listener
    // $("#mi_add").on("click", function() {
    //     var counter = $("#mi_new_counter").val();
    //     counter++;
    //     $("#milestone_list").append('\
    //         <div class="col-md-12 col-sm-12 col-xs-12">\
    //             <label for="address" class="control-label col-md-2">\
    //                 Milestone Description\
    //             </label>\
    //             <div class="col-md-10 col-sm-10 col-xs-10 col-sm-10 col-xs-10" style="margin-top:3px;">\
    //                 <div class="input-group">\
    //                     <span class="input-group-addon"><i class="fa fa-fw fa-edit"></i></span>\
    //                     <input type="hidden" class="new_mi_id" value="' + counter + '"/>\
    //                     <input type="text"class="new_mi_description form-control" tabindex="-1" />\
    //                 </div>\
    //             </div>\
    //         </div>\
    //         <input type="hidden" id="new_mi_' + counter + '_vf_new_counter" value="0"/>\
    //         <div class="col-md-12 col-xs-12 col-sm-12">\
    //             <table id="new_mi_' + counter + '_vf_table" class="table table-bordered" style="text-align:left;">\
    //                 <thead>\
    //                     <tr>\
    //                         <th style="display:none;">ID</th>\
    //                         <th style="width:60%">Valueframe Description</th>\
    //                         <th style="width:30%">Completion Date</th>\
    //                         <th style="width:10%">Done</th>\
    //                     </tr>\
    //                 </thead>\
    //                 <tbody>\
    //                 </tbody>\
    //             </table>\
    //         </div>\
    //         <div class="col-md-12 col-xs-12 col-sm-12 text-center" style="margin-bottom:20px;">\
    //                 <button id="' + counter + '" class="new_mi_add_vf btn bg-olive">Add Valueframe</button>\
    //         </div>\
    //     ');
    //     $("#mi_new_counter").val(counter);

    //     $(".new_mi_add_vf").on("click", function() {
    //         var mi_id = $(this).attr('id');

    //         var counter = $("#new_mi_" + mi_id + "_vf_new_counter").val();
    //         counter++;
    //         $("#new_mi_" + mi_id + "_vf_table > tbody").append('\
    //             <tr id="' + mi_id + '">\
    //                 <td style="display:none;" class="new_mi_' + mi_id + '_v_id_new">' + counter + '</td>\
    //                 <td contenteditable="true" class="new_mi_' + mi_id + '_v_description_new"></td>\
    //                 <td>\
    //                     <div class="input-group date" id="dtp_completion_new_mi_' + mi_id + '_new_' + counter + '">\
    //                         <div class="input-group-addon">\
    //                             <i class="fa fa-fw fa-calendar"></i>\
    //                         </div>\
    //                         <input class="new_mi_' + mi_id + '_v_completion_new form-control pull-right" id="v_completion_new_mi_' + mi_id + '_new_' + counter + '" type="text" value="">\
    //                     </div>\
    //                 </td>\
    //                 <td>\
    //                     <div class="checkbox text-center">\
    //                         <label><input class="new_mi_' + mi_id + '_v_done_new" type="checkbox" value=""></label>\
    //                     </div>\
    //                 </td>\
    //             </tr>\
    //         ');
    //         $("#dtp_completion_new_mi_" + mi_id + "_new_" + counter).datetimepicker({
    //             format: "YYYY-MM-DD",
    //             minDate: moment(),
    //         });
    //         $("#new_mi_" + mi_id + "_vf_new_counter").val(counter);
    //     });
    // });

    /* add new valueframe listener */
    $("#vf_add").on("click", function() {
        var counter = $("#vf_new_counter").val();
        counter++;
        $("#vf_table > tbody").append('\
            <tr>\
                <td style="display:none;" class="new_vf_id">' + counter + '</td>\
                <td contenteditable="true" class="new_vf_description"></td>\
                <td>\
                    <div class="input-group date" id="new_vf_dtp_completion_' + counter + '">\
                        <div class="input-group-addon">\
                            <i class="fa fa-fw fa-calendar"></i>\
                        </div>\
                        <input class="new_vf_completion form-control pull-right" id="new_vf_completion_' + counter + '" type="text" value="">\
                    </div>\
                </td>\
                <td>\
                    <div class="checkbox text-center">\
                        <label><input class="new_vf_done" type="checkbox" value=""></label>\
                    </div>\
                </td>\
            </tr>\
        ');
        $("#new_vf_dtp_completion_" + counter).datetimepicker({
            format: "YYYY-MM-DD",
            minDate: moment(),
        });
        $("#vf_new_counter").val(counter);
    });

    $("#save").on("click", function() {
        //get modified current valueframes
        var curr_vf = [];

        $.each($(".v_id"), function() {
            var vf = [];
            vf.push($(this).html());
            curr_vf.push(vf);
        });
        var i = 0;
        $.each($(".v_description"), function() { curr_vf[i].push($(this).html()); i++; });
        var i = 0;
        $.each($(".v_completion"), function() { curr_vf[i].push($(this).val()); i++; });
        var i = 0;
        $.each($(".v_done"), function() { curr_vf[i].push($(this).is(":checked")); i++; });

        //get new valueframes
        var new_vf = [];

        $.each($(".new_vf_id"), function() {
            var vf = [];
            vf.push($(this).html());
            new_vf.push(vf);
        });
        var i = 0;
        $.each($(".new_vf_description"), function() { new_vf[i].push($(this).html()); i++; });
        var i = 0;
        $.each($(".new_vf_completion"), function() { new_vf[i].push($(this).val()); i++; });
        var i = 0;
        $.each($(".new_vf_done"), function() { new_vf[i].push($(this).is(":checked")); i++; });
        
        //get modified current milestone
        var curr_mi = [];
        $.each($(".m_id"), function() {
            var mi = [];
            mi.push($(this).val());
            curr_mi.push(mi);
        });
        var i = 0;
        $.each($(".m_description"), function() { curr_mi[i].push($(this).val()); i++; });        
        for(var i = 0; i < curr_mi.length; i++) {
            var curr_vfs = [];
            $.each($(".mi_" + curr_mi[i][0] + "_v_id"), function() {
                var vf = [];
                vf.push($(this).html());
                curr_vfs.push(vf);
            });
            var j = 0;
            $.each($(".mi_" + curr_mi[i][0] + "_v_description"), function() { curr_vfs[j].push($(this).html()); j++; });
            var j = 0;
            $.each($(".mi_" + curr_mi[i][0] + "_v_completion"), function() { curr_vfs[j].push($(this).val()); j++; });
            var j = 0;
            $.each($(".mi_" + curr_mi[i][0] + "_v_done"), function() { curr_vfs[j].push($(this).is(":checked")); j++; });
            curr_mi[i].push(curr_vfs);

            var new_vfs = [];
            $.each($(".mi_" + curr_mi[i][0] + "_v_id_new"), function() {
                var vf = [];
                vf.push($(this).html());
                new_vfs.push(vf);
            });
            var j = 0;
            $.each($(".mi_" + curr_mi[i][0] + "_v_description_new"), function() { new_vfs[j].push($(this).html()); j++; });
            var j = 0;
            $.each($(".mi_" + curr_mi[i][0] + "_v_completion_new"), function() { new_vfs[j].push($(this).val()); j++; });
            var j = 0;
            $.each($(".mi_" + curr_mi[i][0] + "_v_done_new"), function() { new_vfs[j].push($(this).is(":checked")); j++; });
            curr_mi[i].push(new_vfs);
        }

        //get new milestones
        var new_mi = [];
        $.each($(".new_mi_id"), function() {
            var mi = [];
            mi.push($(this).val());
            new_mi.push(mi);
        });
        var i = 0;
        $.each($(".new_mi_description"), function() { new_mi[i].push($(this).val()); i++; });    
        
        for(var i = 0; i < new_mi.length; i++) {
            var new_vfs = [];
            $.each($(".new_mi_" + new_mi[i][0] + "_v_id_new"), function() {
                var vf = [];
                vf.push($(this).html());
                new_vfs.push(vf);
            });
            var j = 0;
            $.each($(".new_mi_" + new_mi[i][0] + "_v_description_new"), function() { new_vfs[j].push($(this).html()); j++; });
            var j = 0;
            $.each($(".new_mi_" + new_mi[i][0] + "_v_completion_new"), function() { new_vfs[j].push($(this).val()); j++; });
            var j = 0;
            $.each($(".new_mi_" + new_mi[i][0] + "_v_done_new"), function() { new_vfs[j].push($(this).is(":checked")); j++; });
            new_mi[i].push(new_vfs);
        }

        // alert(JSON.stringify(new_mi));

        //save project details
        var $this = $(this);

        $this.attr('disabled', true);
        $this.html('<span class="fa fa-spin fa-spinner" style="color:#0f0f0f; cursor:pointer;"></span>');
        
        $.ajax({
            url: 'project/edit',
            type: 'POST',
            data: {
                id: $("#project_id").val(),
                project_name: $("#project_name").val(),
                project_description: $("#input_project_description").is(":visible") ? $("#modal_project_description").val() : undefined,
                client_id: $("#client").is(":visible") ? $("#text_client").val() : undefined,
                assigned_to: $("#qnx").is(":visible") ? $("#text_qnx").val() : undefined,
                duration: $("#duration").is(":visible") ? $("#text_duration").val() : undefined,
                sales: $("#sales").is(":visible") ? $("#text_sales").val() : undefined,
                marketing: $("#marketing").is(":visible") ? $("#text_marketing").val() : undefined,
                brand: $("#brand").is(":visible") ? $("#text_brand").val() : undefined,
                finance: $("#finance").is(":visible") ? $("#text_finance").val() : undefined,
                service: $("#services").is(":visible") ? $("#text_service").val() : undefined,
                software: $("#software").is(":visible") ? $("#text_software").val() : undefined,
                hardware: $("#hardware").is(":visible") ? $("#text_hardware").val() : undefined,
                maintenance: $("#maintenance").is(":visible") ? $("#text_maintenance").val() : undefined,
                executive: $("#executive").is(":visible") ? $("#text_executive").val() : undefined,
                curr_milestone: curr_mi,
                new_milestone: new_mi,
                curr_valueframe: curr_vf,
                new_valueframe: new_vf
            },
            dataType: 'json',
            success: function(cb) {
                $this.attr('disabled', false);
                $this.html('Save');

                $("#project-" + $("#project_id").val() + " > div > div > div > h1 > b").html($("#project_name").val());
                if($("#duration").is(":visible")) {
                    $("#project-" + $("#project_id").val() + " > div > div > div > p").html("<b>Duration: </b>" + moment($("#text_duration").val()).format('MMMM DD, YYYY'));
                } else {
                    $("#project-" + $("#project_id").val() + " > div > div > div > p").html("<b>Duration: </b>N/A");
                }

                $("#project-modal").modal("hide");

                console.log("Successfully updated.");
            },
            error: function(xhr, status, error) {
                console.log("Error: " + xhr.responseText);
            }
        });        
    });
}

function add_project_card(id, name, duration) {
    $(".project-list").append('\
        <li id="project-' + id + '" class="opportunities col-xs-7 col-sm-7 col-md-4 col-lg-4" style="float:left; margin-bottom:25px;">\
            <div class="box box-red-orange box-header col-xs-7 col-sm-7 col-md-3 col-lg-3" style="background-color:#fdfffc; margin:0; margin-top:25px;float:left;height:195px;" >\
                <button id="' + id + '" class="delete-project btn-sm btn-circle btn bg-red pull-right">\
                    <span class="fa fa-trash-o"></span>\
                </button>\
                <button id="' + id + '" class="edit-project btn-sm btn-circle btn bg-blue pull-left">\
                    <span class="fa fa-pencil-square-o"></span>\
                </button>\
                <br/><br/>\
                <div>\
                    <div class="divider"></div>\
                    <div class="">\
                        <h1 id="style-2" style="cursor:pointer;overflow-x:auto; overflow-y:hidden;white-space:nowrap"><b>' + name + '</b></h1>\
                    </div>\
                    <div class="box-footer">\
                        <p class="pull-right"><b>Duration: </b>\
                        ' + duration + '\
                    </div>\
                </div>\
            </div>\
        </li>\
    ');
}

function delete_project_card(id) {
    $("#project-" + id).remove();
}