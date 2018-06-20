const controllers = require('../controllers');
const restrictedPages = require('./auth');
const auth = require('./auth');


module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/about', controllers.home.about);
    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.post('/logout', controllers.user.logout);
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);

    //ADD OTHER REQUIRED ROUTES
    app.get('/cars/add', restrictedPages.hasRole('Admin'), controllers.admin.createCarView);
    app.post('/cars/add', restrictedPages.hasRole('Admin'), controllers.car.createCar);

    //Display cars
    app.get('/cars/all', controllers.car.allCars);
    app.get('/users/:id', controllers.car.myRentedCars);

    //Rent a car
    app.get('/cars/rent/:id', controllers.car.rentCarDetails);
    app.post('/cars/rent/:id', auth.isAuthed, controllers.car.rentCar);

    //Edit cars only for administrators
    app.get('/cars/edit/:id', restrictedPages.hasRole('Admin'), controllers.car.editCarVeiw);
    app.post('/cars/edit/:id', restrictedPages.hasRole('Admin'), controllers.car.editCar);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};