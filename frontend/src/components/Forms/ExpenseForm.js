import React, { useState } from 'react'
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useCategory from '../../hooks/useCategory';
import formatDate from '../../hooks/formatDate';

import styles from '../css/FormModal.module.css'

const ExpenseForm = ({ editingExpenseElement, setIsExpenseModalOpen, refreshData, budgetObject }) =>{
    const CATEGORIES_URL = '/categories'

    const { auth } = useAuth();
    const {category} = useCategory();

    const [description, setDescription] = useState(editingExpenseElement ? editingExpenseElement.description : "");
    const [amount, setAmount] = useState(editingExpenseElement ? editingExpenseElement.amount : "");
    const [date, setDate] = useState(formatDate(editingExpenseElement ? editingExpenseElement.date : ""));

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            description: description,
            amount: amount,
            date: date,
        };

        try {
            if (editingExpenseElement) {
                await axios.put(`${CATEGORIES_URL}/${editingExpenseElement.category.id}/expense/${editingExpenseElement.id}`, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${auth.token}`,
                    }
                });
                setIsExpenseModalOpen(false);
                refreshData();
            } else {

                await axios.post(`${CATEGORIES_URL}/${category.id}/expense`, data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`,    
                    }
                });
                setIsExpenseModalOpen(false);
                refreshData();
            }
        }  catch (error) {
            console.error("Failed to save expense:", error);
        }
    }
        

    return (
        <div className={styles.overlay}>
            <div className={styles.formWrapper}>
                <h1>Expense</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="description"> Description: </label>
                    <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} autoComplete="off" required />
    
                    <label htmlFor="amount"> Amount: </label>
                    <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} autoComplete="off" required />
    
                    <label htmlFor="date"> Date: </label>
                    <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} autoComplete="off" required />
    
                    <div className={styles.buttonsRow}>
                        <button type="button" onClick={() => setIsExpenseModalOpen(false)}>Close</button>
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
    
}

export default ExpenseForm