import { param,body } from "express-validator";
import { validateResult } from "../middlewares/validation.middleware.js";

export const validateProducto = [
    /* "nombreProducto": "alfombrilla de vidrio",
    "idCategory": 2,
    "precio": "60.00",
    "available": 1 */
    body('nombreProducto')
        .trim()
        .notEmpty().withMessage('el campo nombre producto no debe ir vacio')
        .bail()
        .isLength({min:3}).withMessage('el campo nombre producto tiene que tener al menos 3 caracteres'),
    body('precio')
        .trim()
        .notEmpty().withMessage('el campo precio no debe ir vacio')
        .bail()
        .isDecimal().withMessage('el campo precio debe ser un numero decimal valido')
        .isFloat({min: 0.99}).withMessage('el campo precio debe tener un campo minimo de 0.99'),
    body('idCategory')
        .trim()
        .notEmpty().withMessage('el campo idProducto no debe ir vacio')
        .bail()
        .isInt().withMessage('el campo id debe ser un numero entero valido'),
    validateResult
]

export const validateID  = [
    param('id')
        .trim()
        .notEmpty().withMessage('el campo id no debe ir vacio')
        .bail()
        .isInt().withMessage('el campo id debe ser un numero entero valido'),
    validateResult
]