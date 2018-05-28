# file-times

Gets or sets the created/modified/accessed timestamps of a file.

## Installation

Requires [Node.js](https://nodejs.org/) 6.0.0 or above.

```bash
npm i file-times
```

## API

The module exports an object with two methods: `get()` and `set()`.

### `get()`

This function can also be required directly via `file-times/get`.

#### Parameters

1. `path` (string): The file path.
2. Optional: Object argument:
     * `wrapper` (function): A callback through which the file times should be passed. Defaults to the [moment](https://github.com/moment/moment) library constructor.

#### Return Value

Returns a Promise that will resolve with an object containing four keys: `created`, `modified`, `changed`, and `accessed`. Each key corresponds to a timestamp that has been wrapped with `wrapper`.

#### Example

```javascript
const getFileTimes = require('file-times/get')

getFileTimes('/path').then(({created, modified, changed, accessed}) => {
  // Do something with the file times
})
```

### `set()`

This function can also be required directly via `file-times/set`.

#### Parameters

1. `path` (string): The file path.
2. Object argument:
   * Optional: `created` (Date or string)
   * Optional: `modified` (Date or string)
   * Optional: `accessed` (Date or string)

If a timestamp is omitted, it will not be changed. The `set()` function does not support `changed`. Setting `created` will have no effect on Linux.

#### Return Value

Returns a Promise.

#### Example

```javascript
const setFileTimes = require('file-times/set')

setFileTimes('/path', {modified: new Date()}).then(() => {
  // Done
})
```
