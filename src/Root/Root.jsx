import { Outlet } from "react-router-dom";
import FooterComponent from "../Footer/FooterComponent";
import NavbarComponent from "../Navbar/NavbarComponent";
import Newsletter from "../Newsletter/Newsletter";



const Root = () => {
    return (
        <div className="container mx-auto mt-5 mb-5">
            <NavbarComponent></NavbarComponent>
            <Outlet></Outlet>
            <Newsletter></Newsletter>
            <FooterComponent></FooterComponent>
        
        </div>
    );
};

export default Root;