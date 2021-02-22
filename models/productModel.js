const Products = [];

module.exports = class Product {
    constructor(title , price) {
        this.prodName = title;
        this.prodPrice = price;
    }

    save() {
        Products.push(this);
        console.log(Products);
    }

    static fetch() {
        return Products;
    }

}