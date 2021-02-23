const Products = [];

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
        return Products;
    } 
    

}