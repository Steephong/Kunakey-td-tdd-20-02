class Cube {
  constructor(length) {
    this.length = length;
  }

  getSideLength() {
    return this.length;
  }

  getSurfaceArea() {
    return this.length * this.length * 6;
  }

  getVolume() {
    return Math.pow(this.length, 3);
  }
}

class Cart {
  constructor() {
    this.products = [];
  }

  addProduct(product) {
    if (product && product instanceof Product) {
      this.products.push(product);
    } else {
      throw new Error("Invalid product");
    }
  }

  removeProduct(product) {
    if (this.products.length === 0) {
      throw new Error("Cart is empty");
    } else if (!this.products.includes(product)) {
      throw new Error("Product not found");
    } else {
      this.products = this.products.filter((p) => p !== product);
    }
  }

  clearCart() {
    this.products = [];
  }

  getTotal() {
    let total = 0;
    for (let product of this.products) {
      total += product.price;
    }
    return total;
  }
}

class Product {
  constructor(id, name, price, expirationDate) {
    if (typeof name !== "string" || typeof price !== "number") {
      throw new Error("Invalid product");
    }

    if (price < 0) {
      throw new Error("Invalid price");
    }

    this.id = id;
    this.name = name;
    this.price = price;
    this.expirationDate = expirationDate;
    this.discountUsed = [];
  }
}

class Stock {
  constructor() {
    this.products = [];
    this.history = [];
  }

  addProduct(product) {
    this.products.push(product);
    this.history.push({ time: new Date(), action: "add", product: product });
  }

  removeProduct(product) {
    const index = this.products.indexOf(product);
    if (index > -1) {
      this.products.splice(index, 1);
      this.history.push({ time: new Date(), action: "remove", product: product });
    }
  }

  removeExpiredProducts() {
    const currentDate = new Date();
    this.products = this.products.filter((p) => p.expirationDate > currentDate);
  }

  getQuantity() {
    return this.products.length;
  }

  getStockEvolution(startTime, endTime) {
    return this.history.filter((event) => event.time >= startTime && event.time <= endTime);
  }
}

class Discount {
  constructor(name, percent) {
    if (typeof percent !== "number") {
      throw new Error("Invalid percent");
    }
    if (percent < 0 || percent > 100) {
      throw new Error("Invalid percent");
    }

    this.name = name;
    this.percent = percent;
  }

  applyToProduct(product) {
    if (product.discountUsed.includes(this)) {
      throw new Error("Discount already used on this product");
    }

    let newPrice = product.price - product.price * (this.percent / 100);

    if (newPrice < 0) {
      throw new Error("Discounted price can't be negative");
    }

    product.price = newPrice;
    product.discountUsed.push(this);
  }

  applyToCart(cart) {
    if (cart.products.length === 0) {
      throw new Error("Cart is empty");
    }

    for (let product of cart.products) {
      if (!product.discountUsed.includes(this)) {
        let newPrice = product.price - product.price * (this.percent / 100);
        if (newPrice < 0) {
          throw new Error("Discounted price can't be negative");
        }
        product.price = newPrice;
        product.discountUsed.push(this);
      }
    }
  }
}

module.exports = {
  Cube: Cube,
  Cart: Cart,
  Product: Product,
  Stock: Stock,
  Discount: Discount,
};
