import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
    const user = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    req.body.UserID = user.email;
    next();
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: `${error}`
    });
  }
};

//Authentication for user who forgot password
export const resetAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    console.log(bearerToken);
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
    const user = await jwt.verify(bearerToken, process.env.PASSWORD_SECRET_KEY);
    if (!user) {
      console.log("Token is not valid");
    } else {
      req.body.email = user.email;
    }
    next();
  } catch (error) {
    next("Rest Auth", error);
  }
};
