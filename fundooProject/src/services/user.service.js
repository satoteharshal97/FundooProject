import User from '../models/user.model';
import bcrypt from 'bcrypt';
import sendEmail from '../utils/user.util'
import jwt from 'jsonwebtoken';
import { sendToQueue } from '../utils/sender';



//create new user
export const registerUser = (body, callback) => {
  const saltRounds = 10
  bcrypt.genSalt(saltRounds, (error, salt) => {
    if (error) callback(error, null);
    else {
      bcrypt.hash(body.password, salt, (error, hash) => {
        if (error) callback(error, null);
        else {
          body.password = hash;
          User.create(body, (error, data) => {
            if (error) callback(error, null);
            else {
              callback(null, data);
              const value = JSON.stringify(data); //convert object to string
              sendToQueue(value);
              
            }
          })
        }
      })
    }
  })
}


//User login
/* //Promise Method
export const  userLogin = new Promise(userDetails, function(myResolve, myReject) {
  const data = await User.findOne({ email: userDetails.email });
  if(data){
    bcrypt.compare(userDetails.password, data.password, function (err, result) {
      if (result) {
        const token = jwt.sign({
          email: userDetails.email, password: userDetails.password,
          firstName: userDetails.firstName, lastName: userDetails.lastName
        },
          process.env.SECRET_KEY, { expiresIn: '1800s' });
        console.log(token);
        return token;
      } else {
        throw new Error(`Password doesnt match`);
      }
    });
  }
  else {
    throw new Error(`Email doesnt match`);
  }
  return data;
  });
  
  // "Consuming Code" (Must wait for a fulfilled Promise)
  myPromise.then(
    (value) => {console.log(value)},
    (error) => {console.log(error)},
    
  );
 */

//Async Wait  method working
export const userLogin = async (userDetails) => {
  const data = await User.findOne({ email: userDetails.email });
  if (data) {
    const result = await bcrypt.compare(userDetails.password, data.password)
    if (result === false) {
      throw new Error(`Password doesnt match`);
    }
    if (result === true) {
      const token = jwt.sign({
        email: userDetails.email,
        firstName: userDetails.firstName, id: userDetails._id
      }, process.env.SECRET_KEY);
      return token;
    }
  }
  else {
    throw new Error(`Email doesnt match`);
  }
};




//Forget Password
export const forgetPassword = async (userDetails) => {
  const data = await User.findOne({ email: userDetails.email });
  const email = userDetails.email;
  if (data) {
    const token = jwt.sign({ email: userDetails.email }, process.env.PASSWORD_SECRET_KEY);
    sendEmail(email, token);
    return token;
  }
  else {
    throw new Error(`Email does not exist`);
  }

};


//Reset Password
export const resetPassword = async (body) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const data = await User.findOneAndUpdate({ email: body.email },
      { password: hashedPassword });
    return data;
  } catch (error) {
    throw new Error("service error", error)
  }
};