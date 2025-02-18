import './Vehicle.css'
import './formControll.css'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store/Store.ts";
import Vehicles from "../models/Vehicle.ts";
import {useState} from "react";
import {searchStaffs} from "../reducers/StaffsSlice.ts";

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
    const [status, setStatus] = useState('');
    const [vehicleCategory, setVehicleCategory] = useState('');
    const [staffID, setStaffID] = useState('');
    const [SearchedStaff, setSearchedStaff] = useState('');
    const [SearchedVehicle, setSearchedVehicle] = useState('');

    const handleStaffSearch = async () => {
        try {
            const fetchedStaffs = await dispatch(searchStaffs(SearchedStaff));
            if (fetchedStaffs.payload) {
                setStaffID(fetchedStaffs.payload.staff_id);
                setEmail(fetchedStaffs.payload.email);
                setFirstName(fetchedStaffs.payload.first_name);
                setPhoneNumber(fetchedStaffs.payload.phone_no);
                setRole(fetchedStaffs.payload.role);
            } else {
                console.warn("No staff data found.");
            }
        } catch (error) {
            console.error("Error fetching fields data:",error);
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
                               aria-label="default input example"/>
                    </div>

                    {/*License Plate Number*/}
                    <div id="vehicle-license-plate-div">
                        <label id="lblLicensePlate" htmlFor="txtLicensePlate">License Plate Number :</label>
                        <input id="txtLicensePlate" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Fuel Type*/}
                    <div id="vehicle-fuel-type-div">
                        <label id="lblFuelType" htmlFor="txtFuelType">Fuel Type :</label>
                        <input id="txtFuelType" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Category*/}
                    <div id="vehicle-category-div">
                        <label id="lblVehicleCategory" htmlFor="txtCategory">Category :</label>
                        <input id="txtVehicleCategory" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Remarks*/}
                    <div id="vehicle-remarks-div">
                        <label id="lblRemarks" htmlFor="txtRemarks">Remarks :</label>
                        <input id="txtRemarks" className="form-control" type="text" aria-label="default input example"/>
                    </div>

                    {/*Status*/}
                    <div id="vehicle-status-div">
                        <label htmlFor="txtStatus" id="lblStatus">Status (Available/Not Available) :</label>
                        <select className="form-select" id="txtStatus" required>
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
                        <button type="button" className="btn btn-primary" id="save-vehicles">Save</button>
                        <button type="button" className="btn btn-secondary" id="update-vehicles">Update</button>
                        <button type="button" className="btn btn-danger" id="delete-vehicles">Delete</button>
                        <button type="button" className="btn btn-warning" id="clear-vehicles">Clear</button>
                    </div>
                </div>

                {/*Search Section*/}
                <div id="search-vehicles-div">
                    {/*Label for Search*/}
                    <label id="lblSearchVehicles" htmlFor="txtSearch-vehicles">Search Vehicles :</label>
                    <input id="txtSearch-vehicles" className="form-control" type="text"
                           placeholder="vehicle code or license plate" aria-label="default input example"/>
                    {/*Search Button*/}
                    <button id="search-vehicle" type="button" className="btn btn-primary">Search</button>
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
                        <tr>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};