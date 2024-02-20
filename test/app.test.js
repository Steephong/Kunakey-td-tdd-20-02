const Cube = require("../src/app").Cube;
const Cart = require("../src/app").Cart;
const Product = require("../src/app").Product;
const Stock = require("../src/app").Stock;
const Discount = require("../src/app").Discount;
const expect = require("chai").expect;

describe("Testing the Cube Functions", function () {
  it("1. The side length of the Cube", function (done) {
    let c1 = new Cube(2);
    expect(c1.getSideLength()).to.equal(2);
    done();
  });

  it("2. The surface area of the Cube", function (done) {
    let c2 = new Cube(5);
    expect(c2.getSurfaceArea()).to.equal(150);
    done();
  });

  it("3. The volume of the Cube", function (done) {
    let c3 = new Cube(7);
    expect(c3.getVolume()).to.equal(343);
    done();
  });
});

describe("Testing the Cart Functions", function () {
  it("1. Adding a product to the Cart", function (done) {
    let cart = new Cart();
    let product = new Product(0, "Apple", 1);

    cart.addProduct(product);

    expect(cart.products.length).to.equal(1);
    done();
  });

  it("2. Removing a product from the Cart", function (done) {
    let cart = new Cart();
    let p1 = new Product(0, "Apple", 10);
    let p2 = new Product(1, "Banana", 25);

    cart.addProduct(p1);
    cart.addProduct(p2);
    cart.removeProduct(p1);

    expect(cart.products.length).to.equal(1);
    done();
  });

  it("3. Clearing the Cart", function (done) {
    let cart = new Cart();
    let p1 = new Product(0, "Apple", 12);
    let p2 = new Product(1, "Banana", 25);
    let p3 = new Product(2, "Cherry", 30);

    cart.addProduct(p1);
    cart.addProduct(p2);
    cart.addProduct(p3);

    cart.clearCart();

    expect(cart.products.length).to.equal(0);
    done();
  });

  it("4. Getting the total price of the Cart", function (done) {
    let cart = new Cart();
    let p1 = new Product(0, "Apple", 12);
    let p2 = new Product(1, "Banana", 20);
    let p3 = new Product(2, "Cherry", 35);

    cart.addProduct(p1);
    cart.addProduct(p2);
    cart.addProduct(p3);

    expect(cart.getTotal()).to.equal(67);
    done();
  });

  // it("5. Adding a product that is not a Product object", function (done) {
  //   let cart = new Cart();
  //   let product = { name: "Apple", price: 1 };
  //   cart.addProduct(product);
  //   expect(() => cart.addProduct(product)).to.throw("Invalid product");
  //   done();
  // });

  // it("6. Removing a product that is not in the Cart", function (done) {
  //   let cart = new Cart();
  //   let p1 = new Product("Apple", 12);
  //   let p2 = new Product("Banana", 20);
  //   cart.addProduct(p2);
  //   expect(() => cart.removeProduct(p1)).to.throw("Product not found");
  //   done();
  // });
});

describe("Testing the Product Functions", function () {
  it("1. The name of the Product", function (done) {
    let p1 = new Product(0, "Apple", 12);
    expect(p1.name).to.equal("Apple");
    done();
  });

  it("2. The price of the Product", function (done) {
    let p2 = new Product(0, "Banana", 20);
    expect(p2.price).to.equal(20);
    done();
  });

  it("3. Discounted price of the Product", function (done) {
    let p3 = new Product(0, "Cherry", 35);
    let discount = new Discount("Christmas", 10);
    discount.applyToProduct(p3);
    expect(p3.price).to.equal(31.5);
    done();
  });
});

describe("Testing stock functions", function () {
  it("1. Adding a product to the stock", function (done) {
    let stock = new Stock();
    let product = new Product(0, "Apple", 1);

    stock.addProduct(product);

    expect(stock.products.length).to.equal(1);
    done();
  });

  it("2. Removing a product from the stock", function (done) {
    let stock = new Stock();
    let p1 = new Product(0, "Apple", 10);
    let p2 = new Product(1, "Banana", 25);

    stock.addProduct(p1);
    stock.addProduct(p2);
    stock.removeProduct(p1);

    expect(stock.products.length).to.equal(1);
    done();
  });

  it("3. Get quantity of the stock", function (done) {
    let stock = new Stock();
    let p1 = new Product(0, "Apple", 12);
    let p2 = new Product(1, "Banana", 20);
    let p3 = new Product(2, "Cherry", 35);

    stock.addProduct(p1);
    stock.addProduct(p2);
    stock.addProduct(p3);

    expect(stock.getQuantity()).to.equal(3);
    done();
  });

  it("4. Get history of the stock", function (done) {
    let stock = new Stock();
    let p1 = new Product(0, "Apple", 12);
    let p2 = new Product(1, "Banana", 20);
    let p3 = new Product(2, "Cherry", 35);

    stock.addProduct(p1);
    stock.addProduct(p2);
    stock.addProduct(p3);
    stock.removeProduct(p1);

    expect(stock.history.length).to.equal(4);
    done();
  });
});

describe("Testing the Discount Functions", function () {
  it("1. Create a discount", function (done) {
    let discount = new Discount("Christmas", 10);
    expect(discount.name).to.equal("Christmas");
    expect(discount.percent).to.equal(10);
    done();
  });

  it("2. Apply a discount to a product", function (done) {
    let p1 = new Product(0, "Apple", 100);
    let discount = new Discount("Christmas", 10);
    discount.applyToProduct(p1);
    expect(p1.price).to.equal(90);
    done();
  });

  it("3. Apply discount to cart", function (done) {
    let cart = new Cart();
    let p1 = new Product(0, "Apple", 100);
    let p2 = new Product(1, "Banana", 20);
    let discount = new Discount("Christmas", 10);
    cart.addProduct(p1);
    cart.addProduct(p2);
    discount.applyToCart(cart);
    expect(cart.getTotal()).to.equal(108);
    done();
  });
});
