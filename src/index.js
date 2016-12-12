$(document).ready(function() {
    console.log('ready');

    $('#generate').on('click', function(e) {
        e.preventDefault();
        var num = $('#numToGenerate').val();

        //Javascript API Call to server to generate rows
        $.ajax({
            url: '/generate',
            data: {
                'num': num
            }
        }).done(function() {
           console.log('done!');
        });
    });
});