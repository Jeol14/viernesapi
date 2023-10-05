import express from 'express';
import usuariosRoutes from './routes/usuarios.routes.js'
import indexRoutes from './routes/index.routes.js'
const app=express()
//const port=3005
app.use(express.json())
app.use('/api',usuariosRoutes)
app.use(indexRoutes)
app.use((req, res, next)=>{
    res.status(404).json({
        message:'Endpoint not found'
    })
})
app.get('/', (req, res) =>{
    res.send("Hola desde express")
})
export default app;