const mongoose = require('mongoose')

const connectMongo = (url) => {
    mongoose.connect(url)
        .then(() => console.log('Mongodb connected'))
        .catch((err) => console.log(err))
}

module.exports = connectMongo;