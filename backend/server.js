const path = require('path');
const express = require('express')
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const port = process.env.PORT || 8000

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use('/api/wishlist', require('./routes/userWishlistRoutes'))
//Server upload

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/netflix-frontend/build')));

    app.get('*', (req,res) => 
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend/netflix-frontend', 'build', 'index.html')
        )
    );
}
else{
    app.get('/', (req, res) => res.send('Please set to production'));
}
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))