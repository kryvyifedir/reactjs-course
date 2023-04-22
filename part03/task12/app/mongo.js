const mongoose = require('mongoose')

// if (!process.argv[4]) {
//     console.log('Phonenumber is empty');
//     process.exit(1)
// }
// if (!process.argv[3]) {
//     console.log('Contact name is empty');
//     process.exit(1)
// }
// if (!process.argv[2]) {
//     console.log('Password to mongo is empty');
//     process.exit(1)
// }

const password = process.argv[2]
const nameArg = process.argv[3]
const phoneArg = process.argv[4]

if (!password) {
    console.log('Password to mongo is empty');
    process.exit(1)
}

const url =
    "mongodb+srv://fedirkryvyi:" + password + "@cluster0.q8tyvap.mongodb.net/phonebook?retryWrites=true&w=majority"

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
    name: String,
    phone: String,
})

const PhonebookEntry = mongoose.model('PhonebookEntry', phonebookSchema)

if (!nameArg || !phoneArg) {
    PhonebookEntry.find({})
        .then(result => {
            result.forEach(phonebookEntry => {
                console.log(phonebookEntry)
            })
        })
        .finally(() => mongoose.connection.close())
} else {
    const entry = new PhonebookEntry({
        name: nameArg,
        phone: phoneArg,
    })

    entry.save()
        .then(result => {
            console.log('Phonebook Entry saved! Name: ' + nameArg + ' Phone: ' + phoneArg)
            mongoose.connection.close()
        })
        .finally(() => mongoose.connection.close())
}

