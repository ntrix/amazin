import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'admin',
      email: 'admin@admin.de',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
      isSeller: true,
      seller: {
        name: 'Puma',
        logo: '/images/logo1.png',
        description: 'best seller',
        rating: 4.5,
        numReviews: 120,
      },
    },
    {
      name: 'John',
      email: 'john@n.tn',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },
    {
      name: 'tester',
      email: 'tester1@n.tn',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },
  ],