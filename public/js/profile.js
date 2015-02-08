function validateForm(formId) {
    $.ajax({
        type: 'POST',
        url: '/user/edit',
        data: JSON.stringify($('#' + formId).serializeArray()),
        dataType: 'json',
        contentType: "application/json",
        success: function (data) {
            decorate(data);
        },
        error: function (xhr, textStatus, errorThrown) {
            $('#message').html('<div class="alert alert-danger" role="alert">\n\
            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>\n\
            <span class="sr-only">Bei der Anfrage ist ein Fehler aufgetreten.\n\
             Bitte versuchen Sie es später nocheinmal.</span></div>');
        }
    });
}

function decorate(data) {
    var messageHtml = '';
    if (data.success) {
        location.reload();
        return;
    } else {
        var msg = '';
        jQuery.each(data.messages, function (i, val) {
            // We could use the following line to add custom css to the elements:
            // $("input[name=" + i + "]\"");
            console.log(i + ': ' + val + '<br>');
            msg += i + ': ' + val + '<br>';
        });

        messageHtml = '<div class="alert alert-danger" role="alert">\n\
            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>\n\
            <span class="sr-only">Error:</span>' + msg +
                'Die Angaben sind Fehlerhaft.\n\
        </div>';
    }
    $('#message').html(messageHtml);
}

function showForm(url) {
    $.ajax({
        url: url,
        dataType: 'json',
        contentType: "application/json",
        success: function (data) {
            $('#profilemodal').html(data.modal);
            $('.modal').modal({backdrop: 'static'});
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('Der Request ging in die Toilette:' + errorThrown);
        }
    });
}