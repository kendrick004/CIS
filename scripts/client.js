$(document).ready(function() {
    listeners();

    $("#save-client").on("click", function() {
        var $this = $(this);

        $this.attr('disabled', true);
        $this.html('<span class="fa fa-spin fa-spinner" style="color:#0f0f0f; cursor:pointer;"></span>');

        var client_url = "";
        if($("#client_id").val() != "") {
            client_url ="client/edit";
        } else {
            client_url ="client/add";
        }

        $.ajax({
            url: client_url,
            type: 'POST',
            data: {
                id: $("#client_id").val(),
                name: $("#client_name").val(),
                type: $("#client_type").val(),
                address: $("#client_address").val()
            },
            dataType: 'json',
            success: function(cb) {
                if($("#client_id").val() != "") {
                    $("#client-" + $("#client_id").val() + " > div > div > div > h1 > b").html($("#client_name").val());
                    $("#client-" + $("#client_id").val() + " > div > div > div > p").html($("#client_address").val());
                } else {
                    add_client_card(cb.insert_id, $("#client_name").val(), $("#client_address").val());
                }

                $this.attr('disabled', false);
                $this.html('Save');

                $("#client-modal").modal("hide");
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

    $("#client-modal").on("hide.bs.modal", function() {
        $("#client_id").val("");
        $("#client_name").val("");
        $("#client_address").val("");
        $("#client_type").val("");
    });
});

function listeners() {
    $(".delete-client").on("click", function() {
        var del_id = this.id;
        var $this = $(this);

        $this.attr('disabled', true);
        $this.html('<span class="fa fa-spin fa-spinner" style="color:#0f0f0f; cursor:pointer;"></span>');

        $.ajax({
            url: 'client/delete',
            type: 'POST',
            data: {
                id: del_id
            },
            dataType: 'json',
            success: function(cb) {
                $this.attr('disabled', false);
                $this.html('<span class="fa fa-trash-o"></span>');
                delete_client_card(del_id);
                console.log("Successfully deleted.");
            },
            error: function(xhr, status, error) {
                console.log("Error: " + xhr.responseText);
            }
        });
    });

    $(".edit-client").on("click", function() {
        var id = this.id;
        var $this = $(this);

        $this.attr('disabled', true);
        $this.html('<span class="fa fa-spin fa-spinner" style="color:#0f0f0f; cursor:pointer;"></span>');

        $.ajax({
            url: 'client/id',
            type: 'POST',
            data: {
                id: id
            },
            dataType: 'json',
            success: function(cb) {
                $this.attr('disabled', false);
                $this.html('<span class="fa fa-pencil-square-o"></span>');

                $("#client_id").val(cb.client.id);
                $("#client_name").val(cb.client.name);
                $("#client_address").val(cb.client.address);
                $("#client_type").val(cb.client.type);

                $("#client-modal").modal();
                console.log("Successfully fetched.");
            },
            error: function(xhr, status, error) {
                console.log("Error: " + xhr.responseText);
            }
        });
    });
}

function add_client_card(id, name, address) {
    $(".client-list").append('\
        <li id="client-' + id + '" class="opportunities col-xs-7 col-sm-7 col-md-4 col-lg-4" style="float:left; margin-bottom:25px;">\
            <div class="box box-red-orange box-header col-xs-7 col-sm-7 col-md-3 col-lg-3" style="background-color:#fdfffc; margin:0; margin-top:25px;float:left;height:195px;" >\
                <button id="' + id + '" class="delete-client btn-sm btn-circle btn bg-red pull-right">\
                    <span class="fa fa-trash-o"></span>\
                </button>\
                <button id="' + id + '" class="edit-client btn-sm btn-circle btn bg-blue pull-left">\
                    <span class="fa fa-pencil-square-o"></span>\
                </button>\
                <br/><br/>\
                <div>\
                    <div class="divider"></div>\
                    <div class="">\
                        <h1 id="style-2" style="cursor:pointer;overflow-x:auto; overflow-y:hidden;white-space:nowrap"><b>' + name + '</b></h1>\
                    </div>\
                    <div class="box-footer">\
                        <p class="pull-right">' + address + '</p>\
                    </div>\
                </div>\
            </div>\
        </li>\
    ');
}

function delete_client_card(id) {
    $("#client-" + id).remove();
}