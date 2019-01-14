
function clearConsole(msg) {
    const clear = process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H',
        output = msg ? clear + msg + "\n\n" : clear;
    process.stdout.write(output);
}

module.exports = clearConsole;