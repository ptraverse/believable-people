$(document).ready(function() {
    console.log('ready');

    $('#generate').on('click', function(e) {
        e.preventDefault();
        var num = $('#numToGenerate').val();

        //Javascript API Call to server to generate rows
        $.ajax({
            type: 'GET',
            url: '/generate/' + num,
        }).done(function(response) {
            $('#result').html('');
            $('#result').html(response);
        });
    });
});