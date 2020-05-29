const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
          try {
                    const token = req.headers.authorization.split(' ')[1]; // on recupére le token(2eme élément du headers)
                    const decodedToken = jwt.verify(
                              token,
                              process.env.PASS_WORD
                    );
                    const userId = decodedToken.userId;
                    if (req.body.userId && req.body.userId !== userId) {  // si le userId est défferent de userId
                              throw "Invalid user ID";
                    } else {
                              next();
                    }
          } catch {
                    res.status(401).json({
                              error: new Error("Invalid request!"),
                    });
          }
};
