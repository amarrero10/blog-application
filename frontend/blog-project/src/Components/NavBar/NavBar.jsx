import { Link } from "react-router-dom/cjs/react-router-dom.min";
import logo from "../../assets/blog-logo.png";

function NavBar() {
  return (
    <div className=" flex items-center sm:w-4/5 mx-auto justify-between">
      <div>
        <Link to="/">
          <img className=" sm:h-16 sm:mt-1 h-10" src={logo} alt="blog-logo" />
        </Link>
      </div>
      <div className=" w-[290px] flex justify-between pr-4 sm:pr-0">
        <button className=" btnPrimary">About</button>
        <button className=" btnSecondary">Home</button>
      </div>
    </div>
  );
}

export default NavBar;
