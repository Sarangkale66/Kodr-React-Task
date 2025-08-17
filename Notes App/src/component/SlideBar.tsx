import { Link } from "react-router-dom";

export default function SlideBar() {
  return <>
    <Link to={"/"} >Home</Link>
    <Link to={"/user"}>Users</Link>
    <Link to={"/add"}>Add Users</Link>
  </>
}