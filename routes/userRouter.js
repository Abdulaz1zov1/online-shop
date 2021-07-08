const router=require('express').Router();
const auth=require('../middleware/auth')
const {userCreate}=require('../controllers/userControllers')

router.post('/register', userCreate.register);

router.post('/login', userCreate.login);

router.get('/logout', userCreate.logout);

router.get('/refresh_token', userCreate.refreshToken);

// router.get('/:id', userGetById);

router.get('/infor',auth, userCreate.getUser);
router.patch('/addcart', auth, userCreate.addCart);
router.get('/history', auth, userCreate.history)

module.exports=router;