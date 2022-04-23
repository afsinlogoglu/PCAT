const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');

//controllers
const photoController = require('./controllers/photoControllers');

const pageController = require('./controllers/pageController');

const app = express();

//db connection
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//template engine
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//routes
app.get('/',photoController.getAllPhotos), 
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);
/********** */
app.get('/about', pageController.getAboutPage );
app.get('/addPhoto', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);
//server
const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi`);
});
