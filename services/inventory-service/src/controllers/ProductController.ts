import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

export class ProductController {
  constructor(private service: ProductService) {}

  // Products
  createProduct = async (req: Request, res: Response) => {
    const result = await this.service.createProduct(req.body);
    res.status(201).json(result);
  };

  getAllProducts = async (req: Request, res: Response) => {
    const result = await this.service.getProducts(req.query);
    res.json(result);
  };

  getProductById = async (req: Request, res: Response) => {
    const result = await this.service.getProductById(req.params.id);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }
    res.json(result);
  };

  updateProduct = async (req: Request, res: Response) => {
    const result = await this.service.updateProduct(req.params.id, req.body);
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }
    res.json(result);
  };

  deleteProduct = async (req: Request, res: Response) => {
    const success = await this.service.deleteProduct(req.params.id);
    res.json({
      success,
      status: success ? 'success' : 'error',
      message: success ? 'Deleted' : 'Failed',
    });
  };

  // Warehouses
  getWarehouses = async (req: Request, res: Response) => {
    const result = await this.service.getWarehouses(
      Number(req.query.companyId),
    );
    res.json(result);
  };

  createWarehouse = async (req: Request, res: Response) => {
    const data = await this.service.createWarehouse(req.body);
    res.status(201).json({ success: true, status: 'success', data });
  };

  // Categories
  getCategories = async (req: Request, res: Response) => {
    const result = await this.service.getCategories();
    res.json(result);
  };

  // Brands
  getBrands = async (req: Request, res: Response) => {
    const result = await this.service.getBrands();
    res.json(result);
  };
}
