import { Router } from 'express';
import channelController from '@/controllers/channelController';
import { authenticateToken } from '@/middleware/auth';
import { validateChannelCreate, validateChannelUpdate, validatePagination } from '@/middleware/validation';

const router = Router();

router.use(authenticateToken);

router.get('/', 
  validatePagination,
  channelController.getAllChannels.bind(channelController)
);

router.get('/:id', 
  channelController.getChannelById.bind(channelController)
);

router.post('/', 
  validateChannelCreate,
  channelController.createChannel.bind(channelController)
);

router.put('/:id', 
  validateChannelUpdate,
  channelController.updateChannel.bind(channelController)
);

router.delete('/:id', 
  channelController.deleteChannel.bind(channelController)
);

router.post('/:id/test-connection', 
  channelController.testChannelConnection.bind(channelController)
);

router.post('/:id/sync', 
  channelController.syncChannel.bind(channelController)
);

export default router;