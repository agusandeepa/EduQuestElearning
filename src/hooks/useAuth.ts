// useAuth Hook - Now uses AuthContext for shared global state
// All components calling useAuth() share the same user state,
// so logout/login instantly updates the navbar, home page, and everywhere else.
export { useAuth } from '../contexts/AuthContext';
