import { Router } from 'express';
import brandController from '@/controllers/brandController';
import { authenticateToken } from '@/middleware/auth';
import { validateBrandCreate, validateBrandUpdate, validatePagination } from '@/middleware/validation';

const router = Router();

router.use(authenticateToken);

router.get('/', 
  validatePagination,
  brandController.getAllBrands.bind(brandController)
);

router.get('/:id', 
  brandController.getBrandById.bind(brandController)
);

router.post('/', 
  validateBrandCreate,
  brandController.createBrand.bind(brandController)
);

router.put('/:id', 
  validateBrandUpdate,
  brandController.updateBrand.bind(brandController)
);

router.delete('/:id', 
  brandController.deleteBrand.bind(brandController)
);

router.patch('/:id/toggle-status', 
  brandController.toggleBrandStatus.bind(brandController)
);

export default router;