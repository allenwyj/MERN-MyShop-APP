import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'Allen Wu',
    email: 'allen@example.com',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'Irene Lau',
    email: 'irene@example.com',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'Yujie Wu',
    email: 'yujie@example.com',
    password: bcrypt.hashSync('123456', 10)
  }
];

export default users;
