import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { JsonProductRepository } from '../repositories/JsonProductRepository';
import { ProductService } from '../services/ProductService';

const router = Router();

const repository = new JsonProductRepository();
const service = new ProductService(repository);
const controller = new ProductController(service);

// Products
router.post('/products', controller.createProduct);
router.get('/products', controller.getAllProducts);
router.get('/products/:id', controller.getProductById);
router.put('/products/:id', controller.updateProduct);
router.delete('/products/:id', controller.deleteProduct);

// Warehouses
router.get('/warehouses', controller.getWarehouses);
router.post('/warehouses', controller.createWarehouse);

// Categories, Brands, etc.
router.get('/categories', controller.getCategories);
router.get('/brands', controller.getBrands);

// Inventory specifics (can be expanded)
router.post('/inventory/update', controller.updateProduct); // Simple stock update for now

export default router;
