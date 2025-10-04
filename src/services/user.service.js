const { User } = require("../models");
const {status:httpStatus} = require("http-status");
const ApiError = require("../utils/ApiError");


const getUserById = async (id) =>{
// try{
const userResult = await User.findOne({"_id": id});
return userResult;
// }
// catch(err){

//     throw new ApiError(httpStatus.BAD_REQUEST, "\"\"userId\"\" must be a valid mongo id")

// }
}


const getUserByEmail = async (email) =>{
    try{
const userResult = await User.findOne({email:email})
return userResult
    }
    catch(err){
        throw new ApiError(httpStatus.BAD_REQUEST, "must be a valid email")
    }
}

const createUser = async(userBody)=>{
const {email,isAdmin=false} = userBody;

    const checkEmail = await User.isEmailTaken(email);
    if(checkEmail){
        throw new ApiError(httpStatus.OK, "Email already taken") 
    }
        // const salt = await bcrypt.genSalt();
        // const hashedPassword = await bcrypt.hash(password, salt);
        const result = await User.create({...userBody});
        // const result = await newUser.save();
        return result

}

const getUserAddressById = async (id) => {
    const address  = await User.findOne({_id:id},{address:1,email:1})
   return address;
};

const setAddress = async (user, newAddress) => {
  user.address = newAddress;
  await user.save();

  return user.address;
};

module.exports = {
    getUserById,
    getUserByEmail,
    createUser,
    getUserAddressById,
    setAddress,
}