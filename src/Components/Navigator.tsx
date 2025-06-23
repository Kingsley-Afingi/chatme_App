import { NavLink } from "react-router"

const Navigator = () => {
  return (
    <div>
        <header className="flex items-center gap-3 justify-center w-[300px] mx-auto bg-amber-700 text-white py-2 px-1">
            <h1>logo</h1>
            <div className="flex gap-2">
                <NavLink to="/Admin">Admin</NavLink>
                <a href="home">home</a>
                <a href="about">about</a>
                <NavLink to="/Contact">Contact</NavLink>
            </div>
        </header>
    </div> 
  )
}

export default Navigator;