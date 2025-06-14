import { Router } from "express"
import { body, param } from "express-validator";
import { createProduct, getProductById, getProducts } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router(); 

// Routing
router.get('/', getProducts)
router.get('/:id', 
    param('id').isInt().withMessage('Invalid id'),
    handleInputErrors,
    getProductById
)

router.post('/', 
    body('name')
        .notEmpty().withMessage('Name is required'),
    body('price')
        .notEmpty().withMessage('Price is required')
        .isNumeric().withMessage('Price must be a number')
        .custom(value => value > 0).withMessage('Invalid price'),
    handleInputErrors,
    createProduct
)

router.put('/', (req, res) => {
    res.json("Desde put")
})

router.patch('/', (req, res) => {
    res.json("Desde patch")
})

router.delete('/', (req, res) => {
    res.json("Desde delete")
})

export default router