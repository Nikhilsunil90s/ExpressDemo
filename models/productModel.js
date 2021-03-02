const data = require('../utils/database');

module.exports = class Product {
    constructor(title , price, desc) {
        this.prodId = parseInt(Math.random() * 100); // 
        this.prodName = title;
        this.prodPrice = price;
        this.prodDescription = desc
    }

    save() {
        return data.execute('insert into nodetable (prodId , prodName, prodPrice, prodDesc) values (?,?,?,?)' , 
        [this.prodId, this.prodName , this.prodPrice , this.prodDescription])
    }

    static fetch() {
        return data.execute('select * from nodetable');
        } 
    
    static fetchById(id){
        return data.execute('select * from nodetable where prodId = ?' , [id,])
    }

}