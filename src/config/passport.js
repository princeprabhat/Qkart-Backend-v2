const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const config = require("./config");
const { tokenTypes } = require("./tokens");
const { User } = require("../models");


const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
  if(payload.type !== tokenTypes.ACCESS) return done(new Error("Invalid token type"));
  
    const userData =   await User.findById(payload.sub);
    
    if(!userData) return done(null,false);
    else return done(null,userData);
  } catch (err) {
    return done(err)
  }
};


const jwtStrategy = (passport)=>{
passport.use(new JwtStrategy(jwtOptions,jwtVerify));

}


module.exports = {
  jwtStrategy,
};

