import styled from "styled-components";
import { FaTrash } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { uniqueId } from "lodash";


//Create Task Configs
const CreateTaskContainer = styled.div`
    background-color: #373737;
    width: 60%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 180px;
    border-radius: 5px;
    border: 1px solid #303030;
    padding: 0 10px;
`;

const InputTask = styled.input`
    background-color: #303030;
    height: 40px;
    width: 100%;
    outline: none;
    border: none;
    color: white;
    border-radius: 5px;
    font-size: 1.5em;
    padding: 0 15px;
    box-sizing: border-box;

    &::placeholder {
        color: #6F6F6F;
    }

    &:focus {
        border: 1px solid #0090ff;
    }
`;

const BtnCreateTask = styled.button`
    width: 40px;
    height: 40px;
    min-width: 40px;
    background-color: #0090ff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 15px;
    font-size: 1.2em;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-image: linear-gradient(to right, #0090ff , #b310e8);
    }
`;

//Tasks Configs
const NameAndCheckContainer = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-arround;
`;

const TaskItem = styled.li`
    /*Cor da borda para tarefa concluída: #3dee4b*/
    width: 60%;
    border: 1px solid ${props => props.borderColor};
    padding: 0 10px;
    background-color: #373737;
    height: 60px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

/*
    cor para task completa: #6F6F6F;
    decoração para task completa: line-through;
*/
const TaskName = styled.span`
    border: 0 solid grey;
    width: 100%;
    height: 40px;
    font-size: 1.5em;
    color: ${props => props.cor};
    text-decoration: ${props => props.decoration};
    overflow: hidden;
    white-space: nowrap;
    margin: 5px 5px 0 15px;
`;

const CheckboxContainer = styled.label`
    position: relative;
    padding-left: 35px;
    margin-bottom: 27.5px;
    margin-left: 10px;
    cursor: pointer;
    
    // Condicional para o funcionamento do Checkbox
    input:checked ~ span {
        background-color: #0090ff;
    }
    
    span:after {
        content: '';
        position: absolute;
        display: none;
    }
    
    input:checked ~ span:after {
        display: block;
    }
`;

const Checkbox = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
`;

const Checkmark = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    border: 1px solid grey;
    border-radius: 5px;
    
    // Configurando nova aparência de Checkbox
    &:after {
        left: 8.5px;
        top: 3.5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
    }
`;

const DeleteTaskBtn = styled.button`
    width: 40px;
    height: 40px;
    background-color: transparent;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 15px;
    font-size: 1.2em;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    
    @keyframes colorTransition {
        0% {
            color: white;
            border: none;
        }
        
        100% {
            color: #D24545;
            border: 2px solid #D24545;
        }
    }
    
    &:hover {
        border: 2px solid #D24545;
        color: #D24545;
        animation: colorTransition .3s ease;
    }
`;

//Container configs
const ListContainer = styled.ul`
    width: 100%;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 15px;
`;

function TaskContainer() {

    const [createTask, setCreateTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const gerId = uniqueId();
    const [complete, setComplete] = useState(false);

    function handleCreateTask() {
        if (createTask === '' || createTask.length <= 0) {
            alert('Digite uma tarefa!');

        } else {
            const newTask = { title: createTask, id: gerId, isCompleate: false };
            setTasks([...tasks, newTask]);
            console.table(tasks);
            setCreateTask("");
        }
    }

    function handleToggleComplete(id) {
        const taskComplete = tasks.map(task => {
            if (task.id ===id) {
                return {...task, isCompleate: !task.isCompleate};
            }

            return task;
        })

        setTasks(taskComplete);
    }

    function handleDeleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    return (
        <>
            {/* Create Task */}
            <CreateTaskContainer>

                <InputTask
                    type="text"
                    placeholder="Create your task"
                    value={createTask}
                    onChange={(event) => {
                        setCreateTask(event.target.value);
                    }}
                />

                <BtnCreateTask onClick={handleCreateTask}>
                    <FaPlus />
                </BtnCreateTask>

            </CreateTaskContainer>

            {/* Task Container */}
            <ListContainer>
                {tasks.map(task =>
                    <TaskItem key={task.id} borderColor={task.isCompleate ? '#0090ff' : '#434343'}>
                        <NameAndCheckContainer>
                            <CheckboxContainer>
                                <Checkbox
                                    type='checkbox'
                                    onClick={() => handleToggleComplete(task.id)}
                                />
                                <Checkmark />
                            </CheckboxContainer>
                            <TaskName cor={task.isCompleate ? '#6F6F6F' : 'white'} decoration={task.isCompleate ? 'line-through' : 'none'}>
                                {task.title}
                            </TaskName>
                        </NameAndCheckContainer>

                        <DeleteTaskBtn onClick={() => handleDeleteTask(task.id)}>
                            <FaTrash />
                        </DeleteTaskBtn>
                    </TaskItem>)}
            </ListContainer>
        </>
    )
}

export default TaskContainer;