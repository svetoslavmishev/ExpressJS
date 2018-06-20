const Car = require('./../models/Car');
const User = require('./../models/User');
const Rent = require('./../models/Rent');

module.exports = {
    createCar: (req, res) => {
        let data = req.body;

        let carObj = {
            brand: data.brand,
            model: data.model,
            year: data.year,
            carUrl: data.image,
            pricePerDay: data.price
        };

        Car
            .create(carObj)
            .then(car => {
                res.redirect('/');
            });
    },
    allCars: (req, res) => {
        let page = Number(req.query.page);

        Car
            .find({ rent: false })
            .skip(page * 3)
            .limit(3)
            .then(cars => {
                let previous = page - 1;
                let next = page + 1;

                if (previous < 0) {
                    previous = 0;
                }

                pages = {
                    previous,
                    next
                };

                res.render('cars/viewAll', { cars, pages });
            });
    },
    rentCarDetails: (req, res) => {
        let carId = req.params.id;

        Car
            .findById(carId)
            .then(car => {
                res.render('cars/carDetails', { car });
            });
    },
    rentCar: (req, res) => {
        let loggedUser = req.user.id;
        let carId = req.params.id;

        Car
            .findById(carId)
            .then(car => {
                car.rent = true;
                car.save().then(() => {
                    User.findById(loggedUser)
                        .then(user => {
                            let rentObj = {
                                car: car._id,
                                renter: user._id,
                                date: Date.now(),
                                days: Number(req.body.days)
                            };

                            Rent.create(rentObj)
                                .then(() => {
                                    res.redirect('/');
                                });
                        });
                });
            });
    },
    myRentedCars: (req, res) => {
        let loggedUser = req.params.id;
        let cars = [];

        Rent
            .find({ 'renter': loggedUser })
            .then(rentedCars => {
                for (const rentedCar of rentedCars) {
                    console.log(rentedCar);

                    Car
                        .findById(rentedCar.car)
                        .then((car) => {
                            car.days = rentedCar.days;
                            cars.push(car);
                            
                        });
                }

                res.render('users/profile', { cars });
            });
    },
    editCarVeiw: (req, res) => {
        let id = req.params.id;

        Car
            .findById(id)
            .then(car => {
                res.render('cars/edit', { car });
            }).catch(err => {
                res.redirect('/cars/all');
            });
    },
    editCar: (req, res) => {
        let id = req.params.id;
        let carObj = req.body;

        Car
            .findById(id)
            .then(car => {
                car.brand = carObj.brand;
                car.model = carObj.model;
                car.year = carObj.year;
                car.pricePerDay = Number(carObj.pricePerDay);
                car.image = carObj.carUrl;

                car.save()
                    .then(() => {
                        res.redirect('/cars/all');
                    }).catch(err => {
                        console.log(err);
                        res.render('cars/edit', { car });
                    });
            }).catch(err => {
                console.log(err);
                res.redirect('/cars/all');
            });
    }
};
