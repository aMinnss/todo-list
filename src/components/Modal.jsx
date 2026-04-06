import { useEffect, useState } from "react"

function Modal({closeButton, applyButton, editTodos}) {

    const [taskItem, SetTaskItem] = useState('');

    useEffect(() => {
        SetTaskItem(editTodos?.taskItem || '');
    }, [editTodos]);
    
    const handleChange = (event) => {
        SetTaskItem(event.target.value)
    }

    return(
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <h1>NEW NOTE</h1>

                    <input 
                        type="text" 
                        placeholder="Input your note..."
                        value={taskItem}
                        onChange={handleChange}
                        
                    />
                </div>

                <div className="modal-buttons">
                    <button className="modalCancelBtn" onClick={closeButton}>CANCEL</button>
                    <button className="modalApplyBtn" onClick={() => applyButton(taskItem)}>APPLY</button>
                </div>
            </div>
        </div>
    )
}

export default Modal