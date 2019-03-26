const expect = require('chai').expect;
const fs = require('fs');
const Duration = require('../lib/duration.js');
const MP3Cutter = require('../lib/index.js');
var files;

before(() => {
    files = [
        { name:'sound1.mp3', duration:121, start:26, end:46, newDuration:20 },
        { name:'sound2.mp3', duration:242, start:50, end:85, newDuration:35 }
    ];
});

describe('test duration', () => {
    it("values returning from the 'getDuration' method should be equal to the ones in the array", done => {
        files.forEach(f => {
                var d = Duration.getDuration('tests/files/'+f.name);
                expect(f.duration).to.equal(parseInt(d.duration));
        });
        done();
    });
});

describe('test cutter', () => {
    it('after the cutting opeartion, the duration of the new files should be equal to the ones in the array', done => {
        var dir = 'tests/files/cut';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        files.forEach(f => {
            MP3Cutter.cut({
                src: 'tests/files/'+f.name,
                target: dir+'/'+f.name,
                start: f.start,
                end: f.end 
            });
            var d = Duration.getDuration(dir+'/'+f.name);
            expect(f.newDuration).to.equal(parseInt(d.duration));
        });
        done();
    });
});