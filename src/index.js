const App = require('src/app/Application');

const app = new App();

app.start().catch((err) => {
  console.error(err);
  process.exit(1);
});
