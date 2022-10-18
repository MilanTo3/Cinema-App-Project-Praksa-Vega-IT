import { Link, useParams, useLocation } from "react-router-dom";
import classes from './adminCrudPage.module.css';
import BasicTable from "../../../Components/table/table";

export default function AdminCrudPage(prop){

    const k = useParams().type;

    return (
        <div style={{marginTop: "100px"}}>
            <p className={classes.managwrite}>Manage {k}:</p>
            <BasicTable></BasicTable>
        </div>
    );
}