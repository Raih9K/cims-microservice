import { Router } from 'express';
import supplierController from '@/controllers/supplierController';
import { authenticateToken } from '@/middleware/auth';
import { validateSupplierCreate, validateSupplierUpdate, validatePagination } from '@/middleware/validation';

const router = Router();

router.use(authenticateToken);

router.get('/', 
  validatePagination,
  supplierController.getAllSuppliers.bind(supplierController)
);

router.get('/search', 
  supplierController.searchSuppliers.bind(supplierController)
);

router.get('/:id', 
  supplierController.getSupplierById.bind(supplierController)
);

router.get('/:id/purchase-orders', 
  validatePagination,
  supplierController.getSupplierPurchaseOrders.bind(supplierController)
);

router.post('/', 
  validateSupplierCreate,
  supplierController.createSupplier.bind(supplierController)
);

router.put('/:id', 
  validateSupplierUpdate,
  supplierController.updateSupplier.bind(supplierController)
);

router.delete('/:id', 
  supplierController.deleteSupplier.bind(supplierController)
);

export default router;