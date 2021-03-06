# react-strict-prop-types

[![Travis build status](http://img.shields.io/travis/gajus/react-strict-prop-types/master.svg?style=flat)](https://travis-ci.org/gajus/react-strict-prop-types)
[![NPM version](http://img.shields.io/npm/v/react-strict-prop-types.svg?style=flat)](https://www.npmjs.org/package/react-strict-prop-types)

A higher order component that raises an error if a component is used with an unknown property. A property is considered unknown when it is not defined in the component `propTypes` declaration.

For an alternative that runs at the compilation time, read about the [ESLint `prop-types` rule](#eslint-prop-types-rule).

- [Error](#error)
- [Usage](#usage)
- [Production Mode](#production-mode)
- [Options](#options)
    - [`allowHTMLProps`](#allowhtmlprops)
    - [`allowSVGProps`](#allowsvgprops)
- [ESLint `prop-types` Rule](#eslint-prop-types-rule)

## Error

The equivalent of the following `console.warn` message is produced when a component is used with an unknown property.

> Using undefined property "foo". Define the missing property in "Test" component propTypes declaration.

## Usage

```js
/**
 * @typedef StrictPropTypes~Options
 * @see {@link https://github.com/gajus/react-strict-prop-types#options}
 * @property {Boolean} allowHTMLProps
 */
```

You can decorate your component using `react-strict-prop-types` as a function, e.g.

```js
import React from 'react';
import StrictPropTypes from 'react-strict-prop-types';

class Test extends React.Component {
    render () {
        return <div />;
    }
}

/**
 * @param {Function} Component
 * @param {StrictPropTypes~Options} options
 * @return {Function}
 */
export default StrictPropTypes(Test);
```

You can decorate your component using the [ES7 decorators](https://github.com/wycats/javascript-decorators) syntax, e.g.

```js
import React from 'react';
import StrictPropTypes from 'react-strict-prop-types';

/**
 * @param {StrictPropTypes~Options} options
 * @return {Function}
 */
@StrictPropTypes()
export default class extends React.Component {
    render () {
        return <div />;
    }
}
```

## Production Mode

`react-strict-prop-types` should not be used in production. One option to disable `react-strict-prop-types` in production is to use a custom wrapper, e.g.

```js
// my-strict-prop-types.js
import StrictPropTypes from 'react-strict-prop-types';

export default (...args) => {
    if (process.env.NODE_ENV === 'production') {
        return args[0];
    }
    return StrictPropTypes(...args);
}
```

### Options

Options are supplied as the second parameter to the `StrictPropTypes` function.

```js
StrictPropTypes(Component, options);
```

or as a first parameter to the decorator:

```js
@StrictPropTypes(options);
```

#### `allowHTMLProps`

Default: `false`.

Allows all [HTML properties](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes) (including `data-*` and `aria-*`).

#### `allowSVGProps`

Default: `false`.

Allows all [SVG properties](https://facebook.github.io/react/docs/tags-and-attributes.html#svg-attributes).

## ESLint `prop-types` Rule

[`eslint-plugin-react`](https://github.com/yannickcr/eslint-plugin-react) [`prop-types`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md) rule is an alternative to `react-strict-prop-types`. The difference is:

| `prop-types` | `react-strict-prop-types`|
| --- | --- |
| Runs during the compilation step. |  Runs during the runtime. |
| Checks for references to undocumented properties inside of the component. | Checks for undocumented properties being passed to the component. |

`eslint-plugin-react` `prop-types` and `react-strict-prop-types` can be used together.

The biggest disadvantage of ESLint rule is that it will not produce a warning when `propTypes` is assigned an external object, e.g.

```js
import React from 'react';
import testPropTypes from './testPropTypes';

class Test extends React.Component {
    static propTypes = testPropTypes;

    render () {
        return <div>{this.props.name}</div>
    }
}
```
