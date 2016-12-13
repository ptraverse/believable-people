$(document).ready(function() {
    console.log('ready');

    $('#generate').on('click', function(e) {
        e.preventDefault();
        var num = $('#numToGenerate').val();

        //Javascript API Call to server to generate rows
        $.ajax({
            type: 'GET',
            url: '/generate/' + num
        }).done(function(generateResponse) {
            console.log(generateResponse);
            //2nd Javascript API Call to server to get rows
            $.ajax({
                type: 'GET',
                url: '/people',
            }).done(function(peopleResponse) {
                console.log(peopleResponse);
                $('#result').html('');
                $('#result').append(JSON.stringify(peopleResponse));
                console.log($('#result').html());
            });
        });
    });

    $('#empty').on('click', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'GET',
            url: '/empty'
        }).done(function(emptyResponse){
            console.log(emptyResponse);
            $('#result').html('All Records Removed!');
        });
    })
});