import { pool } from "../db.js";

// Controladores para la tabla de Ventas

export const getVentas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ventas');
        res.send(rows);
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error' });
    }
}

export const getVenta = async (req, res) => {
    const codigo = req.params.codigo;
    try {
        const [rows] = await pool.query('SELECT * FROM ventas WHERE codigo = ?', [codigo]);
        if (rows.length <= 0) return res.status(400).json({ message: 'Venta no registrada' });
        res.send(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error' });
    }
}

export const createVenta = async (req, res) => {
    console.log(req.body);
    const { codigoProducto, nombreCliente, telefono, FechaVenta, cantidadVendida, TotalVenta } = req.body;
    
    try {
        const [rows] = await pool.query('INSERT INTO ventas (codigoProducto, nombreCliente, telefono, FechaVenta, cantidadVendida, TotalVenta) VALUES (?, ?, ?, ?, ?, ?)', [codigoProducto, nombreCliente, telefono, FechaVenta, cantidadVendida, TotalVenta]);
        res.send({
            codigo: rows.insertId,
            codigoProducto,
            nombreCliente,
            telefono,
            FechaVenta,
            cantidadVendida,
            TotalVenta
        });
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error' });
    }
}

export const updateVenta = async (req, res) => {
    const { codigo } = req.params;
    const { codigoProducto, nombreCliente, telefono, FechaVenta, cantidadVendida, TotalVenta } = req.body;
    try {
        const [result] = await pool.query('UPDATE ventas SET codigoProducto=?, nombreCliente=?, telefono=?, FechaVenta=?, cantidadVendida=?, TotalVenta=? WHERE codigo=?', [codigoProducto, nombreCliente, telefono, FechaVenta, cantidadVendida, TotalVenta, codigo]);
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Venta no encontrada' });
        const [rows] = await pool.query('SELECT * FROM ventas WHERE codigo=?', [codigo]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error' });
    }
}

export const deleteVenta = async (req, res) => {
    const { codigo } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM ventas WHERE codigo=?', [codigo]);
        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Venta no encontrada' });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: 'Ha ocurrido un error' });
    }
}
