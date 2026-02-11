import { Router } from 'express';
import purchaseOrderController from '@/controllers/purchaseOrderController';
import { authenticateToken } from '@/middleware/auth';
import { 
  validatePurchaseOrderCreate, 
  validatePurchaseOrderUpdate, 
  validatePagination 
} from '@/middleware/validation';

const router = Router();

router.use(authenticateToken);

router.get('/', 
  validatePagination,
  purchaseOrderController.getAllPurchaseOrders.bind(purchaseOrderController)
);

router.get('/:id', 
  purchaseOrderController.getPurchaseOrderById.bind(purchaseOrderController)
);

router.post('/', 
  validatePurchaseOrderCreate,
  purchaseOrderController.createPurchaseOrder.bind(purchaseOrderController)
);

router.put('/:id', 
  validatePurchaseOrderUpdate,
  purchaseOrderController.updatePurchaseOrder.bind(purchaseOrderController)
);

router.delete('/:id', 
  purchaseOrderController.deletePurchaseOrder.bind(purchaseOrderController)
);

router.post('/:id/receive', 
  purchaseOrderController.receivePurchaseOrder.bind(purchaseOrderController)
);

router.patch('/:id/status', 
  purchaseOrderController.updatePurchaseOrderStatus.bind(purchaseOrderController)
);

export default router;