import {pool} from '../database/index.js';

export const getProductsModel = async () => {
    const query = `
    select p.idProducto , p.nombreProducto, p.idCategory, c.nombreCategoria as categoria, p.precio
    from productos p
    join categories c on p.idCategory = c.idCategory
    WHERE p.available = 1`;
    const [rows] = await pool.query(query)
    return rows
}


export const getProductByIDModel = async (id) => {
    const query = `SELECT * FROM productos where idProducto = ?`;
    const [rows] = await pool.query(query,[id])
    return rows[0];
}

export const createProductModel = async (productData) => {
    const {nombreProducto,idCategory,precio} = productData;
    const query = `INSERT INTO productos(nombreProducto,idCategory,precio)
                    values(?,?,?)`
    const [result] = await pool.query(query,[nombreProducto,idCategory,precio])
    return result.insertId
}

export const updateProductoModel = async (id,productoData) => {
    const {nombreProducto,idCategory,precio,available} = productoData;
    const query = `UPDATE productos set nombreProducto = ?, idCategory = ?, precio = ?, available = ? WHERE idProducto = ?`
    const [rows] = await pool.query(query, [nombreProducto,idCategory,precio,available,id])
    return rows.affectedRows;
}

export const updateAvailableStatusModel = async (id,newState) => {
    const query = `UPDATE productos SET available = ? WHERE idProducto = ?`;
    const [result] = await pool.query(query,[newState, id]);
    return result.affectedRows;
}