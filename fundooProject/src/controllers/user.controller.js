
import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';



/**
 * Controller to create a register new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */


export const registerUser = (req, res, next) => {
  try {
    UserService.registerUser(req.body, (error, data) => {
      if (error) {
        throw error;
      } else {
        res.status(HttpStatus.CREATED).json({
          code: HttpStatus.CREATED,
          data: data,
          message: 'User registered  successfully'
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Some error occurred while creating the Note." });
  }
};

//User Login
export const login = async (req, res, next) => {
  try {
    const data = await UserService.userLogin(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      token: data,
      message: 'User logined successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

//Forget password
export const forgetPassword = async (req, res, next) => {
  try {
    const data = await UserService.forgetPassword(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      token: data,
      message: 'You must have got the link to reset password'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};


//Reset password
export const resetPassword = async (req, res, next) => {
  try {
    const data = await UserService.resetPassword(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'You password is reset successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};


