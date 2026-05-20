const bcrypt = require('bcryptjs');

const texto = process.argv[2];
if (!texto) {
  console.error('Uso: node scripts/hash.js <texto>');
  process.exit(1);
}

bcrypt.hash(texto, 10).then(hash => console.log(hash));
