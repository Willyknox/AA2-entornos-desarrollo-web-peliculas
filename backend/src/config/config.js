const yaml = require('js-yaml');
const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Lee el fichero de configuración
let configFile = 'config.prod.yaml';
const argv = yargs(hideBin(process.argv)).argv;
if (argv.config != undefined) {
    configFile = argv.config;
}
const production = yaml.load(fs.readFileSync('./src/config/config.prod.yaml', 'utf8'));

