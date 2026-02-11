import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { config } from '@/config';
import imageController from '@/controllers/imageController';
import { authenticateToken } from '@/middleware/auth';
import { validateImageUpload, validatePagination } from '@/middleware/validation';

const router = Router();
const upload = multer({
  dest: path.join(process.cwd(), config.upload.directory, 'temp'),
  limits: {
    fileSize: config.upload.maxFileSize,
  },
  fileFilter: (req, file, cb) => {
    if (config.upload.allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
});

router.use(authenticateToken);

router.get('/', 
  validatePagination,
  imageController.getAllImages.bind(imageController)
);

router.get('/storage-usage', 
  imageController.getUserStorageUsage.bind(imageController)
);

router.get('/:id', 
  imageController.getImageById.bind(imageController)
);

router.post('/',
  upload.single('image'),
  validateImageUpload,
  imageController.uploadImage.bind(imageController)
);

router.put('/:id', 
  validateImageUpload,
  imageController.updateImage.bind(imageController)
);

router.delete('/:id', 
  imageController.deleteImage.bind(imageController)
);

router.patch('/:id/set-main', 
  imageController.setMainImage.bind(imageController)
);

router.post('/reorder', 
  imageController.reorderImages.bind(imageController)
);

export default router;