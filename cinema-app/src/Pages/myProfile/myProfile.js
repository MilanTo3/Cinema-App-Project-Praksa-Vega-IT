import * as React from 'react';
import classes from "./myProfile.module.css";
import { passwordReset, requestReset } from '../../Services/userService';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import BasicSnackbar from '../../Components/snackbar/snackbar';
import { getUser, blockUser } from "../../Services/userService";
import {motion} from 'framer-motion';
import { confirmAlert } from 'react-confirm-alert';

export default function MyProfile(){

    const [snackbarOpen, setsnackbarOpen] = React.useState(false);
	const [snackbarContent, setsnackbarContent] = React.useState("");
	const [snackbarType, setsnackbarType] = React.useState(0);
    const [data, setData] = React.useState({});
    const [verifyBlockData, setVerifyBlockData] = React.useState({});
    const navigate = useNavigate();
    var verf;
    var blckd;

    const [userData, setUserData] = React.useState();

    const handleSnackbarClose = () => {

		setsnackbarOpen(false);
  	};

    useEffect(() => {

        var user = JSON.parse(localStorage.getItem("loggedInUser"));
        if(user !== null){
            setUserData(user);
        }

        getUser(user.id).then(function (response) {
            setData(response["data"]);
            
            if(response["data"]["verified"] === true){
                verf = "Verified.";
            }else { verf = "Not verified."; }
            
            if(response["data"]["blocked"] === true){
                blckd = "Blocked";
            }else {
                blckd = "Not blocked.";
            }

            setVerifyBlockData({ verify: verf, blocked: blckd });
        });

    }, [snackbarOpen]);

    const confirmDialog = () => {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className={classes["custom-ui"]}>
                <h1>Do you wish to reset your password?</h1>
                <p>You will be logged out of the app, and you won't be able to log in until you reset your password.</p>
                <button
                  onClick={() => {

                    requestReset({email: data["email"]}).then(function (response){
                      setsnackbarType(0);
                      setsnackbarContent(response["data"]);
                      setsnackbarOpen(true);
                      setTimeout(() => {
                        localStorage.removeItem("loggedInUser");
                        navigate("/");
                      }, 1000);
                    }).catch(function (response){
                      setsnackbarType(1);
                      setsnackbarContent(response["data"]);
                      setsnackbarOpen(true);
                    });
                    onClose();
                  }}
                >
                  Confirm
                </button>
                <button onClick={onClose}>No</button>
              </div>
            );
          }
        });
      };
    
    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className={classes.container}>
            <BasicSnackbar type={snackbarType} content={snackbarContent} isDialogOpened={snackbarOpen} handleClose={handleSnackbarClose} center={true} />
                <div className={classes.form}>
                    <h1>My info:</h1>
                    <h4 className={classes.writingInfo}>Name: <span>{data["name"]}</span></h4>
                    <h4 className={classes.writingInfo}>Email: <span>{data["email"]}</span></h4>
                    <h4 className={classes.writingInfo}>Birthday: <span>{new Date(data["birthday"]).toLocaleDateString()}</span></h4>
                    <h4 className={classes.writingInfo}>Verified: <span>{verifyBlockData["verify"]}</span></h4>
                    <h4 className={classes.writingInfo}>Blocked: <span>{verifyBlockData["blocked"]}</span></h4>
                    <button onClick={confirmDialog}>Reset password</button>
                </div>
        </motion.div>
    );
}