import { useState, useEffect, useCallback  } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import classes from "./css/Display.module.css"

import SavingsGoalsForm from "./Forms/SavingsGoalsForm";

const SavingsGoals = () => {
    const SAVINGS_GOALS_URL = '/savings-goals'

    const { auth } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [elements, getAllElements] = useState([]);
    const [editingElement, setEditingElement] = useState(null);

    const getUserElements = useCallback(async () => {
        try {
            const response = await axios.get(SAVINGS_GOALS_URL, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`,
                }
            });
            getAllElements(response.data);
        } catch (error) {
            console.error("Failed to fetch user's savings goals:", error);
        }
    }, [auth.token]);

    useEffect(() => {
        getUserElements();
    }, [getUserElements]);

    const addElement = () => {
        setEditingElement(null)
        setIsModalOpen(true)
    }

    const modifyElement = (element) => {
        setEditingElement(element);
        setIsModalOpen(true)
    }

    const deleteElement = async (id) => {
        try {
            await axios.delete(`${SAVINGS_GOALS_URL}/${id}`, {
                headers: {
                    "Authorization": `Bearer ${auth.token}`,
                },
            });
            getUserElements();
        } catch (error) {
            console.error("Failed to delete element: ", error)
        }
    }

    return (
        <div className={classes.container}>
            {isModalOpen && <SavingsGoalsForm editingElement={editingElement} setIsModalOpen={setIsModalOpen} refreshData={getUserElements}/>}
            <div className={classes.headerSection}>
                <h1>Your savings goals</h1>
                <button className={classes.addBtn} onClick={addElement}>Add new saving goal</button>
            </div>
            <div className={classes.goalsSection}>
                <table>
                    <thead>
                        <tr>
                            <th>Goal Name</th>
                            <th>Current amount</th>
                            <th>Target amount</th>
                            <th>Date</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {elements.map((element, index) => (
                            <tr key={index}>
                                <td>{element.description}</td>
                                <td>{element.currentAmount}</td>
                                <td>{element.targetAmount}</td>
                                <td>{(() => {
                                        const date = new Date(element.targetDate);
                                        const year = date.getFullYear();
                                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                        const day = date.getDate().toString().padStart(2, '0');
                                        return `${year}-${month}-${day}`;
                                    })()}</td>
                                <td> <button className={classes.modifyBtn} onClick={() => modifyElement(element)}> Modify </button> </td>
                                <td> <button className={classes.deleteBtn} onClick={() => deleteElement(element.id)}> Delete </button> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )    
}

export default SavingsGoals