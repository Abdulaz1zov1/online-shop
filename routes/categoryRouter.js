const router=require('express').Router()
const categoryControllers=require('../controllers/categoryController')
const auth=require('../middleware/auth')
const authAdmin=require('../middleware/authAdmin')

router.get('/category',categoryControllers.getCategorys)
router.post('/category/add',auth,authAdmin, categoryControllers.createCategory)

router.route('/category/:id')
    .delete(auth, authAdmin, categoryControllers.deleteCategory)
    .put(auth, authAdmin, categoryControllers.updateCategory)
    

module.exports=router