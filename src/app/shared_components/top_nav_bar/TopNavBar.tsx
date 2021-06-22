import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const TopNavBar =()=>{
  const authData = useAuth();
   return (
    <div className = "navbar">
      <div className = "navbar__container">
        <div className = "navbar__title ">
          <div className = "navbar__logo">
            <img src = "hwer" alt = "logo"/>
          </div>
          <div className = "navbar__titletxt">
            <h1>TDCA</h1>
          </div>
        </div>
        <div className = "navbar__body">
          <div className = "navbar__link"> 
          <Link to = "/" className = "navbar__link--linktag">
            Matches
            </Link> 
            </div>
            <div className = "navbar__link"> 
          <Link to = "/" className = "navbar__link--linktag">
           Teams
            </Link> 
            </div>
            <div className = "navbar__link"> 
          <Link to = "/" className = "navbar__link--linktag">
            Staffs
            </Link> 
            </div>
            <div className = "navbar__link"> 
          <Link to = "/" className = "navbar__link--linktag">
            Contact
            </Link> 
            </div>
            {/* <button type="button" onClick={async()=>{
              if(authData.uid ===null){
                console.log("gonna sign in")
                await auth.signInAnonymously();
              }else{
                await auth.signOut();
              }
            }}>
              Sign in
            </button> */}
            <div className = "navbar__btn">
              <Link to = "/">Sign In</Link>
            </div>
            <h2>{authData.uid??'null'}</h2>
        </div>  
      </div>
    </div>
    );};
  

export default TopNavBar;

