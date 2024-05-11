import { Link, useLocation } from "react-router-dom";
import notFoundImg from "../assets/not-found.png"

export default () => {

  const {state} = useLocation()

  return <div className="not-found">
    <img src={notFoundImg} alt="Not found image"></img>
    <p>Oops... {state ? state : "page"} not found</p>
    <Link to="/"><button className="btn btn-sm btn-outline-secondary">Go Home</button></Link>
    </div>
}