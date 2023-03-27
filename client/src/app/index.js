import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import "./App.css";

import { Header } from '../components'
import { LeaderBoard, Login, Register, Game } from '../pages'


import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (

        <Router>
            <div className="container">
                <Header/>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/leaderboard" element={<LeaderBoard />} />               
                </Routes>
            </div>
        </Router>
    )
}

export default App