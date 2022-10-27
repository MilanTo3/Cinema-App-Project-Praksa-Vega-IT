import React from "react";
import { useEffect } from "react";
import { getUser, blockUser } from "../../../Services/userService";
import BasicSnackbar from "../../../Components/snackbar/snackbar";
import classes from "./editCustomer.module.css";

export default function EditCustomerForm({ id }){

    const [snackbarOpen, setsnackbarOpen] = React.useState(false);
	const [snackbarContent, setsnackbarContent] = React.useState("");
	const [snackbarType, setsnackbarType] = React.useState(0);
    const [data, setData] = React.useState({});
    const [verifyBlockData, setVerifyBlockData] = React.useState({});
    const [button, setButton] = React.useState();
    var verf = "";
    var blckd = "";

    useEffect(() => {

        getUser(id).then(function (response) {
            setData(response["data"]);
            
            if(response["data"]["verified"] === true){
                verf = "Verified.";
            }else { verf = "Not verified."; }
            
            if(response["data"]["blocked"] === true){
                blckd = "Blocked";
                setButton(<button onClick={() => handleBlock(false)}>Unblock customer</button>);
            }else {
                blckd = "Not blocked.";
                setButton(<button onClick={() => handleBlock(true)}>Block customer</button>);
            }

            setVerifyBlockData({ verify: verf, blocked: blckd });
        });
    }, [snackbarOpen])

    const handleSnackbarClose = () => {

		setsnackbarOpen(false);
  	};

    const handleBlock = () => {
        
        blockUser(id).then(function (response){
            setsnackbarType(0);
            setsnackbarContent(response["data"]);
            setsnackbarOpen(true);
        }).catch(function (error){
            setsnackbarType(1);
            setsnackbarContent(error["data"]);
            setsnackbarOpen(true);
        });
    };

    const handleReset = () => {


    };

    return (
        <div>
            <BasicSnackbar type={snackbarType} content={snackbarContent} isDialogOpened={snackbarOpen} handleClose={handleSnackbarClose} center={true} />
            <div className={classes.container}>
                <h1>Customer info:</h1>
                <p className={classes.writingInfo}>Name: <span>{data["name"]}</span></p>
                <p className={classes.writingInfo}>Email: <span>{data["email"]}</span></p>
                <p className={classes.writingInfo}>Birthday: <span>{new Date(data["birthday"]).toLocaleDateString()}</span></p>
                <p className={classes.writingInfo}>Verified: <span>{verifyBlockData["verify"]}</span></p>
                <p className={classes.writingInfo}>Blocked: <span>{verifyBlockData["blocked"]}</span></p>
                {button}
                <button onClick={handleReset}>Reset password</button>
            </div>
    </div>);
}