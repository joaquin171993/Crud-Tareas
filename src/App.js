import { isEmpty, size } from 'lodash';
import React, { useState, useEffect } from 'react'
import shortid from 'short-id'
import { getCollection } from './actions';
/*imr y tab para importar */


function App() {

    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [id, setId] = useState("")
    const [error, setError] = useState(null)

    /*Este metodo se va a ejecutar cuando la pagina carga */
    useEffect(() => {
        (async() => {
            const result = await getCollection("tasks");
            console.log(result);
        })()
    }, [])

    const validForm = () => {
        let isValid = true;
        setError(null);

        if (isEmpty(task)) {
            setError("Debes ingresar una tarea");
            isValid = false;
        }

        return isValid;

    }

    const addTask = (e) => {
        e.preventDefault();

        if (!validForm()) {
            return;
        }

        const newTask = {
            id: shortid.generate(),
            name: task
        }

        /*aca lo que se indica es que a la coleccion de tareas, se le agregara una nueva tarea*/
        setTasks([...tasks, newTask])
        setTask("")
        console.log(newTask)
    }

    const deleteTask = (id) => {
        const filteredTask = tasks.filter(task => task.id != id)
        setTasks(filteredTask)
    }

    const editTask = (task) => {
        setTask(task.name);
        setEditMode(true);
        setId(task.id);
        setError(null);
    }

    const saveTask = (e) => {
        e.preventDefault();

        if (!validForm()) {
            return;
        }

        /*recorre la lista, y procede a cambiar el elemento con el id indicado, le cambia el nombre */
        const editedTasks = tasks.map(item => item.id === id ? { id, name: task } : item)

        setTasks(editedTasks);

        setEditMode(false);
        setTask("")
        setId("")
    }

    return ( <
            div className = "container mt-5" >
            <
            h1 > Tareas < /h1> <
            hr className = "mt-2" / >
            <
            div className = "row" >
            <
            div className = "col-8" >
            <
            h4 className = "text-center" > Lista de Tareas < /h4> {

            size(tasks) === 0 ? ( <
                li className = "list-group-item" > Aún no hay tareas < /li>
            ) :
            ( <
                ul className = "list-group" > {
                    tasks.map((task) => (

                        <
                        li className = "list-group-item"
                        key = { task.id } >
                        <
                        span className = "lead" > { task.name } < /span> <
                        button className = "btn btn-danger btn-sm float-right mx-2"
                        onClick = {
                            () => deleteTask(task.id)
                        } > Eliminar < /button> <
                        button className = "btn btn-warning btn-sm float-right"
                        onClick = {
                            () => editTask(task)
                        } > Editar < /button> < /
                        li >

                    ))
                } <
                /ul>
            )
        } <
        /div> <
    div className = "col-4" >
        <
        h4 className = "text-center" > { editMode ? "Modificar Tarea" : "Agregar Tarea" } < /h4> <
    form onSubmit = { editMode ? saveTask : addTask } >
        <
        input type = "text"
    className = "form-control mb-2"
    placeholder = "Ingrese la tarea..."
    onChange = {
        (text) => setTask(text.target.value)
    }
    value = { task }
    /> <
    div className = "text-center my-4" > {
            error && < span className = "text-danger" > { error } < /span>
        } <
        /div>

    <
    button className = { editMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block" }
    type = "submit" > { editMode ? "Editar" : "Guardar" } <
        /button> < /
    form > <
        /div> < /
    div > <
        /div>
);
}

export default App;