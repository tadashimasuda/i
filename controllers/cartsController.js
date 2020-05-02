const db = require('../models/index');
const products = require('../models/index').products;
const purchases = require('../models/index').purchases;
exports.index = (req, res) => {
    // var userId = req.user.id;
    if(!req.user){
       res.redirect('/login');
    }
    var userId = req.user.id;
    console.log(userId)
    const filter = {
        where: {
            user_id: userId
        },
        include: [{
            model: db.products,
        }]
    }
    purchases.findAll(filter).then((results) => {
        res.render('cart/index', {purchases: results,user: req.user });
    });
}
exports.add = (req, res) => {
    //if文でamountに対する条件式を入れる。。数だけ＋する場合も想定する
    //amountは　purcheses.amount をデータ取得する(where(user_id,products_id))で履歴調査
    //.count()==0なら新規作成、.count()>0なら数字変更
    //まず、productsからidでデータ
    console.log('add')
    products.findOne({ where: { id: req.params.id } }).then((product) => {
        const params = {
            product_id: product.id,
            user_id: req.user.id,//固定
            price: product.price,
            amount: 1,
        };
        //全てのデータを調査
        var userId = req.user.id;//固定
        var amount_flg = 0;
        purchases.findAll().then((rows) => {
            console.log(rows.length)
            // for (var i = 1; i <= rows.length; i++) {
            //     purchases.findOne({ where: { user_id: userId, id: i } }).then((result) => {
            //         if (result.product_id == product.id) {
            //             result.update({
            //                 amount: row.amount + 1
            //             })
            //             amount_flg = 1;
            //         }
            //     })
            //     break;
            // }
            for (row in rows) {
                console.log('productId' + row.product_id)
                if (row.product_id == product.id) {
                    row.update({
                        amount: row.amount + 1
                    })
                    amount_flg = 1;
                    break;
                }
            }
            if (amount_flg == 0) {
                purchases.create(params).then((result) => {

                    console.log('add')
                    res.redirect('/products/' + req.params.id);
                });
            }
        });
    });
}
exports.confirm = (req, res) => {
    console.log('confirm')
    //ユーザーの一致するカート取得（all）
    var userId = req.user.id;
    const filter = {
        where: {
            user_id: userId
        },
        include: [{
            model: db.products,
        }]
    }
    purchases.findAll(filter).then((results) => {
        res.render('cart/confirm', { purchases: results });
    });
}

exports.finish = (req, res) => {
    //db 対象のレコード削除
    //stockでものがあるのか　ー＞　stock数合わせ
    // if (result && product) {
    //   product.update({
    //     stock: product.stock - amount
    //   })
    // }
    var userId = req.user.id
    db.purchases.destroy({ where: { user_id: userId } }).then(() => {
        res.render('cart/finish');
    });
}

exports.delete = (req, res) => {
    console.log('aaaa');
    db.purchases.destroy({ where: { id: req.param.id } }).then((results) => {
        res.redirect('/cart/index');
    });
}