'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasGzipEncoding = hasGzipEncoding;
exports.getDomain = getDomain;
exports.getFullUrl = getFullUrl;
exports.getRequestOpts = getRequestOpts;
exports.getIpAddress = getIpAddress;

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hasGzipEncoding(req) {
    return Boolean(typeof req.headers['accept-encoding'] === 'string' && req.headers['accept-encoding'].includes('gzip'));
}

function getDomain(url) {
    return url.host.split('.').slice(-2).join('.');
}

function getFullUrl(req, page) {
    var target = req.originalUrl;

    if (!target.startsWith('/')) {
        return target;
    }

    return req.protocol + '://' + req.get('host') + target;
}

function getRequestOpts(req) {
    delete req.headers['if-modified-since'];
    delete req.headers['if-none-match'];
    var opts = {
        url: req.target,
        headers: req.headers,
        method: req.method,
        time: true,
        resolveWithFullResponse: true
    };

    if (req.method.toLowerCase() === 'post' && req.body) {
        opts.json = req.body;
    }

    return opts;
}

function getIpAddress(iface) {
    var family = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ipv4';

    var interfaces = _os2.default.networkInterfaces();

    /**
     * check if interface can be found
     */
    if (!interfaces[iface]) {
        return null;
    }

    return interfaces[iface].filter(function (conn) {
        return conn.family.toLowerCase() === family;
    })[0].address;
}