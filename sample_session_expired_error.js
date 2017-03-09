{ error: '[{"message":"Session expired or invalid","errorCode":"INVALID_SESSION_ID"}]',
  options:
   { url: 'https://pscnow.force.com/community/services/apexrest/FX5/ping?namespace=FX5',
     headers:
      { 'Content-Type': 'text/xml;charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36' },
     auth: { bearer: '123' },
     method: 'GET',
     callback: undefined,
     simple: true,
     resolveWithFullResponse: false },
  response:
   IncomingMessage {
     _readableState:
      ReadableState {
        objectMode: false,
        highWaterMark: 16384,
        buffer: [Object],
        length: 0,
        pipes: null,
        pipesCount: 0,
        flowing: true,
        ended: true,
        endEmitted: true,
        reading: false,
        sync: false,
        needReadable: false,
        emittedReadable: false,
        readableListening: false,
        resumeScheduled: false,
        defaultEncoding: 'utf8',
        ranOut: false,
        awaitDrain: 0,
        readingMore: false,
        decoder: null,
        encoding: null },
     readable: false,
     domain: null,
     _events:
      { end: [Object],
        close: [Object],
        data: [Function],
        error: [Function] },
     _eventsCount: 4,
     _maxListeners: undefined,
     socket:
      TLSSocket {
        _tlsOptions: [Object],
        _secureEstablished: true,
        _securePending: false,
        _newSessionPending: false,
        _controlReleased: true,
        _SNICallback: null,
        servername: null,
        npnProtocol: undefined,
        alpnProtocol: false,
        authorized: true,
        authorizationError: null,
        encrypted: true,
        _events: [Object],
        _eventsCount: 9,
        connecting: false,
        _hadError: false,
        _handle: null,
        _parent: null,
        _host: 'pscnow.force.com',
        _readableState: [Object],
        readable: false,
        domain: null,
        _maxListeners: undefined,
        _writableState: [Object],
        writable: false,
        allowHalfOpen: false,
        destroyed: true,
        _bytesDispatched: 308,
        _sockname: null,
        _pendingData: null,
        _pendingEncoding: '',
        server: undefined,
        _server: null,
        ssl: null,
        _requestCert: true,
        _rejectUnauthorized: true,
        parser: null,
        _httpMessage: [Object],
        read: [Function],
        _consuming: true,
        _idleNext: null,
        _idlePrev: null,
        _idleTimeout: -1 },
     connection:
      TLSSocket {
        _tlsOptions: [Object],
        _secureEstablished: true,
        _securePending: false,
        _newSessionPending: false,
        _controlReleased: true,
        _SNICallback: null,
        servername: null,
        npnProtocol: undefined,
        alpnProtocol: false,
        authorized: true,
        authorizationError: null,
        encrypted: true,
        _events: [Object],
        _eventsCount: 9,
        connecting: false,
        _hadError: false,
        _handle: null,
        _parent: null,
        _host: 'pscnow.force.com',
        _readableState: [Object],
        readable: false,
        domain: null,
        _maxListeners: undefined,
        _writableState: [Object],
        writable: false,
        allowHalfOpen: false,
        destroyed: true,
        _bytesDispatched: 308,
        _sockname: null,
        _pendingData: null,
        _pendingEncoding: '',
        server: undefined,
        _server: null,
        ssl: null,
        _requestCert: true,
        _rejectUnauthorized: true,
        parser: null,
        _httpMessage: [Object],
        read: [Function],
        _consuming: true,
        _idleNext: null,
        _idlePrev: null,
        _idleTimeout: -1 },
     httpVersionMajor: 1,
     httpVersionMinor: 1,
     httpVersion: '1.1',
     complete: true,
     headers:
      { date: 'Fri, 03 Mar 2017 13:30:31 GMT',
        'x-xss-protection': '1; mode=block',
        'content-security-policy': 'reflected-xss block;report-uri /_/ContentDomainCSPNoAuth?type=xss',
        'cache-control': 's-maxage=0',
        'set-cookie': [Object],
        expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
        'www-authenticate': 'Token',
        'content-type': 'application/json;charset=UTF-8',
        'transfer-encoding': 'chunked',
        connection: 'close' },
     rawHeaders:
      [ 'Date',
        'Fri, 03 Mar 2017 13:30:31 GMT',
        'X-XSS-Protection',
        '1; mode=block',
        'Content-Security-Policy',
        'reflected-xss block;report-uri /_/ContentDomainCSPNoAuth?type=xss',
        'Cache-Control',
        's-maxage=0',
        'Set-Cookie',
        'BrowserId=UJ-VXhwwRQ6cod_yiYOmGg;Path=/;Domain=.force.com;Expires=Tue, 02-May-2017 13:30:31 GMT',
        'Expires',
        'Thu, 01 Jan 1970 00:00:00 GMT',
        'WWW-Authenticate',
        'Token',
        'Content-Type',
        'application/json;charset=UTF-8',
        'Transfer-Encoding',
        'chunked',
        'Connection',
        'close' ],
     trailers: {},
     rawTrailers: [],
     upgrade: false,
     url: '',
     method: null,
     statusCode: 401,
     statusMessage: 'Unauthorized',
     client:
      TLSSocket {
        _tlsOptions: [Object],
        _secureEstablished: true,
        _securePending: false,
        _newSessionPending: false,
        _controlReleased: true,
        _SNICallback: null,
        servername: null,
        npnProtocol: undefined,
        alpnProtocol: false,
        authorized: true,
        authorizationError: null,
        encrypted: true,
        _events: [Object],
        _eventsCount: 9,
        connecting: false,
        _hadError: false,
        _handle: null,
        _parent: null,
        _host: 'pscnow.force.com',
        _readableState: [Object],
        readable: false,
        domain: null,
        _maxListeners: undefined,
        _writableState: [Object],
        writable: false,
        allowHalfOpen: false,
        destroyed: true,
        _bytesDispatched: 308,
        _sockname: null,
        _pendingData: null,
        _pendingEncoding: '',
        server: undefined,
        _server: null,
        ssl: null,
        _requestCert: true,
        _rejectUnauthorized: true,
        parser: null,
        _httpMessage: [Object],
        read: [Function],
        _consuming: true,
        _idleNext: null,
        _idlePrev: null,
        _idleTimeout: -1 },
     _consuming: true,
     _dumped: false,
     req:
      ClientRequest {
        domain: null,
        _events: [Object],
        _eventsCount: 5,
        _maxListeners: undefined,
        output: [],
        outputEncodings: [],
        outputCallbacks: [],
        outputSize: 0,
        writable: true,
        _last: true,
        chunkedEncoding: false,
        shouldKeepAlive: false,
        useChunkedEncodingByDefault: false,
        sendDate: false,
        _removedHeader: {},
        _contentLength: 0,
        _hasBody: true,
        _trailer: '',
        finished: true,
        _headerSent: true,
        socket: [Object],
        connection: [Object],
        _header: 'GET /community/services/apexrest/FX5/ping?namespace=FX5 HTTP/1.1\r\nContent-Type: text/xml;charset=UTF-8\r\nUser-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36\r\nhost: pscnow.force.com\r\nauthorization: Bearer 123\r\nConnection: close\r\n\r\n',
        _headers: [Object],
        _headerNames: [Object],
        _onPendingData: null,
        agent: [Object],
        socketPath: undefined,
        method: 'GET',
        path: '/community/services/apexrest/FX5/ping?namespace=FX5',
        _ended: true,
        parser: null,
        res: [Circular] },
     request:
      Request {
        domain: null,
        _events: [Object],
        _eventsCount: 5,
        _maxListeners: undefined,
        headers: [Object],
        method: 'GET',
        readable: true,
        writable: true,
        explicitMethod: true,
        _qs: [Object],
        _auth: [Object],
        _oauth: [Object],
        _multipart: [Object],
        _redirect: [Object],
        _tunnel: [Object],
        _rp_resolve: [Function],
        _rp_reject: [Function],
        _rp_promise: [Object],
        _rp_callbackOrig: undefined,
        callback: [Function],
        _rp_options: [Object],
        setHeader: [Function],
        hasHeader: [Function],
        getHeader: [Function],
        removeHeader: [Function],
        localAddress: undefined,
        pool: {},
        dests: [],
        __isRequestRequest: true,
        _callback: [Function: RP$callback],
        uri: [Object],
        proxy: null,
        tunnel: true,
        setHost: true,
        originalCookieHeader: undefined,
        _disableCookies: true,
        _jar: undefined,
        port: 443,
        host: 'pscnow.force.com',
        path: '/community/services/apexrest/FX5/ping?namespace=FX5',
        httpModule: [Object],
        agentClass: [Object],
        agent: [Object],
        _rp_promise_in_use: true,
        _started: true,
        href: 'https://pscnow.force.com/community/services/apexrest/FX5/ping?namespace=FX5',
        req: [Object],
        ntick: true,
        response: [Circular],
        originalHost: 'pscnow.force.com',
        originalHostHeaderName: 'host',
        responseContent: [Circular],
        _destdata: true,
        _ended: true,
        _callbackCalled: true },
     toJSON: [Function: responseToJSON],
     caseless: Caseless { dict: [Object] },
     read: [Function],
     body: '[{"message":"Session expired or invalid","errorCode":"INVALID_SESSION_ID"}]' },
  statusCode: 401 }