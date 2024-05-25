//Conexión por Pool

const { Pool } = require('pg')

const config = {
    database: process.env.DATABASE,
    host: process.env.HOST,
    user: process.env.USERDB,
    password: process.env.PASSWORD,
    port: process.env.PORT
}

const pool = new Pool(config)

//● Agregar un nuevo estudiante
//1. Hacer todas las consultas con un JSON como argumento del método query. 

const insertEstudiante = async () => {
    try {
        //Hacer las consultas con texto parametrizado
        const sql = 'INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [process.argv[3], process.argv[4], process.argv[5], Number(process.argv[6])];

        //Hacer todas las consultas con un JSON como argumento del método query. 
        const queryObject = {
            text: sql,
            values: values,
            rowMode: 'array'
        }

        const result = await pool.query(queryObject)
        //Capturar los posibles errores en todas las consultas e imprimirlos por consola.
        console.log(`Estudiante ${result.rows[0].nombre} agregado con éxito`)
    } catch (error) {
        console.error("Ha surgido un error", error)
    }
}

//Consultar los estudiantes registrados.
//Obtener el registro de los estudiantes registrados en formato de arreglos. 

const selectEstudiantes = async () => {
    try {
        const sql = 'SELECT * FROM estudiantes'

        const queryObject = {
            text: sql,
            //Formato
            values: [],
            rowMode: 'array'
        }

        const result = await pool.query(queryObject)
        //Mostrar en Formato
        console.log(result.rows)
    } catch (error) {
        console.error("Se ha encontrado un error", error)
    }
}

//Consultar estudiante por rut.

const selectEstudiante = async () => {
    try {
        //Hacer las consultas con texto parametrizado
        const sql = 'SELECT * FROM estudiantes WHERE rut = $1'
        const values = [process.argv[4]]

        const queryObject = {
            text: sql,
            values: values,
            rowMode: 'array'
        }

        //Capturar los posibles errores en todas las consultas e imprimirlos por consola.
        const result = await pool.query(queryObject)
        console.log(result.rows)
    } catch (error) {
        console.error(error)
    }
}

//Actualizar la información de un estudiante.

const updateEstudiante = async () => {
    try {
        const sql = 'UPDATE estudiantes SET nombre = $2 , curso = $3 , nivel = $4 WHERE rut = $1'
        const values = [process.argv[4], process.argv[3], process.argv[5], process.argv[6]]

        const queryObject = {
            text: sql,
            values: values,
            rowMode: 'array'
        }

        const result = await pool.query(queryObject)
        console.log(`Estudiante ${values[1]} editado con éxito`)
    } catch (error) {
        console.error("Ha surgido un error", error)
    }
}

//Eliminar el registro de un estudiante.
const deleteEstudiante = async () => {
    try {
        const sql = 'DELETE FROM estudiantes WHERE rut = $1'
        const values = [process.argv[4]]

        const queryObject = {
            text: sql,
            values: values,
            rowMode: 'array'
        }

        const result = await pool.query(queryObject)
        console.log(`Registro de estudiante con rut ${values} eliminado con éxito`)
    } catch (error) {
        console.error(error)
    }
}

//Menu de comandos
const inpt = process.argv[2];

switch (inpt) {
    case 'nuevo':
        insertEstudiante()
        break;
    case 'rut':
        selectEstudiante()
        break;
    case 'consulta':
        selectEstudiantes()
        break;
    case 'editar':
        updateEstudiante();
        break;
    case 'eliminar':
        deleteEstudiante();
        break;

    default:
        break;
} 
