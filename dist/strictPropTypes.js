/* eslint-disable no-console */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _HTMLPropNames = require('./HTMLPropNames');

var _HTMLPropNames2 = _interopRequireDefault(_HTMLPropNames);

var _makeConfiguration = require('./makeConfiguration');

var _makeConfiguration2 = _interopRequireDefault(_makeConfiguration);

/**
 * @param {Function} Component
 * @param {Object} userConfiguration
 * @return {Function}
 */

exports['default'] = function (Component, userConfiguration) {
    var configuration = undefined;

    configuration = (0, _makeConfiguration2['default'])(userConfiguration);

    return (function (_Component) {
        _inherits(_class, _Component);

        function _class() {
            _classCallCheck(this, _class);

            _get(Object.getPrototypeOf(_class.prototype), 'constructor', this).apply(this, arguments);
        }

        _createClass(_class, [{
            key: 'validateProps',
            value: function validateProps(nextProps) {
                _utils2['default'].forEach(nextProps, function (value, name) {
                    if (!Component.propTypes[name]) {
                        if (configuration.allowHTMLProps) {
                            if (_HTMLPropNames2['default'].indexOf(name) !== -1 || name.indexOf('data-') === 0) {
                                return;
                            }
                        }

                        console.warn('Using undefined property "' + name + '". Define the missing property in "' + Component.displayName + '" component propTypes declaration.');
                    }
                });
            }
        }, {
            key: 'componentWillMount',
            value: function componentWillMount() {
                this.validateProps(this.props);

                if (_get(Object.getPrototypeOf(_class.prototype), 'componentWillMount', this)) {
                    _get(Object.getPrototypeOf(_class.prototype), 'componentWillMount', this).call(this);
                }
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                this.validateProps(nextProps);

                if (_get(Object.getPrototypeOf(_class.prototype), 'componentWillReceiveProps', this)) {
                    _get(Object.getPrototypeOf(_class.prototype), 'componentWillReceiveProps', this).call(this, nextProps);
                }
            }
        }]);

        return _class;
    })(Component);
};

module.exports = exports['default'];