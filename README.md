# Back End Test Project <img src="https://coderockr.com/assets/images/coderockr.svg"  align="right"  height="50px"  />
## How to Start?
[#TODO: Add database]
1. Have [node](https://nodejs.org/en/) installed
2. Edit `ormconfig.env` file with your DB connection
3. `npm i` or `yarn` to install all dependencies
4. `npm run start` or `yarn start` to serve the app locally
## Technology stack
[#TODO: Select a database]
The application was write in **[typescript](https://www.typescriptlang.org/)** using
- [SQLite](https://sqlite.org/index.html), SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.
- [NestJs](https://nestjs.com/), a progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [TypeORM](https://typeorm.io/#/), a [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping) that can run in many platforms and can be used with TypeScript and JavaScript (newest ones).
## TODO LIST
- Create Investment (Owner, Date, Amount)
- Read all Investment
- Read one Investment (by id) (Show Initial Amount and Expected Balance `amount+gains`)
- Withdraw Investment (`amount+gains`)(apply Taxes)
- Get Investments of a owner with pagination