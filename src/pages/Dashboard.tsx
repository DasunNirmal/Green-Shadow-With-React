import './Dashboard.css'
import {useDispatch, useSelector} from "react-redux";
import {Fields} from "../models/Fields.ts";
import {AppDispatch} from "../store/Store.ts";
import {useEffect} from "react";
import {getFields} from "../reducers/FieldsSlice.ts";
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend} from "recharts";
import {getCrops} from "../reducers/CropsSlice.ts";
import {getStaffs} from "../reducers/StaffsSlice.ts";
import Staffs from "../models/Staffs.ts";
import Crops from "../models/Crops.ts";
import Vehicles from "../models/Vehicle.ts";
import Equipments from "../models/Equipments.ts";
import {getVehicles} from "../reducers/VehicleSlice.ts";
import {getEquipments} from "../reducers/EquipmentSlice.ts";


export const Dashboard = () => {

    const dispatch = useDispatch<AppDispatch>();

    // Select data from Redux store
    const fields = useSelector((state: { fields: Fields[] }) => state.fields);
    const crops = useSelector((state: { crops: Crops[] }) => state.crops);
    const staff = useSelector((state: { staffs: Staffs[] }) => state.staffs);
    const vehicles = useSelector((state: { vehicles: Vehicles[] }) => state.vehicles);
    const equipment = useSelector((state: { equipments: Equipments[] }) => state.equipments);

    useEffect(() => {
        if (fields.length === 0) dispatch(getFields());
        if (crops.length === 0) dispatch(getCrops());
        if (staff.length === 0) dispatch(getStaffs());
        if (vehicles.length === 0) dispatch(getVehicles());
        if (equipment.length === 0) dispatch(getEquipments());
    }, [dispatch, fields.length, crops.length, staff.length, vehicles.length, equipment.length]);

    // Chart Data
    const chartData = [
        {
            category: "Total",
            fields: fields.length,
            crops: crops.length,
            staff: staff.length
        },
        {
            category: "Today",
            fields: fields.filter(field => field.date_added === new Date().toISOString().split('T')[0]).length,
            crops: crops.filter(crop => crop.date_added === new Date().toISOString().split('T')[0]).length,
            staff: staff.filter(person => person.date_added === new Date().toISOString().split('T')[0]).length
        }
    ];

    const vehicleTotal = vehicles.length;
    const equipmentTotal = equipment.length;

    const availableVehicles = vehicles.filter(vehicle => vehicle.status === "Available").length;
    const availableEquipment = equipment.filter(eq => eq.status === "Available").length;

    return (
        <div>
            <section id="dashboard-section" className="animate__animated animate__fadeIn">
                <h3 id="dashboard-title">Dashboard Overview</h3>
                <div style={{ width: "50%", height: 550, marginTop: "80px" }}>
                    <div id="chart-title">Total and Today</div>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="fields" fill="#8884d8" name="Fields" />
                            <Bar dataKey="crops" fill="#82ca9d" name="Crops" />
                            <Bar dataKey="staff" fill="#ffc658" name="Staff" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Cards for vehicle and equipment */}
                <div id="container">
                    {/* Vehicle Card */}
                    <div className="card">
                        <div className="card-title">Vehicles</div>
                        <img id="vehicle-image" src="src/assets/icons/vehicles.png" alt="vehicle"/>
                        <div className="total" id="vehicle-total">Total : {vehicleTotal}</div>
                        <div className="availability">Available : {availableVehicles}</div>
                    </div>

                    {/* Equipment Card */}
                    <div className="card">
                        <div className="card-title">Equipments</div>
                        <img id="equipment-image" src="src/assets/icons/equipment.png" alt="equipment"/>
                        <div className="total" id="equipment-total">Total : {equipmentTotal}</div>
                        <div className="availability">Available : {availableEquipment}</div>
                    </div>
                </div>
            </section>
        </div>
    );
};