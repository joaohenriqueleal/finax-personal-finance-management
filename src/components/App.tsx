import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"

import Globals from "../shared/Globals"

import Register from '../pages/Register'
import Login from "../pages/Login"
import Home from '../pages/Home'


export default function App() {
    const [authenticated, setAuthenticated] = useState<boolean>(false)

    useEffect(() => {
        setAuthenticated(Globals.authenticated)
    }, [])

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={authenticated ? <Home setAuth={setAuthenticated} /> :
                        <Navigate to="/registro" />
                    }
                />
                <Route
                    path="/registro"
                    element={authenticated ? <Navigate to="/" /> :
                        <Register setAuth={setAuthenticated} />
                    }
                />
                <Route
                    path="/login"
                    element={authenticated ? <Navigate to="/" /> :
                        <Login setAuth={setAuthenticated} />
                    }
                />
            </Routes>
        </Router>
    )
}
