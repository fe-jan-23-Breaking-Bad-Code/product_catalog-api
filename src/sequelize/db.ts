import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { Product } from './models/product.js';
import { Cell } from './models/cell.js';
import { Color } from './models/color.js';
import { Capacity } from './models/capacity.js';
import { Image } from './models/image.js';
import { Title } from './models/title.js';
import { Description } from './models/description.js';
import { User } from './models/user.js';
import { Order } from './models/order.js';
import { OrderPosition } from './models/orderPosition.js';
import { Favourites } from './models/favourites.js';
import { Cart } from './models/cart.js';
dotenv.config();

const { FULL_ADDRESS } = process.env;

export const connect = async () => {
  const sequelize = new Sequelize(
    FULL_ADDRESS,
    {
      dialectOptions: {
        ssl: true,
      },
      models: [
        Product,
        Cell,
        Color,
        Capacity,
        Image,
        Title,
        Description,
        User,
        Order,
        OrderPosition,
        Favourites,
        Cart,
      ]
    }
  );

  try {
    await sequelize.authenticate();

    // await Product.sync();
    // await Cell.sync();
    // await Color.sync();
    // await Capacity.sync();
    // await Image.sync();
    // await Title.sync();
    // await Description.sync();
    // await Favourites.drop();

    // await OrderPosition.drop();
    // await Cart.drop();

    // await User.sync();
    // await Order.sync();
    // await OrderPosition.sync();
    // await Favourites.sync();
    // await Cart.sync();

  } catch (error) {
    console.log(error);
  }

  return sequelize;
};
