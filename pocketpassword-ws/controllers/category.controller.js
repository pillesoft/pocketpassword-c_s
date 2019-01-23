const categModel = require('../models/category.model');

exports.list = function(req, res) {
    categModel.find((err, categs) => {
        if(err) return next(err);
        res.send(categs);

    });
    //res.render('categ_list');
};
exports.test = function(req, res) {
    res.send(process.env.MONGODB_URI + 'Hi! from Category controller');
};

exports.category_create = function(req, res) {
    console.log(req.body);

    let newcateg = new categModel ({
       name: req.body.categname,
       backgroundColor: req.body.categcolor
    });
    newcateg.save(function(err) {
        if(err) {
            return next(err);
        }
        res.send('category created');

    });
};