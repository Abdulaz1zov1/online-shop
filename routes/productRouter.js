const router=require('express').Router()
const  producControllers=require('../controllers/productController')
router.route('/products')
    .get(producControllers.getProducts)
    .post(producControllers.createProducts)

router.route('/products/:id')
    .delete(producControllers.deleteProducts)
    .put(producControllers.updateProducts)


module.exports=router;