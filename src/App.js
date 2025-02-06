import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Counter from './components/Counter/Counter';
import UserForm from './components/UserForm/UserForm';
import Dashboard from './pages/Dashboard/Dashboard';
import Editor from './pages/Editor/Editor';
const App = () => {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/counter", element: _jsx(Counter, {}) }), _jsx(Route, { path: "/user-form", element: _jsx(UserForm, {}) }), _jsx(Route, { path: "/editor", element: _jsx(Editor, {}) })] }) }));
};
export default App; // <-- This line is crucial
