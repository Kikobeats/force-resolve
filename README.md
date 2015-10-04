# Force Resolve

![Last version](https://img.shields.io/github/tag/Kikobeats/force-resolve.svg?style=flat-square)
[![Build Status](http://img.shields.io/travis/Kikobeats/force-resolve/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/force-resolve)
[![Dependency status](http://img.shields.io/david/Kikobeats/force-resolve.svg?style=flat-square)](https://david-dm.org/Kikobeats/force-resolve)
[![Dev Dependencies Status](http://img.shields.io/david/dev/Kikobeats/force-resolve.svg?style=flat-square)](https://david-dm.org/Kikobeats/force-resolve#info=devDependencies)
[![NPM Status](http://img.shields.io/npm/dm/force-resolve.svg?style=flat-square)](https://www.npmjs.org/package/force-resolve)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/kikobeats)

> Ensure to resolve the path of a NPM dependency. Similar to [force-require](https://github.com/Kikobeats/force-require) but return the path of the dependency instead.

## Install

```bash
npm install force-resolve --save
```

## Usage

```js
var forceResolve = require('force-resolve');

// [
//   '/Users/kikobeats/Projects/force-resolve/node_modules/mocha',
//   '/usr/local/lib/node_modules/mocha'
// ]
```

## API

### forceResolve.(&lt;String&gt;, [cb])

Try to load a dependency based in the name. If `cb` is provided then the call will be resolved as sync interface.

Internally the library follow the next algorithm:

1) Try to require the dependency locally. This means that exists in the current `process.cwd()/node_modules` folder
as direct dependency or a dependency of another dependency.

2) If not possible to resolve locally, then try to resolve globally in your system. Try to require the dependency globally
using the module [global-modules](https://github.com/jonschlinkert/global-modules).

3) At this poin of the algorithm, the dependency was not found. Let's install as global module and later require it.

## License

MIT © [Kiko Beats](http://kikobeats.com)
