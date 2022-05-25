process.env.NODE_ENV = 'development';

const Vite = require('vite');
const ChildProcess = require('child_process');
const Path = require('path');
const Chalk = require('chalk');
const Chokidar = require('chokidar');
const Electron = require('electron');
const compileTs = require('./private/tsc');
const FileSystem = require('fs');

let electronProcess = null;
let rendererPort = 0;

async function startRenderer() {
    const config = require(Path.join('..', 'config', 'vite.js'));

    const server = await Vite.createServer({
        ...config,
        mode: 'development',
    });

    return server.listen();
}

async function startElectron() {
    if (electronProcess) { // single instance lock
        return;
    }

    try {
        await compileTs(Path.join(__dirname, '..', 'src', 'main'));
    } catch {
        console.log(Chalk.redBright('Could not start Electron because of the above typescript error(s).'));

        return;
    }

    const args = [
        Path.join(__dirname, '..', 'build', 'main', 'main.js'),
        rendererPort,
    ];
    electronProcess = ChildProcess.spawn(Electron, args);

    electronProcess.stdout.on('data', data => 
        process.stdout.write(Chalk.blueBright(`[electron] `) + Chalk.white(data.toString()))
    );

    electronProcess.stderr.on('data', data => 
        process.stderr.write(Chalk.blueBright(`[electron] `) + Chalk.white(data.toString()))
    )
}

function restartElectron() {
    if (electronProcess) {
        electronProcess.kill();
        electronProcess = null;
    }

    startElectron();
}

function copyStaticFiles() {
    copy('static');
}

/*
The working dir of Electron is build/main instead of src/main because of TS.
tsc does not copy static files, so copy them over manually for dev server.
*/
function copy(path) {
    FileSystem.cpSync(
        Path.join(__dirname, '..', 'src', 'main', path),
        Path.join(__dirname, '..', 'build', 'main', path),
        { recursive: true }
    );
}

async function start() {
    console.log(`${Chalk.greenBright('=======================================')}`);
    console.log(`${Chalk.greenBright('Starting Electron + Vite Dev Server...')}`);
    console.log(`${Chalk.greenBright('=======================================')}`);

    const devServer = await startRenderer();
    rendererPort = devServer.config.server.port;

    copyStaticFiles();
    startElectron();

    const path = Path.join(__dirname, '..', 'src', 'main');
    Chokidar.watch(path, {
        cwd: path,
    }).on('change', (path) => {
        if (path.startsWith(Path.join('static', '/'))) {
            copy(path);
        }

        console.log(Chalk.blueBright(`[electron] `) + `Change in ${path}. reloading... 🚀`);

        restartElectron();
    })
}

start();
