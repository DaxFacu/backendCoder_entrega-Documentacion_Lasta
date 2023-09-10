import { cartsMongo } from "../DAO/mongo/carts.mongo.js";

class CartsService {
  getAllCarts = async () => {
    const carts = await cartsMongo.getAllCarts();
    return carts;
  };

  createCart = async () => {
    const cartCreated = await cartsMongo.createCart({
      products: [],
      quantity: 0,
    });
    return cartCreated;
  };

  findCart = async (id) => {
    const cartFind = await cartsMongo.findCart(id);
    return cartFind;
  };

  updateCart = async (cid, products) => {
    const cartUpdated = await cartsMongo.updateCart(cid, products);
    return cartUpdated;
  };

  updateQuantityItemCart = async (cid, pid, quantity) => {
    const cartQuantityUpdated = await cartsMongo.updateQuantityItemCart(
      cid,
      pid,
      quantity
    );
    return cartQuantityUpdated;
  };

  deleteProductsCard = async (cid) => {
    const deleted = await cartsMongo.deleteProductsCard(cid);
    return deleted;
  };

  deleteProductsToCard = async (cid) => {
    const deleted = await cartsMongo.deleteProductsCard(cid);
    return deleted;
  };

  deleteCard = async (cid) => {
    const deleted = await cartsMongo.deleteCard(cid);
    return deleted;
  };
}

//   async deleteProductCard(cid, pid) {
//     const deletedProduct = await CartModel.findOneAndUpdate({
//       cid,
//       "products.pid": pid,
//     });
//     return deletedProduct;
//   }
// }

export const cartsService = new CartsService();
