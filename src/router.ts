import { Router } from "express"
import { body } from "express-validator";
import { createProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router(); 

// Routing
router.get('/', (req, res) => {
    res.json("Desde get")
})

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