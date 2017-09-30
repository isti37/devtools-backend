'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DEFAULT_PORT = exports.DEFAULT_HOST = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _backend = require('./backend');

var _backend2 = _interopRequireDefault(_backend);

var _proxy = require('./proxy');

var _proxy2 = _interopRequireDefault(_proxy);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_HOST = exports.DEFAULT_HOST = '0.0.0.0';
var DEFAULT_PORT = exports.DEFAULT_PORT = 9222;

var DEVTOOLS_PATH = _path2.default.resolve(__dirname, '..', 'node_modules', 'chrome-devtools-frontend', 'release');
var SCRIPT_PATH = _path2.default.resolve(__dirname, 'scripts');
var VIEWS_PATH = _path2.default.resolve(__dirname, '..', 'views');
var PAGES_TPL_PATH = _path2.default.resolve(VIEWS_PATH, 'pages.tpl.html');

var DevtoolsBackend = function () {
    function DevtoolsBackend() {
        var _this = this,
            _context;

        var host = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_HOST;
        var port = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_PORT;
        (0, _classCallCheck3.default)(this, DevtoolsBackend);

        this.host = host;
        this.port = port;
        this.log = (0, _logger2.default)();
        this.pages = [];

        this.app = (0, _express2.default)();

        /**
         * check runtime conditions
         */
        this.preflightCheck();

        /**
         * initialise external middleware
         */
        this.app.use(_bodyParser2.default.urlencoded({ extended: false }));
        this.app.use(_bodyParser2.default.json());
        this.app.set('view engine', 'ejs');
        this.app.set('views', VIEWS_PATH);
        this.app.engine('html', _ejs2.default.renderFile);
        this.app.use((0, _cookieParser2.default)());

        /**
         * enable cors
         */
        this.app.use((0, _cors2.default)());
        this.app.disable('etag');

        /**
         * paths
         */
        this.app.get('/', this.filterRequests(this.inspectablePages.bind(this)));
        this.app.get('/json', this.filterRequests(this.json.bind(this)));
        this.app.post('/register', this.filterRequests(this.register.bind(this)));
        this.app.use('/devtools', this.filterRequests(_express2.default.static(DEVTOOLS_PATH)));
        this.app.use('/scripts', this.filterRequests(_express2.default.static(SCRIPT_PATH)));

        /**
         * initialise socket server
         */
        this.server = this.app.listen(this.port, function () {
            return _this.log.info('Started devtools-backend server on ' + _this.host + ':' + _this.port);
        });

        /**
         * initialise socket.io server
         * this connection manages web socket traffic between frontend scripts and devtools-backend
         */
        this.io = (0, _socket2.default)(this.server, { origins: '*:*' });
        this.io.on('connection', function (socket) {
            socket.on('log', function (args) {
                return console.log.apply(console, args);
            }); // dev debugging only
            socket.on('error:injectScript', function (e) {
                return _this.log.error(e);
            });
        });

        /**
         * initialise Websocket Server
         * this connection manages web socket traffic between devtools-frontend and devtools-backend
         */
        this.backend = new _backend2.default(this.io);
        this.server.on('upgrade', (_context = this.backend).upgradeWssSocket.bind(_context));

        /**
         * init proxy if proxy address was found in environment
         */
        this.proxy = new _proxy2.default(this.app, this.backend);
        this.proxy.preflightCheck();
    }

    /**
     * Backend and Proxy share the same port, make sure we only proxy requests that are not
     * requested on port 9222. These requests are reserved for Backend specific pages
     */


    (0, _createClass3.default)(DevtoolsBackend, [{
        key: 'filterRequests',
        value: function filterRequests(view) {
            var _this2 = this;

            return function (req, res, next) {
                if (!_this2.proxy || req.get('host').endsWith(':' + DEFAULT_PORT)) {
                    return view(req, res, next);
                }

                next();
            };
        }
    }, {
        key: 'inspectablePages',
        value: function inspectablePages(req, res, next) {
            return res.sendFile(PAGES_TPL_PATH);
        }
    }, {
        key: 'register',
        value: function register(req, res) {
            /**
             * make sure response is not being cached
             */
            res.header('Surrogate-Control', 'no-store');
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Pragma', 'no-cache');
            res.header('Expires', '0');

            this.backend.addPage(req.body);
            return res.json({});
        }
    }, {
        key: 'json',
        value: function json(req, res) {
            res.setHeader('Content-Type', 'application/json');
            return res.send((0, _stringify2.default)(this.backend.pages.map(function (page) {
                var devtoolsPath = page.hostname + '/devtools/page/' + page.uuid;
                var title = page.title || (0, _utils.getDomain)(page.url);
                return {
                    description: page.description,
                    devtoolsFrontendUrl: '/devtools/inspector.html?ws=' + devtoolsPath,
                    title: title,
                    type: 'page',
                    url: page.url.href,
                    metadata: page.metadata,
                    webSocketDebuggerUrl: 'ws://' + devtoolsPath
                };
            }), null, 2));
        }
    }, {
        key: 'preflightCheck',
        value: function preflightCheck() {
            /**
             * preflight check: devtools-frontend was build
             */
            if (!_fs2.default.existsSync(DEVTOOLS_PATH)) {
                throw new Error('Devtools frontend not found. Run `npm run build` to compile.');
            }
        }
    }]);
    return DevtoolsBackend;
}();

exports.default = DevtoolsBackend;


if (require.main === module) {
    new DevtoolsBackend(); // eslint-disable-line no-new
}