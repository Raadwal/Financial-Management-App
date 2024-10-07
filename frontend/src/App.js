import Register from './components/Register'
import Login from './components/Login'
import RequireAuth from './components/RequireAuth'
import {Routes, Route, Navigate} from "react-router-dom"

import MainLayout from './components/MainLayout/MainLayout'
import SavingsGoals from './components/SavingsGoals'
import Categories from './components/Categories'
import Budgets from './components/Budgets'
import BudgetsExpenses from './components/BudgetsExpenses'
import AllExpenses from './components/AllExpenses'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="" element={<Navigate to="/login" replace />}/>

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* Secured routes */}
      <Route element={<RequireAuth />}>
        <Route path="/main" element={<MainLayout />}>
          <Route path="savings-goals" element={<SavingsGoals />} />
          <Route path="categories" element={<Categories />}>
            <Route path=":categoryId/budgets" element={<Budgets />} />
            <Route path=":categoryId/budgets/:budgetId/expenses" element={<BudgetsExpenses/>} />
            <Route path="expenses" element={<AllExpenses/>} />
          </Route>
        </Route>
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
