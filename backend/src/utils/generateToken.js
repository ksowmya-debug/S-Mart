import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'sowmya_kcode_secret_key_2026', {
    expiresIn: '30d',
  });
};

export default generateToken;
