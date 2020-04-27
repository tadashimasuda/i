const db = require('../models/index');

//商品一覧
exports.index = (req, res) => {
    db.products.findAll().then((results) => {
        console.log(results)
        res.render('products', { products: results });
      });
}

//商品詳細
exports.show = (req, res) => {
    db.products.findByPk(req.params.id).then((results) => {
        res.render('product', { product: results });
      });
}
