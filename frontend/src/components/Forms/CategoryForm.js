import React, { useState } from 'react'
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useCategory from '../../hooks/useCategory';

import styles from '../css/FormModal.module.css'

const SavingsGoalsForm = ({ editingElement, setIsModalOpen,  refreshData }) =>{
    const BUDGETS_URL = '/categories'

    const { auth } = useAuth();
    const { setCategory } = useCategory();

    const [description, setDescription] = useState(editingElement ? editingElement.description : "");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            description: description,
        };

        try {
            if (editingElement) {
                await axios.put(`${BUDGETS_URL}/${editingElement.id}`, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${auth.token}`,
                    }
                });
                
                refreshData();
                setCategory(data)
            } else {
                await axios.post(BUDGETS_URL, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${auth.token}`,
                    }
                });

                refreshData();
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to save category:", error);
        }
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.formWrapper}>
                <h1>Category</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="description"> Goal: </label>
                    <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} autoComplete="off" required />
    
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