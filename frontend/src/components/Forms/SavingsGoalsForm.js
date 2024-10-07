import React, { useState } from 'react'
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import formatDate from '../../hooks/formatDate';

import styles from '../css/FormModal.module.css'

const SavingsGoalsForm = ({ editingElement, setIsModalOpen,  refreshData }) =>{
    const SAVINGS_GOALS_URL = '/savings-goals'

    const { auth } = useAuth();

    const [description, setDescription] = useState(editingElement ? editingElement.description : "");
    const [currentAmount, setCurrentAmount] = useState(editingElement ? editingElement.currentAmount : "");
    const [targetAmount, setTargetAmount] = useState(editingElement ? editingElement.targetAmount : "");
    const [date, setDate] = useState(formatDate(editingElement ? editingElement.targetDate : ""));

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            description: description,
            currentAmount: currentAmount,
            targetAmount: targetAmount,
            targetDate: date,
        };

        try {
            if (editingElement) {
                await axios.put(`${SAVINGS_GOALS_URL}/${editingElement.id}`, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${auth.token}`,
                    }
                });
                
                refreshData();
            } else {
                await axios.post(SAVINGS_GOALS_URL, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${auth.token}`,
                    }
                });

                refreshData();
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to save saving goal:", error);
        }
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.formWrapper}>
                <h1>Saving Goal</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="description"> Goal: </label>
                    <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} autoComplete="off" required />
    
                    <label htmlFor="currentAmount"> Current amount: </label>
                    <input type="number" id="currentAmount" value={currentAmount} onChange={e => setCurrentAmount(e.target.value)} autoComplete="off" required />
    
                    <label htmlFor="targetAmount"> Target amount: </label>
                    <input type="number" id="targetAmount" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} autoComplete="off" required />
    
                    <label htmlFor="date"> Date: </label>
                    <input type="Date" id="date" value={date} onChange={e => setDate(e.target.value)} autoComplete="off" required />
    
                    <div className={styles.buttonsRow}>
                        <button type="button" onClick={() => setIsModalOpen(false)}>Close</button>
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
    
}

export default SavingsGoalsForm