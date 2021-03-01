const data = require('../utils/database');

module.exports = class Product {
    constructor(title , price, desc) {
        this.prodId = parseInt(Math.random() * 100); // 
        this.prodName = title;
        this.prodPrice = price;
        this.prodDescription = desc
    }

    save() {
        Products.push(this);
        console.log(Products);
    }

    static fetch() {
        return data.execute('select * from nodetable')
                   .then(results => {
                        console.log(results[0]);
                    })
                    .catch(err => {
                        console.log(err);
                    });
        } 
    

}