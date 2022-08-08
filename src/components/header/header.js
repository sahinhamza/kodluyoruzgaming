import { NavLink } from "react-router-dom"
import "./style.css"

export function Header() {
    return (
        <div className="header">
            <h1>KODLUYORUZ GAMING</h1>
            
            <nav>
                <NavLink to="/"> Home </NavLink>
                <NavLink to="/contact"> Contact </NavLink>
                <NavLink to="/about"> About </NavLink>
                
            </nav>
        </div>
    )
}