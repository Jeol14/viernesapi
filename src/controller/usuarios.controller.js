import { pool } from "../db.js";

export const getUsuarios=async(req, res) =>{
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios')
        res.send(rows)
    } catch (error) {
        return res.status(500).json({message: 'Ha ocurrido un error'})
    }
}
export const getUsuario=async(req, res) =>{
    const id=req.params.id
    try {
        const [rows]= await pool.query('SELECT * FROM usuarios WHERE id =?',[id])
        if (rows.length <= 0) return res.status(400).json({
            message: 'Usuario no registrado'
        })
        res.send(rows[0])
    } catch (error) {
        return res.status(500).json({message: 'Ha ocurrido un error'})
    }
}
export const createUsuario=async(req, res) =>{
    console.log(req.body);

    try {
        const [rows]=await pool.query('INSERT INTO usuarios (nombre,apellido,direccion) VALUES (?,?,?)',[nombre,apellido,direccion])
        console.log(rows);
        res.send({
            id:rows.insertId,nombre,apellido,direccion
        })
    } catch (error) {
        return res.status(500).json({message: 'Ha ocurrido un error'})
    }
}
export const updateUsuario=async(req, res) =>{
    const {id}=req.params
    const {nombre, apellido, direccion} = req.body
    try {
        const [result]=await pool.query('UPDATE usuarios SET nombre=IFNULL(?,nombre),apellido=IFNULL(?,apellido),direccion=IFNULL(?,direccion) WHERE id=?',[nombre,apellido,direccion,id])
        if(result.affectedRows<=0)return res.status(404).json({
            message:'Usuario no encontrado'
        })
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id=?',[id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message: 'Ha ocurrido un error'})
    }
}
export const deleteUsuario=async(req, res) =>{
    const {id}=req.params
    try {
        const [result]=await pool.query('DELETE FROM usuarios WHERE id=?',[id])    
        console.log(result);
        if(result.affectedRows<=0)return res.status(404).json({
            message:'Usuario no encontrado'
        })
        res.send(204)
    } catch (error) {
        return res.status(500).json({message: 'Ha ocurrido un error'})
    }
}