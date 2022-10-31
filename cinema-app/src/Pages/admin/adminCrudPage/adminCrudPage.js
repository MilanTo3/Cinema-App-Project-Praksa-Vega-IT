import { useParams } from "react-router-dom";
import classes from './adminCrudPage.module.css';
import BasicTable from "../../../Components/table/table";
import {motion} from "framer-motion";

export default function AdminCrudPage(prop){

    const k = useParams().type;

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} style={{marginTop: "100px"}}>
            <p className={classes.managwrite}>Manage {k}:</p>
            <BasicTable dataType={k}></BasicTable>
        </motion.div>
    );
}