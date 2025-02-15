import './Dashboard.css'
import {useDispatch, useSelector} from "react-redux";
import {Fields} from "../models/Fields.ts";
import {AppDispatch} from "../store/Store.ts";
import {useEffect} from "react";
import {getFields} from "../reducers/FieldsSlice.ts";

export const Dashboard = () => {

    const dispatchFields = useDispatch<AppDispatch>();
    const fields = useSelector((state: { fields: Fields[] }) => state.fields);
    const totalFields = fields.length;

    useEffect(() => {
        if (fields.length === 0)
            dispatchFields(getFields());
    },[dispatchFields,fields.length]);

    return (
        <div>
            <section id="dashboard-section" className="animate__animated animate__fadeIn">
                <div id="container">
                    <div className="card">
                        <h5>Total Fields</h5>
                        <img id="crop-image" src="src/assets/icons/field.png" alt="crop"/>
                        <div className="total" id="field-total">{totalFields}</div>
                    </div>
                    <div className="card">
                        <h5>Total Crops</h5>
                        <img id="field-image" src="src/assets/icons/crops.png" alt="crop"/>
                        <div className="total" id="crop-total">0</div>
                    </div>
                    <div className="card">
                        <h5>Total Staff</h5>
                        <img id="staff-image" src="src/assets/icons/staff.png" alt="staff"/>
                        <div className="total" id="staff-total">0</div>
                    </div>
                    <div className="card">
                        <h5>Total Vehicle</h5>
                        <img id="vehicle-image" src="src/assets/icons/vehicles.png" alt="vehicle"/>
                        <div className="total" id="vehicle-total">0</div>
                    </div>
                    <div className="card">
                        <h5>Total Equipment</h5>
                        <img id="equipment-image" src="src/assets/icons/equipment.png" alt="equipment"/>
                        <div className="total" id="equipment-total">0</div>
                    </div>
                    <div className="card">
                        <h5>Total Log</h5>
                        <img id="log-image" src="src/assets/icons/log.png" alt="log"/>
                        <div className="total" id="log-total">0</div>
                    </div>
                </div>
            </section>
        </div>
    );
};