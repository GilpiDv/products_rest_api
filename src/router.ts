import { Router } from "express"
import { body, param } from "express-validator";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
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

router.put('/:id',
    param('id').isInt().withMessage('Invalid id'),
    body('name')
        .notEmpty().withMessage('Name is required'),
    body('price')
        .notEmpty().withMessage('Price is required')
        .isNumeric().withMessage('Price must be a number')
        .custom(value => value > 0).withMessage('Invalid price'),
    body('available').isBoolean().withMessage("Invalid available value"),
    handleInputErrors, 
    updateProduct
)

router.patch('/:id', 
    param('id').isInt().withMessage('Invalid id'),
    handleInputErrors,    
    updateAvailability
)

router.delete('/:id', 
    param('id').isInt().withMessage('Invalid id'),
    handleInputErrors,
    deleteProduct
)

export default router