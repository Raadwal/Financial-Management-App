import { useContext } from "react";
import CurrentCategoryContext from "../context/CategoryContext";

const useCategory = () => {
    return useContext(CurrentCategoryContext);
}

export default useCategory;