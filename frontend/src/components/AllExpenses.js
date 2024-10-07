import { useState, useEffect, useCallback } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import formatDate from "../hooks/formatDate";
import classes from "./css/ExpensesDisplay.module.css"

import ExpenseForm from "./Forms/ExpenseForm";


const AllExpenses = () => {
    const EXPENSES_URL = '/expenses';
    const CATEGORIES_URL = '/categories';

    const { auth } = useAuth();
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
    const [elements, getAllElements] = useState([]);
    const [editingExpenseElement, setEditingExpenseElement] = useState(null);
    
    const getAllExpensesElements = useCallback(async () => {
        try {
            const response = await axios.get(`${EXPENSES_URL}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`,
                }
            });
            getAllElements(response.data);
        } catch (error) {
            console.error("Failed to fetch all expense elements:", error);
        }
    }, [auth.token]);
    
    const modifyExpenseElement = (element) => {
        setEditingExpenseElement(element);
        setIsExpenseModalOpen(true);
    };
    
    useEffect(() => {
        getAllExpensesElements();
    }, [getAllExpensesElements]);

    const deleteElement = async (expense) => {
        try {
            await axios.delete(`${CATEGORIES_URL}/${expense.category.id}/expense/${expense.id}`, {
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
                <h1>All expenses</h1>
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
                                <td> <button className={classes.deleteBtn} onClick={() => deleteElement(element)}> Delete </button> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )    
}

export default AllExpenses