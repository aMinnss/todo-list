function Tasks({tasks, deleteButton, editButton, toggleComplete}) {
    return(
        <ul className="tasks">
            {tasks.map((task) => (
                <li key={task.id}>

                    <input type="checkbox" checked={task.isCompleted} onChange={() => toggleComplete(task.id)}/>

                    <span className={task.isCompleted ? "done" : ''}>
                        {task.taskItem}
                    </span>

                    <button onClick={() => editButton(task)}>
                        <img src="src/assets/icons/edit-svgrepo-com 1.svg" alt="" />
                    </button>
                    <button onClick={() => deleteButton(task.id)}>
                        <img src="src/assets/icons/trash-svgrepo-com 1.svg" alt="" />
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default Tasks