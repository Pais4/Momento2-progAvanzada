//===============================
//configuracion del puerto
//===============================

process.env.PORT = process.env.PORT || 3000;


//===============================
//cadena de conexion de base de datos
//===============================

process.env.CONEXIONDB = 'mongodb://localhost:27017/hotelwc';