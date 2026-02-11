import { Router } from 'express';
import warehouseController from '@/controllers/warehouseController';
import { authenticateToken } from '@/middleware/auth';
import { validateWarehouseCreate, validateWarehouseUpdate, validatePagination } from '@/middleware/validation';

const router = Router();

router.use(authenticateToken);

router.get('/', 
  validatePagination,
  warehouseController.getAllWarehouses.bind(warehouseController)
);

router.get('/:id', 
  warehouseController.getWarehouseById.bind(warehouseController)
);

router.post('/', 
  validateWarehouseCreate,
  warehouseController.createWarehouse.bind(warehouseController)
);

router.put('/:id', 
  validateWarehouseUpdate,
  warehouseController.updateWarehouse.bind(warehouseController)
);

router.delete('/:id', 
  warehouseController.deleteWarehouse.bind(warehouseController)
);

router.patch('/:id/set-default', 
  warehouseController.setDefaultWarehouse.bind(warehouseController)
);

router.get('/:id/stock-levels', 
  validatePagination,
  warehouseController.getWarehouseStockLevels.bind(warehouseController)
);

export default router;