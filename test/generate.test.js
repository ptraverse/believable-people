var generate = require('../generate.js');
var assert = require('assert');

it('should be able to generate a person', function(done) {
    this.timeout(2000);

    generate.generatePerson(1, function(err, person){
        if (err) {
            console.log(err);
        } else {
            console.log(person);
            assert(person.gender == 'male' || person.gender == 'female');
            assert(person.fName > '');

            done();
        }
    });
});

// it('should be able to generate several people', function(done) {
//     this.timeout(2000);
//
//     generate.generatePeople(3, function(err, people) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(people);
//             assert(people.length == 3);
//
//             done();
//         }
//     });
// });