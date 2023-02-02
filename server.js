const express = require('express')

const bodyParser = require('body-parser')

const MongoClient = require('mongodb').MongoClient

const app = express()

//Link to Database

MongoClient.connect('mongodb+srv://Quinta:canDo@cluster0.gha7hgm.mongodb.net/?retryWrites=true&w=majority', {
useUnifiedTopology: true })
    .then(client => { 

        console.log('Connected to Database')
        const db = client.db('abbott-elementary-quotes')
        const quotesCollection = db.collection('quotes')
        

        //Middlewares
        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
        app.use(express.static('public'))


        //Routes
        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
                .then(quotes => {
                    res.render('index.ejs', { quotes: results })
                })
                .catch(/* */)
        })

        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.put('/quotes', (req, res) => {

            quotesCollection.findOneAndUpdate(
                { name: 'Yoda' },
                {
                    $set: {
                        name: req.body.name,
                        quote: req.body.quote
                    }    
                },

                { 
                    upsert: true
                }
            )
                .then(result => res.json('Success'))
                .catch(error = console.error(error))
        })

        const deleteButton = document.querySelector('#delete-button')

        deleteButton.addEventListener('click', _ => {
            fetch('/quotes', {
                method: 'delete',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({
                    name: 'Darth Vader'
                })
            })
            .then(res => {
                if (res.ok) return res.json()
            })
            .then(data => {
                window.location.reload()
            })
        })

        app.delete('/quotes', (req, res) => {
            
            quotesCollection.deleteOne(
                { name: req.body.name },
            )
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.json('No quote to delete')
                }
                res.json(`Deleted Darth Vader's quote`)
            })
            .catch(error => console.error(error))

        })

        const messageDiv = document.querySelector('#message')

        deleteButton.addEventListener('click', _ => {
            fetch(/* */)
                .then(/* */)
                .then(response => {
                    if (response === 'No quote to delete') {
                        messageDiv.textContent = 'No Darth Vader quote to delete'
                    } else {
                        window.location(reload(true))
                    }
                })
                .catch(/* */)
        })
})


//Listen
app.listen(3000,function() {
    console.log('listening on 3000')
})