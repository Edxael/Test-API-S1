    // Importing Dependencies
// ========================================================================
const app = require('express')()
const db = require('mongoose')
const router = require('express').Router() 
const SingerTemplate   = require('./mySchema')
const bodyParser = require('body-parser')




    // Middleware to prepare data to send to DataBase
// ========================================================================
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('./headers'))




//     // Conection to DataBase
// // =====================================================================
db.connect('mongodb://master:Hkodoma48@ds125896.mlab.com:25896/courpath', (err) => {
    if(err){ console.log(err) }else { console.log("Conected to DataBase.") }
})




    // API-CRUD ROUTES
// // =====================================================================
app.use('/api/V1', router)    //  http://localhost:5000/api/V1/singers


router.route('/singers').post( (req, res) => {  // Create a new singer and save it on the db.
    const oneSinger = new SingerTemplate();      // create a new instance of the Singer model
    oneSinger.name = req.body.name
    // oneSinger.country = req.body.country
    // oneSinger.age = req.body.age

    oneSinger.save( (err) => {   // save the bear and check for errors
        if (err) { res.send(err) }
        res.json({ message: 'Record Created for singer: ' + oneSinger.name })
    })
})


router.route('/singers').get( (req, res) => {   // get all the singers (accessed at GET http://localhost:8080/api/singers)
    SingerTemplate.find( (err, allSingers) => {
        if (err) { res.send(err) }
        res.json(allSingers)
    })
})


router.route('/singers/:_id').get( (req, res) => {  // get ONE singer by id (accessed at GET http://localhost:8080/api/singers/:_id)
    SingerTemplate.findById(req.params._id, (err, oneSinger) => {
        if (err) { res.send(err) }
        res.json(oneSinger)
    })
})


router.route('/singers/:_id').put( (req, res) => {   // update the singer record with given id (accessed at PUT http://localhost:8080/api/singers/:_id)
    SingerTemplate.findById(req.params._id, (err, oneSinger) => {
        if (err) { res.send(err) }

        oneSinger.name = req.body.name;  
        oneSinger.save( (err) => {   
            if (err) { res.send(err) }
            res.json({ message: 'Singer Record updated!' })
        })
    })
})


router.route('/singers/:_id').delete( (req, res) => {  // delete a singer record using id (accessed at DELETE http://localhost:8080/api/singers/:_id)
    SingerTemplate.remove({
        _id: req.params._id
    }, (err, bear) => {
        if (err) { res.send(err) }
        res.json({ message: 'Singer Record Successfully deleted' })
    })
})




    // Server Listener
// =============================================================================
app.listen(5000, (err) => {
    if(err){ throw err }
    console.log(" \n Singers-API Up-&-Running...... \n ")
})




// app.get('/api/V1/', (req, res) => {
//     res.json("Hello from here")
// })