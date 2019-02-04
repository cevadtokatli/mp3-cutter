const MP3Cutter = require('./cutter');

const params = {
    src: null,
    target: null,
    start: 0,
    end: 0
};

for(let i=2; i<process.argv.length; i++) {
    let arg = (process.argv[i] || '').replace(/-/g, '');
    if(typeof params[arg] !== 'undefined') {
        params[arg] = process.argv[i+1];
    }
}

console.log(params)

try {
    if(!params.src) {
        throw 'Invalid source.';
    }

    if(!params.target) {
        throw 'Invalid target.';
    }

    if(isNaN((params.start = parseFloat(params.start)))) {
        throw 'Invalid start.';
    }

    if(isNaN((params.end = parseFloat(params.end)))) {
        throw 'Invalid end.';
    }

    MP3Cutter.cut(params);
} catch(err) {
    console.error(err);
    process.exit(-1);
}