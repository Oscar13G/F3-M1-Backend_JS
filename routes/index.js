const express = require('express')
const router = express.Router()

const authenticate = require('../middlewares/authentication')
router.use('/auth', require('./auth'))

router.use('/entidades', authenticate, require('./entidades'))
router.use('/marcas', authenticate, require('./marcas'))
router.use('/modelos', authenticate, require('./modelos'))
router.use('/placas', authenticate, require('./placas'))
router.use('/propietarios', authenticate, require('./propietarios'))
router.use('/roles', authenticate, require('./roles'))
router.use('/usuarios', authenticate, require('./usuarios'))
router.use('/vehiculos', authenticate, require('./vehiculos'))


module.exports = router