const Router = require('express')
const router =  new Router()
const MerchantController = require('../controllers/merchantcontroller')
const authMiddleweare = require('../middleware/authMiddleweare')

router.post('/registration',authMiddleweare, MerchantController.create)
router.post('/autorisation', MerchantController.create)



module.exports = router