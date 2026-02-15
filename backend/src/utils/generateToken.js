import jwt from "jsonwebtoken";

export function generateToken(userId){
  const token = jwt.sign(
    {id : userId},
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_EXPIRES_IN}
  );

  return token;
};