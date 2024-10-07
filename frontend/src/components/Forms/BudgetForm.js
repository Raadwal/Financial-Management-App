import React, { useState } from 'react'
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useCategory from '../../hooks/useCategory';
import formatDate from '../../hooks/formatDate';

import styles from '../css/FormModal.module.css'

const BudgetForm = ({ editingBudgetElement, setIsBudgetModalOpen,  refreshData }) =>{
    const CATEGORIES_URL = '/categories'

    const { auth } = useAuth();
    const {category } = useCategory();

    const [currentAmount, setCurrentAmount] = useState(editingBudgetElement ? editingBudgetElement.currentAmount : "0");
    const [targetAmount, setTargetAmount] = useState(editingBudgetElement ? editingBudgetElement.targetAmount : "");
    const [startDate, setStartDate] = useState(formatDate(editingBudgetElement ? editingBudgetElement.startDate : ""));
    const [endDate, setEndDate] = useState(formatDate(editingBudgetElement ? editingBudgetElement.endDate : ""));

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            currentAmount: currentAmount,
            targetAmount: targetAmount,
            startDate: startDate,
            endDate: endDate,
        };

        try {
            if (editingBudgetElement) {
                await axios.put(`${CATEGORIES_URL}/${category.id}/budget/${editingBudgetElement.id}`, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${auth.token}`,
                    }
                });
                
                refreshData();
            } else {
                await axios.post(`${CATEGORIES_URL}/${category.id}/budget`, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${auth.token}`,
                    }
                });

                refreshData();
            }
            setIsBudgetModalOpen(false);
        } catch (error) {
            console.error("Failed to save budget: ", error)
        }
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.formWrapper}>
                <h1>Budget</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="currentAmount"> Current amount: </label>
                    <input type="number" id="currentAmount" value={currentAmount} onChange={e => setCurrentAmount(e.target.value)} autoComplete="off" required disabled/>
    
                    <label htmlFor="targetAmount"> Target amount: </label>
                    <input type="number" id="targetAmount" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} autoComplete="off" required />
    
                    <label htmlFor="startDate"> Start date: </label>
                    <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} autoComplete="off" required />
    
                    <label htmlFor="endDate"> End date: </label>
                    <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} autoComplete="off" required />
    
                    <div className={styles.buttonsRow}>
                        <button type="button" onClick={() => setIsBudgetModalOpen(false)}>Close</button>
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
    
}

export default BudgetForm