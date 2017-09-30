'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PROXY_NETWORK_ADDRESS = exports.PROXY_ADDRESS = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _isOnline = require('is-online');

var _isOnline2 = _interopRequireDefault(_isOnline);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _requestPromiseNative = require('request-promise-native');

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

var _uuid = require('uuid');

var _ = require('./');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SERVICE_TEMPLATE = _fs2.default.readFileSync(_path2.default.resolve(__dirname, '..', 'views', 'service.tpl.html'), 'utf8');
var SOCKET_TEMPLATE = _fs2.default.readFileSync(_path2.default.resolve(__dirname, '..', 'views', 'socketio.tpl.html'), 'utf8');
var CACHE_HEADERS = ['vary', 'etag'];

var PROXY_ADDRESS = exports.PROXY_ADDRESS = process.env.PROXY_ADDRESS || (0, _utils.getIpAddress)('eth1') || 'localhost';
var PROXY_NETWORK_ADDRESS = exports.PROXY_NETWORK_ADDRESS = process.env.PROXY_NETWORK_ADDRESS || _os2.default.hostname();

var cookieJar = _requestPromiseNative2.default.jar();
var frameIds = 0;
var subIds = {};

/**
 * required to avoid certificate issues
 */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var Proxy = function () {
    function Proxy(app, backend) {
        (0, _classCallCheck3.default)(this, Proxy);

        this.log = (0, _logger2.default)('Proxy');
        this.log.info('Start proxy server on ' + PROXY_ADDRESS);
        this.app = app;
        this.backend = backend;
        this.uuid = (0, _uuid.v4)();

        /**
         * route all packages through server
         */
        this.app.use(this.requestIdMiddleware.bind(this));
        this.app.use(this.proxyFilter.bind(this));
        this.app.get('*', this.proxy.bind(this));
    }

    (0, _createClass3.default)(Proxy, [{
        key: 'proxy',
        value: function proxy(req, proxyRes) {
            var _this = this;

            delete req.headers['if-modified-since'];
            delete req.headers['if-none-match'];

            /**
             * check autoload settings
             */
            var _readConfig$data = (0, _utils.readConfig)().data,
                autoload = _readConfig$data.autoload,
                whitelist = _readConfig$data.whitelist;

            var cues = typeof whitelist === 'string' ? whitelist.split(',').map(function (f) {
                return f.trim();
            }) : [];
            if (autoload && !cues.find(function (cue) {
                return req.get('host').indexOf(cue) > -1;
            })) {
                this.log.info('Autoload URL found, redirecting to ' + autoload);
                return proxyRes.redirect(307, autoload);
            }

            var requestCall = (0, _requestPromiseNative2.default)({
                url: req.target,
                headers: req.headers,
                resolveWithFullResponse: true,
                time: true,
                /**
                 * decompress gzipped requests (excluding assets)
                 */
                gzip: (0, _utils.hasGzipEncoding)(req),
                jar: cookieJar
            });

            if (this.page) {
                this.page.frameNavigated(req.target, req.cookies.frameId);
                this.page.frameStartedLoading(req.target, req.cookies.frameId);
                this.backend.logRequest(this.page, req, requestCall);
            }

            if ((0, _utils.hasGzipEncoding)(req)) {
                delete req.headers['accept-encoding'];
            }

            /**
             * request app
             */
            this.log.info('request app at %s', req.target);
            requestCall.then(function (res) {
                return _this.handleResponse(res, proxyRes, req);
            }, function (e) {
                return _this.requestError(e, req.target);
            });
        }
    }, {
        key: 'handleResponse',
        value: function handleResponse(res, proxyRes, req) {
            var _this2 = this;

            var isHbbTVApp = res.headers['content-type'].match(/hbbtv/i);
            var $ = _cheerio2.default.load(res.body, { xmlMode: Boolean(isHbbTVApp) });
            var head = $('head');

            /**
             * propagate headers
             */
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(res.headers)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _ref = _step.value;

                    var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

                    var key = _ref2[0];
                    var value = _ref2[1];

                    /**
                     * all requested files get decompressed therefor ignore content encoding
                     */
                    if (key === 'content-encoding' && value === 'gzip' || CACHE_HEADERS.includes(key)) {
                        continue;
                    }
                    proxyRes.set(key, value);
                }

                /**
                 * transform asset sources so that the proxy can redirect them properly
                 */
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            $('script[src]').each(function (i, elem) {
                return _this2.transformAssetSources($(elem), res.req._headers.host, res.req.path, 'src');
            });
            $('link[href]').each(function (i, elem) {
                return _this2.transformAssetSources($(elem), res.req._headers.host, res.req.path, 'href');
            });
            $('img[src]').each(function (i, elem) {
                return _this2.transformAssetSources($(elem), res.req._headers.host, res.req.path, 'src');
            });

            /**
             * inject services
             */
            $(_ejs2.default.render(SERVICE_TEMPLATE, {
                uuid: this.uuid,
                name: 'DebuggerService',
                script: _fs2.default.readFileSync(_path2.default.resolve(__dirname, 'scripts', 'debugger.js'), 'utf8'),
                proxyAddress: PROXY_ADDRESS,
                proxyPort: _.DEFAULT_PORT
            })).prependTo(head);

            /**
             * inject socket.io script before everything else
             */
            $(_ejs2.default.render(SOCKET_TEMPLATE, {
                uuid: this.uuid,
                proxyAddress: PROXY_ADDRESS,
                proxyPort: _.DEFAULT_PORT
            })).prependTo(head);

            /**
             * create page if scripts get initially injected
             */
            if (!this.page) {
                this.page = this.backend.addPage({
                    uuid: this.uuid,
                    hostname: PROXY_NETWORK_ADDRESS + ':' + _.DEFAULT_PORT,
                    url: res.request.uri.href
                });
            } else {
                /**
                 * update url
                 */
                this.page.url = _url2.default.parse(res.request.uri.href);
            }

            var content = $.html();
            proxyRes.set('content-length', content.length);
            proxyRes.send(content);
        }
    }, {
        key: 'transformAssetSources',
        value: function transformAssetSources(elem, host, sourcePath, prop) {
            var src = elem.attr(prop);

            /**
             * don't modify anything if resource starts with http
             */
            if (!src || src.startsWith('http') || src.startsWith('//')) {
                return;
            }

            var newScriptSrc = void 0;
            if (src.startsWith('/')) {
                newScriptSrc = 'http://' + host + src;
            } else {
                newScriptSrc = 'http://' + host + _url2.default.resolve(sourcePath, src);
            }

            this.log.debug('Modified script src from ' + src + ' to ' + newScriptSrc);
            elem.attr(prop, newScriptSrc);
        }
    }, {
        key: 'requestError',
        value: function requestError(e, target) {
            var message = 'request to ' + target + ' failed:\n' + e.stack;
            this.log.error(new Error(message));
        }
    }, {
        key: 'requestIdMiddleware',
        value: function requestIdMiddleware(req, res, next) {
            var target = (0, _utils.getFullUrl)(req);

            /**
             * skip middleware for internal device requests
             */
            if (!req.headers['user-agent']) {
                return next();
            }

            /**
             * apply requestId to all request where frameId is not set or set new
             * frameId for requests with same request hosts
             */
            if (!req.cookies.frameId || req.cookies.requestIdHost === target) {
                var newFrameId = ++frameIds + '.1';
                var newRequestId = newFrameId + '00';

                req.cookies.frameId = newFrameId;
                req.cookies.requestId = newRequestId;
                res.cookie('frameId', newFrameId);
                res.cookie('requestId', newRequestId);
                res.cookie('requestIdHost', target);
                return next();
            }

            var frameId = req.cookies.frameId.split('.')[0];

            if (!subIds[frameId]) {
                subIds[frameId] = 1;
            }

            var subId = ++subIds[frameId];
            var requestId = frameId + '.' + subId;
            res.cookie('frameId', req.cookies.frameId);
            res.cookie('requestId', requestId);
            req.cookies.requestId = requestId;
            next();
        }

        /**
         * Sends a head request first to check if requested source is a web application.
         * If source is an HTML file forward to the proxy handler otherwise pipe response
         * directly to the proxy.
         */

    }, {
        key: 'proxyFilter',
        value: function proxyFilter(req, proxyRes, next) {
            var _this3 = this;

            req.target = (0, _utils.getFullUrl)(req);

            if (req.originalUrl === '/favicon.ico') {
                return (0, _serveFavicon2.default)(_path2.default.join(__dirname, '..', 'views', 'favicon.ico'));
            }

            /**
             * ignore all requests not comming from the browser
             * e.g. Netflix or internal manufacture requests
             */
            if (!req.headers['user-agent'] || req.get('host').indexOf(PROXY_ADDRESS.toLowerCase()) > -1) {
                var opts = (0, _utils.getRequestOpts)(req);

                if (req.method === 'POST') {
                    opts.headers['content-length'] = (0, _stringify2.default)(req.body).length;
                }

                var requestCall = (0, _requestPromiseNative2.default)(opts);
                requestCall.catch(function (err) {
                    return _this3.log.error('Internal request failed', req.target, err.message);
                });
                return requestCall.pipe(proxyRes);
            }

            _requestPromiseNative2.default.head(req.target).then(function (headers) {
                /**
                 * only proxy resource if content type is an HTML application
                 */
                var contentType = headers['content-type'];
                if (contentType && contentType.match(/(hbbtv|text\/html)/g) && (
                /**
                 * Don't register any new pages when the current page was loaded less than 1s ago.
                 * This way we avoid iFrames (such as Facebook widgets) to take over prority
                 */
                !_this3.page || !_this3.page.connectionDuration || _this3.page.connectionDuration > 5000)) {
                    return next();
                }

                var opts = (0, _utils.getRequestOpts)(req);
                var requestCall = (0, _requestPromiseNative2.default)(opts);

                /**
                 * only log request if from browser
                 */
                if (req.headers['user-agent'] && req.method.toLowerCase() === 'get') {
                    if (_this3.page) {
                        _this3.backend.logRequest(_this3.page, req, requestCall);
                    }
                    requestCall.catch(function (e) {
                        return _this3.requestError(e, req.target);
                    });
                } else {
                    requestCall.catch(function () {});
                }

                return requestCall.pipe(proxyRes);
            }, function (err) {
                _this3.log.error('Head request failed', req.target, err.message);
                return proxyRes.status(409).send(err.message || 'Not found');
            });
        }
    }, {
        key: 'preflightCheck',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.log.info('Starting preflight checks ...');

                                /**
                                 * check internet connectivity
                                 */
                                _context.next = 3;
                                return (0, _isOnline2.default)();

                            case 3:
                                if (_context.sent) {
                                    _context.next = 5;
                                    break;
                                }

                                throw new Error('Couldn\'t connect to the internet. Proxy requires an internet connection to work.');

                            case 5:

                                this.log.info('Preflight check successful');

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function preflightCheck() {
                return _ref3.apply(this, arguments);
            }

            return preflightCheck;
        }()
    }]);
    return Proxy;
}();

exports.default = Proxy;