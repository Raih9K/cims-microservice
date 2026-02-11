import { Router } from 'express';
import { StockItemController } from '@/controllers/stockItemController';
import { validateRequest, stockItemSchema } from '@/middleware/validation';
import { authenticateToken } from '@/middleware/auth';

const router = Router();
const stockItemController = new StockItemController();

router.use(authenticateToken);

router.post('/', validateRequest(stockItemSchema), stockItemController.createStockItem);
router.get('/', stockItemController.getStockItems);
router.get('/:stockItemId', stockItemController.getStockItemById);
router.put('/:stockItemId', stockItemController.updateStockItem);
router.delete('/:stockItemId', stockItemController.deleteStockItem);
router.get('/:stockItemId/variants', stockItemController.getStockItemVariants);
router.post('/:stockItemId/variants', stockItemController.addStockItemVariant);

export default router;