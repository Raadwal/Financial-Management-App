import { useState, useEffect, useCallback } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useCategory from "../hooks/useCategory";
import formatDate from "../hooks/formatDate";
import classes from "./css/ExpensesDisplay.module.css"

import ExpenseForm from "./Forms/ExpenseForm";
import { useParams } from "react-router-dom";


const BudgetsExpenses = () => {
    const CATEGORIES_URL = '/categories'

    const budgetId = useParams().budgetId;

    const { auth } = useAuth();
    const { category } = useCategory()
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false)
    const [elements, getAllElements] = useState([]);
    const [ budget, getBudget] = useState([]);
    const [editingExpenseElement, setEditingExpenseElement] = useState(null);

    const getBudgetElement = useCallback(async () => {
        try {
            const response = await axios.get(`${CATEGORIES_URL}/${category.id}/budget/${budgetId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`,
                }
            });
            getBudget(response.data);
        } catch (error) {
            console.error("Failed to fetch budget element:", error);
        }
    }, [auth.token, budgetId, category.id]);

    const getAllExpensesElements = useCallback(async () => {
        try {
            const response = await axios.get(`${CATEGORIES_URL}/${category.id}/expenses/filter?startDate=${formatDate(budget.startDate)}&endDate=${formatDate(budget.endDate)}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`,
                }
            });
            getAllElements(response.data);
        } catch (error) {
            console.error("Failed to fetch all expenses elements:", error);
        }
    }, [auth.token, budget.endDate, budget.startDate, category.id]);
    
    useEffect(() => {
        getBudgetElement();
    }, [getBudgetElement]);

    useEffect(() => {
        if (budget && budget.startDate && budget.endDate) {
            getAllExpensesElements();
        }
    }, [budget, getAllExpensesElements]);

    const modifyExpenseElement = (element) => {
        setEditingExpenseElement(element);
        setIsExpenseModalOpen(true);
    }

    const deleteElement = async (expenseId) => {
        try {
            await axios.delete(`${CATEGORIES_URL}/${category.id}/expense/${expenseId}`, {
                headers: {
                    "Authorization": `Bearer ${auth.token}`,
                },
            });
            getAllExpensesElements();
        } catch (error) {
            console.error("Failed to delete element: ", error)
        }
    }

    return (
        <div className={classes.container}>
            {isExpenseModalOpen && <ExpenseForm editingExpenseElement={editingExpenseElement} setIsExpenseModalOpen={setIsExpenseModalOpen} refreshData={getAllExpensesElements}/>}
            <div className={classes.headerSection}>
                <h1>Your expenses for Category: {category?.description}</h1>
                <h3>Budget from {formatDate(budget.startDate)} to {formatDate(budget.endDate)}</h3>
            </div>
            <div className={classes.infoSection}>
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {elements.map((element, index) => (
                            <tr key={index}>
                                <td>{element.description}</td>
                                <td>{element.amount}</td>
                                <td>{formatDate(element.date)}</td>
                                <td> <button className={classes.modifyBtn} onClick={() => modifyExpenseElement(element)}> Modify </button> </td>
                                <td> <button className={classes.deleteBtn} onClick={() => deleteElement(element.id)}> Delete </button> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )    
}

export default BudgetsExpenses