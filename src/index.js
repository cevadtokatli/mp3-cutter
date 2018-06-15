const fs = require('fs');
const Duration = require('./duration.js');

class MP3Cutter {
    /**
     * Cuts mp3 files and creates a new file with it.
     * 
     * @param {src:String, target:String, start:Number, end:Number} o 
     */
    static cut(o={}) {
        var src = o.src,
        size = fs.statSync(src).size,
        duration = Duration.getDuration(src),
        startTime = o.start || 0,
        endTime = o.end || duration;

        var valuePerSecond = size / duration,
            start = startTime * valuePerSecond,
            end = endTime * valuePerSecond;

        var fd = fs.openSync(src, 'r');
        try {
            var buffer = new Buffer(end-start);
            fs.readSync(fd, buffer, 0, buffer.length, start);
            fs.writeFileSync(o.target, buffer);
        } catch(e) {
            console.error(e);
        } finally {
            fs.closeSync(fd);
        }
    }
}

module.exports = MP3Cutter;