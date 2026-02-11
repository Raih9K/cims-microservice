import { Router } from 'express';
import dashboardController from '@/controllers/dashboardController';
import { authenticateToken } from '@/middleware/auth';

const router = Router();

router.use(authenticateToken);

router.get('/overview', 
  dashboardController.getDashboardOverview.bind(dashboardController)
);

router.get('/inventory', 
  dashboardController.getInventoryAnalytics.bind(dashboardController)
);

router.get('/sales', 
  dashboardController.getSalesAnalytics.bind(dashboardController)
);

router.get('/low-stock', 
  dashboardController.getLowStockItems.bind(dashboardController)
);

router.get('/top-selling', 
  dashboardController.getTopSellingItems.bind(dashboardController)
);

router.get('/channel-performance', 
  dashboardController.getChannelPerformance.bind(dashboardController)
);

export default router;