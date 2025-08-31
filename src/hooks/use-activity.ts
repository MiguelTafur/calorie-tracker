import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

export const useActivity = () => {
    const context = useContext(ActivityContext)
    if(!context) {
        throw new Error('useBudget must be used within a BudgetProvider')
    }
    return context
}