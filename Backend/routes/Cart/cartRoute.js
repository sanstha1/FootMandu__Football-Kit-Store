import express from 'express';
import { cartController } from '../../controller/index.js';

const router = express.Router();


router.get('/', cartController.getAllCartItems);

router.post('/', cartController.createCartItem);

router.post('/save', cartController.saveCartItem);

router.put('/:id', cartController.updateCartItem);

router.delete('/:id', cartController.deleteCartItem);

router.get('/:id', cartController.getCartItemById);

export { router as cartRouter };