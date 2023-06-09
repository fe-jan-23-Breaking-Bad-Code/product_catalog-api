import { Cart as CartModel } from '../models/cart.js';
import { Favourites as FavouritesModel } from '../models/favourites.js';
import { Order as OrderModel } from '../models/order.js';
import {
  OrderPosition as OrderPositionModel
} from '../models/orderPosition.js';
import { User as UserModel } from '../models/user.js';

    
function unpackData(responce) {
  return responce.map(item => item.dataValues);
}

function getValues(data) {
  const values = []; 
  data.forEach(obj => {
    values.push(...Object.values(obj));
  });

  return values;
}

export class UserService {
  getUser = async (userId: string): Promise<any[]> => {
    const user = await UserModel.findByPk(userId);

    return unpackData(user);
  };

  addUser = async (user) => {
    await UserModel.findOrCreate({
      where: {
        googleId: user.googleId,
      },
      defaults: {
        ...user,
      },
    });
  };

  getUserOrders = async (userId) => {
    const orders = await OrderModel.findAll({
      where: {
        userId
      },      
    });

    return unpackData(orders);
  };

  getOrderPositions = async (orderId) => {
    const orderPositions = await OrderPositionModel.findAll({
      where: {
        orderId
      },      
    });

    return unpackData(orderPositions);
  };

  addUserOrder = async (userId, order) => {
    const {
      total,
      data,
    } = order;

    const createdOrder = await OrderModel.create({
      userId,
      total,
    });

    const orderId = createdOrder.dataValues.id;

    await OrderPositionModel.bulkCreate(
      data.map(
        position => ({...position, orderId})
      ),
    );
  };

  clearUserFavourites = async (userId) => {
    FavouritesModel.destroy({
      where: {
        userId,
      },
    });
  };

  clearUserCart = async (userId) => {
    CartModel.destroy({
      where: {
        userId,
      },
    });
  };

  getUserFavourites = async (userId) => {
    const userFavourites = await FavouritesModel.findAll({
      where: {
        userId
      },      
    });

    return getValues(unpackData(userFavourites));
  };

  getUserCart = async (userId) => {
    const userCart = await CartModel.findAll({
      attributes: ['quantity', ['phoneId', 'id']],
      where: {
        userId
      },      
    });

    return unpackData(userCart);
  };

  saveUserFavourites = async (userId, favourites) => {
    await this.clearUserFavourites(userId);

    await FavouritesModel.bulkCreate(
      favourites.map(
        phoneId => ({ phoneId, userId})
      ),
    );
  };

  saveUserCart = async (userId, cart) => {
    await this.clearUserCart(userId);

    await CartModel.bulkCreate(
      cart.map(
        prod => ({...prod, userId})
      ),
    );
  };
  
}