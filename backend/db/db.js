const mongoose = require('mongoose');
const mongoURI = process.env.mongoURI;

const mongoDB = async ()=> {
    mongoose.set("strictQuery", true)
    mongoose.connect(mongoURI, async (err, result)=> {
        if(err) {
            console.log(err)
        }else {
            console.log('Connected to Database Successfully')

            const fetchdata = await mongoose.connection.db.collection('food_items');
            fetchdata.find().toArray(async function(err, data) {
                const foodCatgory = await mongoose.connection.db.collection('food_categories')
                foodCatgory.find().toArray(async function (err, catData) {
                    if(err) console.log(err)
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                })
            })
        }
    })
};

module.exports = mongoDB();