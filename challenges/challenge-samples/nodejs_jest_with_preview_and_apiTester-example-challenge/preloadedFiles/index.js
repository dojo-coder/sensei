const http = require("http");

function createApiWrapper(newApi) {
  return {};
}

const newApi = {
  fetchUser: ({ userId }) => ({ id: userId, name: "John" }),
  updateUser: ({ userId, name }) => ({ success: true, id: userId, name }),
  removeUser: ({ userId }) => ({ deleted: true, id: userId }),
  getUsers: ({ page, limit }) => ({ users: ['Jhon', "Emily"], page, limit }),
};

const api = createApiWrapper(newApi);

/* Define routes for testing */
const ROUTES = {
  "/user/get": query => {
    const id = parseInt(query.get("id"), 10);
    return api.getUser(id);
  },
  "/user/save": query => {
    const id = parseInt(query.get("id"), 10);
    const name = query.get("name") || "Unknown";
    return api.saveUser(id, { name });
  },
  "/user/delete": query => {
    const id = parseInt(query.get("id"), 10);
    return api.deleteUser(id);
  },
  "/users/list": query => {
    const page = parseInt(query.get("page"), 10) || 1;
    const limit = parseInt(query.get("limit"), 10) || 10;
    return api.listUsers(page, limit);
  },
};

if (require.main === module) {
  http
    .createServer((req, res) => {
      const url = new URL(req.url, `http://${req.headers.host}`);

      if (url.pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
        <h1>API Wrapper Server</h1>
        <p>Test the following routes using API Tester:</p>
        <ul>
          <li>GET /user/get?id=1</li>
          <li>GET /user/save?id=1&name=Jane</li>
          <li>GET /user/delete?id=1</li>
          <li>GET /users/list?page=1&limit=10</li>
        </ul>
      `);
        return;
      }

      const handler = ROUTES[url.pathname];
      if (handler) {
        const result = handler(url.searchParams);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result, null, 2));
        return;
      }

      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not Found" }));
    })
    .listen(3000, () => console.log("Server running at http://localhost:3000"));
}

module.exports = { createApiWrapper };