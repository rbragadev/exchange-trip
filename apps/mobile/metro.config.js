const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = Array.from(new Set([...(config.watchFolders ?? []), workspaceRoot]));
config.resolver.nodeModulesPaths = [
  ...(config.resolver.nodeModulesPaths ?? []),
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];
config.resolver.blockList = exclusionList([
  new RegExp(`${escapePath(path.resolve(workspaceRoot, 'node_modules/@exchange'))}/.*`),
]);

module.exports = config;

function escapePath(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
