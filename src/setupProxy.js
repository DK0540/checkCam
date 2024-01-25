const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // Proxy for "/api/pwa/list" path
  app.use(
    "/api/pwa/list",
    createProxyMiddleware({
      target: "http://sfamsserver.in",
      changeOrigin: true,
    })
  );

  // Proxy for "/api/pwa/save" path
  app.use(
    "/api/pwa/save",
    createProxyMiddleware({
      target: "http://sfamsserver.in",
      changeOrigin: true,
      onError: (err, req, res) => {
        console.error("Proxy Error:", err);
        res.status(500).send("Proxy Error");
      },
    })
  );

  // General proxy for "/api" path (if needed)
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://sfamsserver.in",
      changeOrigin: true,
    })
  );
};

////////////////////////////////////////////////////////////////////////old4 okay
// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use(
//     ["/api/pwa/list", "/api", "/api/pwa/save"],
//     createProxyMiddleware({
//       target: "http://sfamsserver.in",
//       changeOrigin: true,
//       pathRewrite: function (path, req) {
//         if (path.startsWith("/api/pwa/list")) {
//           return path + req.url;
//         }
//         if (path.startsWith("/api/pwa/save")) {
//           return path + req.url;
//         }
//         return path;
//       },
//     })
//   );
// };

//===============================================================================old3
// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use(
//     ["/api/pwa/list", "/api"], // Specify the paths you want to proxy
//     createProxyMiddleware({
//       target: "http://sfamsserver.in",
//       changeOrigin: true,
//       pathRewrite: function (path, req) {
//         if (path.startsWith("/api/pwa/list")) {
//           // If the path starts with /api/pwa/list, append the query parameter
//           return path + req.url;
//         }
//         return path;
//       },
//     })
//   );
// };

//save images:  http://sfamsserver.in/api/pwa/save

/////////////////////////////old2
// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use(
//     ["/api/pwa/list", "/api"], // Specify the paths you want to proxy
//     createProxyMiddleware({
//       target: "http://sfamsserver.in",
//       changeOrigin: true,
//     })
//   );
// };

///////old
///// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use(
//     "/api", // Specify the path you want to proxy
//     createProxyMiddleware({
//       target: "http://sfamsserver.in", // Specify the target API server
//       changeOrigin: true,
//     })
//   );
// };
