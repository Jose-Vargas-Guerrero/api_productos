import { Router } from "express";
import {
    getProductos,
    getProductoByID,
    createProducto,
    updateProducto,
    deleteProducto
} from '../controllers/store.controllers.js'
import { validateProducto,validateID } from "../validators/producto.validator.js";

const router = Router();

router.get('/', getProductos)
router.get('/:id', validateID,getProductoByID)
router.post('/',validateProducto, createProducto)
router.put('/:id', updateProducto)
router.patch('/:id/toggle', deleteProducto)


export default router;