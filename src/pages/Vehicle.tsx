import './Vehicle.css'
import './formControll.css'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store/Store.ts";
import Vehicles from "../models/Vehicle.ts";
import {useEffect, useState} from "react";
import {searchStaffs} from "../reducers/StaffsSlice.ts";
import {deleteVehicles, getVehicles, saveVehicles, searchVehicles, updateVehicles} from "../reducers/VehicleSlice.ts";

export const Vehicle = () => {

    const dispatch = useDispatch<AppDispatch>();
    const vehicles = useSelector((state: { vehicles: Vehicles[] }) => state.vehicles);

    const [vehicleCode, setVehicleCode] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [remarks, setRemarks] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('Available');
    const [vehicleCategory, setVehicleCategory] = useState('');
    const [staffID, setStaffID] = useState('');
    const [SearchedStaff, setSearchedStaff] = useState('');
    const [SearchedVehicle, setSearchedVehicle] = useState('');


    useEffect(() => {
        if (vehicles.length === 0)
            dispatch(getVehicles());
    },[dispatch,vehicles.length]);

    const handleClear = async () => {
        setVehicleCode('');
        setEmail('');
        setFirstName('');
        setFuelType('');
        setLicensePlate('');
        setPhoneNumber('');
        setRemarks('');
        setRole('');
        setStatus('Available');
        setVehicleCategory('');
        setStaffID('');
    };

    const handleStaffSearch = async () => {
        try {
            const fetchedStaffs = await dispatch(searchStaffs(SearchedStaff));
            if (fetchedStaffs.payload) {
                setStaffID(fetchedStaffs.payload.staff_id);
                setEmail(fetchedStaffs.payload.email);
                setFirstName(fetchedStaffs.payload.first_name);
                setPhoneNumber(fetchedStaffs.payload.phone_no);
                setRole(fetchedStaffs.payload.role);
                setSearchedStaff('');
            } else {
                console.warn("No staff data found.");
            }
        } catch (error) {
            console.error("Error fetching fields data:",error);
        }
    };

    const handleSave = async () => {
        const vehicleObj = new Vehicles(vehicleCode, email, firstName, fuelType, licensePlate, phoneNumber, remarks, role, status, vehicleCategory, staffID);
        try {
            await dispatch(saveVehicles(vehicleObj));
            dispatch(getVehicles());
            handleClear();
            console.log("Vehicle data saved successfully.");
        } catch (e) {
            console.error("Error saving vehicle data:", e);
        }
    };

    const handleDelete = async () => {
        try {
            await dispatch(deleteVehicles(vehicleCode));
            dispatch(getVehicles());
            handleClear();
            console.log("Vehicle data deleted successfully.");
        } catch (e) {
            console.error("Error deleting vehicle data:", e);
        }
    };

    const handleUpdate = async () => {
        const vehicleObj = new Vehicles(vehicleCode, email, firstName, fuelType, licensePlate, phoneNumber, remarks, role, status, vehicleCategory, staffID);
        try {
            await dispatch(updateVehicles(vehicleObj));
            dispatch(getVehicles());
            handleClear();
            console.log("Vehicle data updated successfully.");
        } catch (e) {
            console.error("Error updating vehicle data:", e);
        }
    };

    const handleSearch = async () => {
        try {
            const fetchedVehicles = await dispatch(searchVehicles(SearchedVehicle));
            if (fetchedVehicles.payload) {
                setVehicleCode(fetchedVehicles.payload.vehicle_code);
                setEmail(fetchedVehicles.payload.email);
                setFirstName(fetchedVehicles.payload.first_name);
                setFuelType(fetchedVehicles.payload.fuel_type);
                setLicensePlate(fetchedVehicles.payload.license_plate);
                setPhoneNumber(fetchedVehicles.payload.phone_no);
                setRemarks(fetchedVehicles.payload.remarks);
                setRole(fetchedVehicles.payload.role);
                setStatus(fetchedVehicles.payload.status);
                setVehicleCategory(fetchedVehicles.payload.vehicle_category);
                setStaffID(fetchedVehicles.payload.staff_id);
                setSearchedVehicle('');
            } else {
                console.warn("No vehicle data found.");
            }
        } catch (e) {
            console.error("Error fetching vehicle data:", e);
        }
    };

    return (
        <div>
            <style>{'body { overflow-y: scroll; }'}</style>
            <section id="vehicle-section" className="animate__animated animate__fadeIn">
                {/*Left Card*/}
                <div id="vehicle-content-card-left">
                    {/*Vehicle Code*/}
                    <div id="vehicle-code-div">
                        <label id="lblVehicleCode" htmlFor="txtVehicleCode">Vehicle Code :</label>
                        <input id="txtVehicleCode" className="form-control" type="text"
                               aria-label="default input example"
                               value={vehicleCode}
                               onChange={(e) => setVehicleCode(e.target.value)}/>
                    </div>

                    {/*License Plate Number*/}
                    <div id="vehicle-license-plate-div">
                        <label id="lblLicensePlate" htmlFor="txtLicensePlate">License Plate Number :</label>
                        <input id="txtLicensePlate" className="form-control" type="text"
                               aria-label="default input example"
                               value={licensePlate}
                               onChange={(e) => setLicensePlate(e.target.value)}/>
                    </div>

                    {/*Fuel Type*/}
                    <div id="vehicle-fuel-type-div">
                        <label id="lblFuelType" htmlFor="txtFuelType">Fuel Type :</label>
                        <input id="txtFuelType" className="form-control" type="text"
                               aria-label="default input example"
                               value={fuelType}
                               onChange={(e) => setFuelType(e.target.value)}/>
                    </div>

                    {/*Category*/}
                    <div id="vehicle-category-div">
                        <label id="lblVehicleCategory" htmlFor="txtCategory">Category :</label>
                        <input id="txtVehicleCategory" className="form-control" type="text"
                               aria-label="default input example"
                               value={vehicleCategory}
                               onChange={(e) => setVehicleCategory(e.target.value)}/>
                    </div>

                    {/*Remarks*/}
                    <div id="vehicle-remarks-div">
                        <label id="lblRemarks" htmlFor="txtRemarks">Remarks :</label>
                        <input id="txtRemarks" className="form-control" type="text"
                               aria-label="default input example"
                               value={remarks}
                               onChange={(e) => setRemarks(e.target.value)}/>
                    </div>

                    {/*Status*/}
                    <div id="vehicle-status-div">
                        <label htmlFor="txtStatus" id="lblStatus">Status (Available/Not Available) :</label>
                        <select className="form-select" id="txtStatus" required
                                defaultValue={status} onChange={(e) => setStatus(e.target.value)}>
                            <option>Available</option>
                            <option>Not Available</option>
                        </select>
                    </div>

                    {/*Search Staff*/}
                    <div id="search-employs-div">
                        <label id="lblSearchEmploys" htmlFor="txtSearchEmploys">Search Employs :</label>
                        <input id="txtSearchEmploys" className="form-control" type="text"
                               placeholder="Enter employee name or ID"
                               aria-label="default input example"
                               value={SearchedStaff}
                               onChange={(e) => setSearchedStaff(e.target.value)}/>
                        <button id="btnSearchEmploys" type="button" className="btn btn-primary" onClick={handleStaffSearch}>Search</button>
                    </div>

                    {/*Staff Email*/}
                    <div id="employee-email-vehicle-div">
                        <label id="lblVehicleEmail" htmlFor="txtVehicleEmail">Email :</label>
                        <input id="txtVehicleEmail" className="form-control" type="email"
                               aria-label="default input example"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    {/*Staff ID*/}
                    <div id="employee-member-id-vehicle-div">
                        <label id="lblVehicleMemberID" htmlFor="txtVehicleMemberID">Member ID :</label>
                        <input id="txtVehicleMemberID" className="form-control" type="text"
                               aria-label="default input example"
                               value={staffID}
                               onChange={(e) => setStaffID(e.target.value)}/>
                    </div>

                    {/*Staff First Name*/}
                    <div id="employee-first-name-vehicle-div">
                        <label id="lblVehicleFirstName" htmlFor="txtVehicleFirstName">First Name :</label>
                        <input id="txtVehicleFirstName" className="form-control" type="text"
                               aria-label="default input example"
                               value={firstName}
                               onChange={(e) => setFirstName(e.target.value)}/>
                    </div>

                    {/*Role*/}
                    <div id="employee-role-vehicle-div">
                        <label id="lblVehicleRole" htmlFor="txtVehicleRole">Role :</label>
                        <input id="txtVehicleRole" className="form-control" type="text"
                               aria-label="default input example"
                               value={role}
                               onChange={(e) => setRole(e.target.value)}/>
                    </div>

                    {/*Phone Number*/}
                    <div id="employee-phone-number-vehicle-div">
                        <label id="lblVehiclePhoneNumber" htmlFor="txtVehiclePhoneNumber">Phone Number :</label>
                        <input id="txtVehiclePhoneNumber" className="form-control" type="text"
                               aria-label="default input example"
                               value={phoneNumber}
                               onChange={(e) => setPhoneNumber(e.target.value)}/>
                    </div>

                    {/*Buttons*/}
                    <div id="button-div-vehicle">
                        <button type="button" className="btn btn-primary" id="save-vehicles" onClick={handleSave}>Save</button>
                        <button type="button" className="btn btn-secondary" id="update-vehicles" onClick={handleUpdate}>Update</button>
                        <button type="button" className="btn btn-danger" id="delete-vehicles" onClick={handleDelete}>Delete</button>
                        <button type="button" className="btn btn-warning" id="clear-vehicles" onClick={handleClear}>Clear</button>
                    </div>
                </div>

                {/*Search Section*/}
                <div id="search-vehicles-div">
                    {/*Label for Search*/}
                    <label id="lblSearchVehicles" htmlFor="txtSearch-vehicles">Search Vehicles :</label>
                    <input id="txtSearch-vehicles" className="form-control" type="text"
                           placeholder="vehicle code or license plate"
                           aria-label="default input example"
                           value={SearchedVehicle}
                           onChange={(e) => setSearchedVehicle(e.target.value)}/>
                    <button id="search-vehicle" type="button" className="btn btn-primary" onClick={handleSearch}>Search</button>
                </div>

                {/*Table*/}
                <div className="col-md-12 mt-4" style={{height: '285px', overflowY: 'scroll'}} id="Tbl-vehicles">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Vehicle Code</th>
                            <th>Plate Number</th>
                            <th>Fuel Type</th>
                            <th>Category</th>
                            <th>Remarks</th>
                            <th>Status</th>
                            <th>Member ID</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody id="vehicles-table-tb">
                        {vehicles.map((vehicle, index) => (
                            <tr key={index}>
                                <td>{vehicle.vehicle_code}</td>
                                <td>{vehicle.license_plate}</td>
                                <td>{vehicle.fuel_type}</td>
                                <td>{vehicle.vehicle_category}</td>
                                <td>{vehicle.remarks}</td>
                                <td>{vehicle.status}</td>
                                <td>{vehicle.staff_id}</td>
                                <td>{vehicle.first_name}</td>
                                <td>{vehicle.role}</td>
                                <td>{vehicle.phone_no}</td>
                                <td>{vehicle.email}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};