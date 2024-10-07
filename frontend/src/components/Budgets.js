import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useCategory from "../hooks/useCategory";
import formatDate from "../hooks/formatDate";
import classes from "./css/BudgetsDisplay.module.css"

import BudgetForm from "./Forms/BudgetForm";
import ExpenseForm from "./Forms/ExpenseForm";

const Budgets = () => {
    const BUDGETS_URL = '/categories'
    
    const { auth } = useAuth();
    const { category } = useCategory()
    const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false)
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false)
    const [elements, getAllElements] = useState([]);
    const [editingBudgetElement, setEditingBudgetElement] = useState(null);

    const navigate = useNavigate();

    const getBudgetElements = useCallback(async () => {
        try {
            const response = await axios.get(`${BUDGETS_URL}/${category.id}/budget`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`,
                }
            });
            getAllElements(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Failed to fetch budget elements:", error);
        }
    }, [auth.token, category.id]);

    useEffect(() => {
        getBudgetElements();
    }, [category, getBudgetElements]);

    const addBudgetElement = () => {
        setEditingBudgetElement(null)
        setIsBudgetModalOpen(true)
    }

    const modifyBudgetElement = (element) => {
        setEditingBudgetElement(element);
        setIsBudgetModalOpen(true)
    }

    const addExpenseElement = () => {
        setIsExpenseModalOpen(true)
    }

    const deleteElement = async (id) => {
        try {
            await axios.delete(`${BUDGETS_URL}/${category.id}/budget/${id}`, {
                headers: {
                    "Authorization": `Bearer ${auth.token}`,
                },
            });
            getBudgetElements();
        } catch (error) {
            console.error("Failed to delete element: ", error)
        }
    }

    const redirectToBudget = (budgetId) => {
        navigate(`${budgetId}/expenses`, { replace: true });
    }

    return (
        <div className={classes.container}>
            {isBudgetModalOpen && <BudgetForm editingBudgetElement={editingBudgetElement} setIsBudgetModalOpen={setIsBudgetModalOpen} refreshData={getBudgetElements}/>}
            {isExpenseModalOpen && <ExpenseForm setIsExpenseModalOpen={setIsExpenseModalOpen} refreshData={getBudgetElements}/>}
            <div className={classes.headerSection}>
                <h1>Your budgets for Category: {category?.description} </h1>
                <button className={classes.addBtn} onClick={addBudgetElement}>Add budget</button>
                <button className={classes.addBtn} onClick={addExpenseElement}>Add expense</button>
            </div>
            <div className={classes.infoSection}>
                <table>
                    <thead>
                        <tr>
                            <th>Current amount</th>
                            <th>Target amount</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {elements.map((element, index) => (
                            <tr key={index}>
                                <td>{element.currentAmount}</td>
                                <td>{element.targetAmount}</td>
                                <td>{formatDate(element.startDate)}</td>
                                <td>{formatDate(element.endDate)}</td>
                                <td> <button className={classes.showBtn} onClick={() => redirectToBudget(element.id)}> Expenses </button> </td>
                                <td> <button className={classes.modifyBtn} onClick={() => modifyBudgetElement(element)}> Modify </button> </td>
                                <td> <button className={classes.deleteBtn} onClick={() => deleteElement(element.id)}> Delete </button> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )    
}

export default Budgets