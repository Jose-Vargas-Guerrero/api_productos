import {
    getProductsModel,
    getProductByIDModel,
    createProductModel,
    updateProductoModel,
    updateAvailableStatusModel
} from '../models/store.model.js'

export const getProductos = async (req,res,next) => {
    try {
        const productos = await getProductsModel()
        res.json({success: true, data: productos})
    } catch (error) {
        next(error)
    }
}

export const getProductoByID = async (req,res,next) => {
    try {
        const {id} = req.params
        const producto = await getProductByIDModel(id)
        
        if (!producto) {
            return res.status(404).json({
                succes: false,
                message: 'producto no encontrado'
            })
        }
        res.json({success: true, data:producto})

    } catch (error) {
        next(error)
    }
}

export const createProducto = async (req,res,next) => {
    try {
        const nuevoEmpelado = await createProductModel(req.body)
        res.status(201).json({
            success: true,
            message: 'nuevo producto creado correctamente',
            id: nuevoEmpelado
        })
    } catch (error) {
        next(error)
    }
}


export const updateProducto = async (req,res,next) => {
    try {
        const {id} = req.params;
        const affectedRows = await updateProductoModel(id, req.body)
        if (affectedRows === 0) {
            return res.status(404).json({success:false, message: 'producto no encontrado'})
        }
        res.json({success:true, message: 'producto actualizado correctamente'})
    } catch (error) {
        next(error)
    }
}

export const deleteProducto = async (req,res,next) => {
   try {
    const {id} = req.params;
    const producto = await getProductByIDModel(id);
    if (!producto) {
        return res.status(400).json({
            success:false,
            message: 'producto no encontrado'
        })
    }
    const newState = producto.available === 1 ? 0 : 1;

    await updateAvailableStatusModel(id, newState)
    res.json({
        succes: true,
        message: `producto ${newState === 1 ? 'activado' : 'desactivado'} correctamente`,
        available: newState
    })
   } catch (error) {
    next(error)
   }
}