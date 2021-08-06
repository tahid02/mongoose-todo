const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  try {
    // for now ,as test, I have sent it in query parameter >> `http://localhost:3000/todo?auth=Bearer jwt-token`;
    // when one send token in GET query>>  const authorization = req.query.auth;

    const { authorization } = req.header;
    // console.log( authorization);

    /*user will send this token in header like >>.
     headers: {
        "content-type": "application/json",
        "authorization": Bearer the-token-server-provided
      },
    */
    // const token = authorization.split(" ")[1]; // taking only token
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IndpbGxpYW0iLCJ1c2VySWQiOiI2MTBhODViOGRkMjJkNDE1NzhjMjBlZGEiLCJpYXQiOjE2MjgyMzc4NDcsImV4cCI6MTYyODI0MTQ0N30.JXvBc_55zOiTMCQHhWnkjX62wRGfykJDml9fppmfFOU";
    console.log({ token });
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { userName, userId } = decoded;
    req.userName = userName;
    req.userId = userId;
    next(); // calling the next middleware
  } catch (error) {
    next(`authentication failed checkLogin ${error}`); // if we write something in next() .. that will consider as error message
  }
};
module.exports = checkLogin;
