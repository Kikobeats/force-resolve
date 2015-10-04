'use strict';

var path          = require('path');
var wrapSync      = require('wrap-sync');
var resolveUp     = require('resolve-up');
var terminal      = require('oh-my-terminal');
var globalNpmPath = require('global-modules');

var install = function(dependency, cb) {
  var originalPath;
  originalPath = process.cwd();
  process.chdir(globalNpmPath);
  terminal.exec('npm install ' + dependency, function() {
    process.chdir(originalPath);
    return cb.apply(arguments);
  });
};

var installSync = function(dependency) {
  var originalPath;
  originalPath = process.cwd();
  process.chdir(globalNpmPath);
  terminal.exec('npm install ' + dependency);
  return process.chdir(originalPath);
};

var resolveSync = function(dependency) {
  var resolve = resolveUp(dependency);
  if (resolve.length !== 0) return resolve;
  installSync(dependency);
  return [path.join(globalNpmPath, dependency)];
};

var resolve = function(dependency, cb) {
  wrapSync(resolveUp)(dependency, function(err, resolve) {
    if (err) return cb(err);
    if (resolve.length !== 0) return cb(null, resolve);
    install(dependency, function(err) {
      return cb(err, [path.join(globalNpmPath, dependency)]);
    });
  });
};

module.exports = function(dependency, cb) {
  if (!cb) return resolveSync(dependency);
  return resolve(dependency, cb);
};
