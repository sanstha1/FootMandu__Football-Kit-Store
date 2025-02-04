import express from 'express';

import { productController } from '../../controller/index.js';

const router = express.Router();

router.get('/', productController.getAllProducts);

router.post('/', productController.createProduct);

router.post('/bulk', productController.saveAllProducts);

router.put('/:id', productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

router.get('/:id', productController.getProductById);

export { router as productRouter };
