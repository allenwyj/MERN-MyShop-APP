import jwt from 'jsonwebtoken';

const generateToken = userId => {
  // append: userId property and generate token based on this
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

export default generateToken;
