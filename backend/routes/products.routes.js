
const router = require('express').Router()
const {standardLimiter} = require('../middleware/rateLimiter')
const validateObjectId = require('../middleware/validateObjectId')
const productController = require('../controllers/products.controllers')

router.get('/low-stock',standardLimiter, productController.getLowStockProducts)

router.post('/', productController.createProduct)

router.get('/',standardLimiter,productController.getAllProducts)

router.get('/:productId',standardLimiter,validateObjectId,productController.getProductbyId)

router.put("/:productId",validateObjectId, productController.updateProduct);

router.delete('/:productId', productController.deleteProduct)



module.exports = router