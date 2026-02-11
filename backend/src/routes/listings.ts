import { Router } from 'express';
import listingController from '@/controllers/listingController';
import { authenticateToken } from '@/middleware/auth';
import { validateListingCreate, validateListingUpdate, validatePagination } from '@/middleware/validation';

const router = Router();

router.use(authenticateToken);

router.get('/', 
  validatePagination,
  listingController.getAllListings.bind(listingController)
);

router.get('/:id', 
  listingController.getListingById.bind(listingController)
);

router.post('/', 
  validateListingCreate,
  listingController.createListing.bind(listingController)
);

router.put('/:id', 
  validateListingUpdate,
  listingController.updateListing.bind(listingController)
);

router.delete('/:id', 
  listingController.deleteListing.bind(listingController)
);

router.post('/:id/publish', 
  listingController.publishListing.bind(listingController)
);

router.post('/:id/unpublish', 
  listingController.unpublishListing.bind(listingController)
);

router.post('/:id/sync', 
  listingController.syncListing.bind(listingController)
);

export default router;