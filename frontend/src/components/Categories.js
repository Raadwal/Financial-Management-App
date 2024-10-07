import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useCategory from "../hooks/useCategory";
import classes from "./css/Categories.module.css";
import CategoriesFormModal from "./Forms/CategoryForm"

import { Outlet } from "react-router-dom";

const Categories = () => {
    const CATEGORIES_URL = '/categories';

    const { auth } = useAuth();
    const { category, setCategory } = useCategory();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [elements, getAllElements] = useState([]);
    const [editingElement, setEditingElement] = useState(null);

    const navigate = useNavigate();

    const getCategoriesElements = useCallback(async () => { // Wrapped with useCallback
        try {
            const response = await axios.get(CATEGORIES_URL, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`,
                }
            });

            getAllElements(response.data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    }, [auth.token]);

    useEffect(() => {
        getCategoriesElements();
    }, [getCategoriesElements]);

    const modifyElement = (element) => {
        setEditingElement(element)
        setIsModalOpen(true)
    };

    const addElement = () => {
        setEditingElement(null);
        setIsModalOpen(true)
    };

    const deleteElement = async (id) => {
        try {
            await axios.delete(`${CATEGORIES_URL}/${id}`, {
                headers: {
                    "Authorization": `Bearer ${auth.token}`,
                },
            });
            getCategoriesElements();

            if(id === category.id) {
                navigate(``, { replace: true });
            }
        } catch (error) {
            console.error("Failed to delete element: ", error)
        }
    };

    const redirectToBudgets = (categoryId) => {
        setCategory(elements.find(element => element.id === categoryId));
        navigate(`${categoryId}/budgets`, { replace: true });
    }

    return (
        <div className={classes.container}>
            {isModalOpen && <CategoriesFormModal editingElement={editingElement} setIsModalOpen={setIsModalOpen} refreshData={getCategoriesElements}/>}
            <div className={classes.sidePanel}>
                <h3>Categories</h3> 
                <button className={classes.addBtn} onClick={() => addElement()}>Add category</button>
                <ul>
                    <li>
                        <div className={classes.categoryContent}>
                            <button className={classes.showBtwn} onClick={() => navigate(`/main/categories/expenses`, { replace: true })}>All expenses</button>
                        </div>
                    </li>
                    {elements.map((element, index) => (
                        <li key={index}>
                            <div className={classes.categoryContent}>
                                <button className={classes.showBtwn} onClick={() => redirectToBudgets(element.id)}>{element.description}</button>
                                <div className={classes.buttonsGroup}>
                                    <button className={classes.modifyBtn} onClick={() => modifyElement(element)}>Modify</button>
                                    <button className={classes.deleteBtn} onClick={() => deleteElement(element.id)}>Delete</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={classes.contentArea}>
                <Outlet />
            </div>
        </div>
    );
};

export default Categories;