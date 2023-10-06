import express from 'express';
import productosRoutes from './routes/productos.routes.js';
import ventasRoutes from './routes/ventas.routes.js'; 
import indexRoutes from './routes/index.routes.js';

const app = express();
const port = 3005;

app.use(express.json());
app.use('/api', productosRoutes); // Rutas para productos
app.use('/api/', ventasRoutes); // Rutas para ventas
app.use(indexRoutes);
app.get('/', (req, res) => {
  res.send('Hola desde express');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
