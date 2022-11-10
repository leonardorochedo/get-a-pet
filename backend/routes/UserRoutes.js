const router = require('express').Router()

const UserController = require('../controllers/UserController')

// middleware
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-upload')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)

// route need verified
router.patch(
    '/edit/:id', // rota
    verifyToken, // token de validacao
    imageUpload.single("image"), // mandando apenas uma para o helper salvar a imagem
    UserController.editUser // controller
)

module.exports = router