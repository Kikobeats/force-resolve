'use strict'

forceResolve  = require '..'
path          = require 'path'
should        = require 'should'
fs            = require 'fs-extra'
globalNpmPath = require 'global-modules'

deleteAssets = (cb) ->
  fs.removeSync path.resolve 'node_modules', 'jshint'
  fs.removeSync path.resolve globalNpmPath, 'force-require-test'
  cb?()

describe 'force-resolve ::', ->

  after deleteAssets
  before deleteAssets

  describe 'unit', ->

    it "resolve a dependency that exist locally", ->
      dep = forceResolve 'mocha'
      Array.isArray(dep).should.be.equal true
      (dep.length > 0).should.be.equal true

    it 'require a dependency that exist globally', ->
      dep = forceResolve 'jshint'
      Array.isArray(dep).should.be.equal true
      (dep.length > 0).should.be.equal true

    it "resolve a dependency that doesn't exist locally or globally", ->
      dep = forceResolve 'force-require-test'
      Array.isArray(dep).should.be.equal true
      (dep.length > 0).should.be.equal true

    it 'async interface', (done) ->
      deleteAssets ->
        forceResolve 'force-require-test', (err, dep) ->
          return done err if err
          Array.isArray(dep).should.be.equal true
          (dep.length > 0).should.be.equal true
          done()
