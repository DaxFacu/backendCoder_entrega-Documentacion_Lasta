import { CartModel } from "./models/carts.model.js";

class CartsMongo {
  async getAllCarts() {
    const carts = await CartModel.find();
    return carts;
  }

  async createCart() {
    const cartCreated = await CartModel.create({
      products: [],
      quantity: 0,
    });
    return cartCreated;
  }

  async findCart(id) {
    const cartFind = await CartModel.findOne({ _id: id });
    return cartFind;
  }

  async updateCart(cid, products) {
    const cartUpdated = await CartModel.updateOne(
      { _id: cid },
      { products: { ...products } }
    );
    return cartUpdated;
  }

  async updateQuantityItemCart(cid, pid, quantity) {}

  async deleteCard(cid) {
    const deleted = await CartModel.updateOne({ _id: cid }, { products: [] });
    return deleted;
  }
}

//   async deleteProductCard(cid, pid) {
//     const deletedProduct = await CartModel.findOneAndUpdate({
//       cid,
//       "products.pid": pid,
//     });
//     return deletedProduct;
//   }
// }

export const cartsMongo = new CartsMongo();
