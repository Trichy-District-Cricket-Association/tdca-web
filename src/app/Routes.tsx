import { Route } from "react-router-dom";
import LandingPage from "./features/landing_page/LandingPage";
import AdminPanel from "./role_content/admin_panel/AdminPanel";

const MyComp =()=>
   (<div>
        <Route exact path='/' component = {LandingPage}/>
        <Route exact path='/admin' component = {AdminPanel}/>   
    </div>
    );

export default MyComp;