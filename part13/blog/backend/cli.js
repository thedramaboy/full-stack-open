require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

const main = async () => {
    try {
        await sequelize.authenticate()
        const blogs = await sequelize.query('SELECT * from blog', {type: QueryTypes.SELECT})

        blogs.forEach((blog) => {
            console.log(`${blog.author}: ${blog.title}, ${blog.likes} likes`)
        })

    } catch (error) {
        console.error("Unable to connect to the database:", error)
    }
}

main()