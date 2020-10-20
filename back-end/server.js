const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3333;
const userApi = require('./Routes/Api/user/user');
const tagApi = require('./Routes/Api/tag/tag')
const expenseApi = require('./Routes/Api/expense/expense')
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(
    '/user',
    userApi
);
app.use('/expense',
    expenseApi
);

app.use('/tag',
    tagApi
);