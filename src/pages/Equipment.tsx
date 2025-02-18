import './Equipment.css'
import './formControll.css'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store/Store.ts";
import Equipments from "../models/Equipments.ts";
import {useEffect, useState} from "react";
import {searchStaffs} from "../reducers/StaffsSlice.ts";
import {searchFields} from "../reducers/FieldsSlice.ts";
import {
    deleteEquipments,
    getEquipments,
    saveEquipments,
    searchEquipments,
    updateEquipments
} from "../reducers/EquipmentSlice.ts";

export const Equipment = () => {

    const dispatch = useDispatch<AppDispatch>();
    const equipments = useSelector((state: { equipments: Equipments[] }) => state.equipments);

    const [equipmentCode, setEquipmentCode] = useState('');
    const [equipmentName, setEquipmentName] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('Available');
    const [fieldCode, setFieldCode] = useState('');
    const [fieldLocation, setFieldLocation] = useState('');
    const [fieldName, setFieldName] = useState('');
    const [staffID, setStaffID] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [role, setRole] = useState('');
    const [firstName, setFirstName] = useState('');
    const [SearchedField, setSearchedField] = useState('');
    const [SearchedStaff, setSearchedStaff] = useState('');
    const [SearchedEquipment, setSearchedEquipment] = useState('');

    useEffect(() => {
        if (equipments.length === 0)
            dispatch(getEquipments());
    }, [dispatch, equipments.length]);

    const handleClear = async () => {
        setEquipmentCode('');
        setEquipmentName('');
        setType('');
        setStatus('Available');
        setFieldCode('');
        setFieldLocation('');
        setFieldName('');
        setStaffID('');
        setPhoneNo('');
        setRole('');
        setFirstName('');
        setSearchedField('');
        setSearchedStaff('');
    };

    const handleStaffSearch = async () => {
        try {
            const fetchedStaffs = await dispatch(searchStaffs(SearchedStaff));
            if (fetchedStaffs.payload) {
                setStaffID(fetchedStaffs.payload.staff_id);
                setFirstName(fetchedStaffs.payload.first_name);
                setRole(fetchedStaffs.payload.role);
                setPhoneNo(fetchedStaffs.payload.phone_no);
                setSearchedStaff('');
            } else {
                console.warn("No staff data found.");
            }
        } catch (error) {
            console.error("Error fetching fields data:",error);
        }
    };

    const handleFieldSearch = async () => {
        try {
            const fetchedFields = await dispatch(searchFields(SearchedField));
            if (fetchedFields.payload) {
                setFieldCode(fetchedFields.payload.field_code);
                setFieldName(fetchedFields.payload.field_name);
                setFieldLocation(fetchedFields.payload.field_location);
                setSearchedField('');
            } else {
                console.warn("No field data found.");
            }
        } catch (e) {
            console.error("Error fetching fields data:", e);
        }
    };

    const handleSave = async () => {
        const equipmentObj = new Equipments(equipmentCode, fieldLocation, fieldName,  firstName, equipmentName, phoneNo, role, status, type, fieldCode, staffID);
        try {
            await dispatch(saveEquipments(equipmentObj));
            dispatch(getEquipments());
            handleClear();
            console.log("Equipment data saved successfully.");
        } catch (e) {
            console.error("Error saving equipment data:", e);
        }
    };

    const handleDelete = async () => {
        try {
            await dispatch(deleteEquipments(equipmentCode));
            dispatch(getEquipments());
            handleClear();
            console.log("Equipment data deleted successfully.");
        } catch (e) {
            console.error("Error deleting equipment data:", e);
        }
    };

    const handleUpdate = async () => {
        const equipmentObj = new Equipments(equipmentCode, fieldLocation, fieldName,  firstName, equipmentName, phoneNo, role, status, type, fieldCode, staffID);
        try {
            await dispatch(updateEquipments(equipmentObj));
            dispatch(getEquipments());
            handleClear();
            console.log("Equipment data updated successfully.");
        } catch (e) {
            console.error("Error updating equipment data:", e);
        }
    };

    const handleSearch = async () => {
        try {
            const fetchedEquipments = await dispatch(searchEquipments(SearchedEquipment));
            if (fetchedEquipments.payload) {
                setEquipmentCode(fetchedEquipments.payload.eq_code);
                setFieldLocation(fetchedEquipments.payload.field_location);
                setFieldName(fetchedEquipments.payload.field_name);
                setFirstName(fetchedEquipments.payload.first_name);
                setEquipmentName(fetchedEquipments.payload.name);
                setPhoneNo(fetchedEquipments.payload.phone_no);
                setRole(fetchedEquipments.payload.role);
                setStatus(fetchedEquipments.payload.status);
                setType(fetchedEquipments.payload.type);
                setFieldCode(fetchedEquipments.payload.field_code);
                setStaffID(fetchedEquipments.payload.staff_id);
                setSearchedEquipment('');
            } else {
                console.warn("No equipment data found.");
            }
        } catch (e) {
            console.error("Error fetching equipment data:", e);
        }
    };

    return (
        <div>
            <section id="equipment-section" className="animate__animated animate__fadeIn">
                {/*Left Card*/}
                <div id="equipment-content-card-left">
                    {/*Equipments Code*/}
                    <div id="equipment-code-div">
                        <label id="lblEquipmentCode" htmlFor="txtEquipmentCode">Equipment Code :</label>
                        <input id="txtEquipmentCode" className="form-control" type="text"
                               aria-label="default input example"
                               value={equipmentCode}
                               onChange={(e) => setEquipmentCode(e.target.value)}/>
                    </div>

                    {/*Equipments Name*/}
                    <div id="equipment-name-div">
                        <label id="lblEquipmentName" htmlFor="txtEquipmentName">Equipment Name :</label>
                        <input id="txtEquipmentName" className="form-control" type="text"
                               aria-label="default input example"
                               value={equipmentName}
                               onChange={(e) => setEquipmentName(e.target.value)}/>
                    </div>

                    {/*Type*/}
                    <div id="equipment-type-div">
                        <label id="lblType" htmlFor="txtType">Type :</label>
                        <input id="txtType" className="form-control" type="text"
                               aria-label="default input example"
                               value={type}
                               onChange={(e) => setType(e.target.value)}/>
                    </div>

                    {/*Status*/}
                    <div id="equipment-status-div">
                        <label htmlFor="txtEquipmentStatus" id="lblEquipmentStatus">Status (Available/Not Available)
                            :</label>
                        <select className="form-select" id="txtEquipmentStatus" required
                        defaultValue={status} onChange={(e) => setStatus(e.target.value)}>
                            <option>Available</option>
                            <option>Not Available</option>
                        </select>
                    </div>

                    {/*Search Employees*/}
                    <div id="search-employees-div">
                        <label id="lblSearchEmployees" htmlFor="txtSearchEmployees">Search Employees :</label>
                        <input id="txtSearchEmployees" className="form-control" type="text"
                               placeholder="Enter employee name or ID"
                               aria-label="default input example"
                               value={SearchedStaff}
                               onChange={(e) => setSearchedStaff(e.target.value)}/>
                        <button id="btnSearchEmployees" type="button" className="btn btn-primary" onClick={handleStaffSearch}>Search</button>
                    </div>

                    {/*Member ID*/}
                    <div id="employee-member-id-div">
                        <label id="lblMemberID-equipment" htmlFor="txtMemberID">Member ID :</label>
                        <input id="txtMemberID-equipment" className="form-control" type="text"
                               aria-label="default input example"
                               value={staffID}
                               onChange={(e) => setStaffID(e.target.value)}/>
                    </div>

                    {/*First Name*/}
                    <div id="employee-first-name-div">
                        <label id="lblFirstName-equipment" htmlFor="txtFirstName">First Name :</label>
                        <input id="txtFirstName-equipment" className="form-control" type="text"
                               aria-label="default input example"
                               value={firstName}
                               onChange={(e) => setFirstName(e.target.value)}/>
                    </div>

                    {/*Role*/}
                    <div id="employee-role-div">
                        <label id="lblRole-equipment" htmlFor="txtRole">Role :</label>
                        <input id="txtRole-equipment" className="form-control" type="text"
                               aria-label="default input example"
                               value={role}
                               onChange={(e) => setRole(e.target.value)}/>
                    </div>

                    {/*Phone Number*/}
                    <div id="employee-phone-number-div">
                        <label id="lblPhoneNumber-equipment" htmlFor="txtPhoneNumber">Phone Number :</label>
                        <input id="txtPhoneNumber-equipment" className="form-control" type="text"
                               aria-label="default input example"
                               value={phoneNo}
                               onChange={(e) => setPhoneNo(e.target.value)}/>
                    </div>

                    {/*Search Fields*/}
                    <div id="search-fields-equipment-div">
                        <label id="lblSearchFields-equipment" htmlFor="txtSearchFields-equipment">Search Fields
                            :</label>
                        <input id="txtSearchFields-equipment" className="form-control" type="text"
                               placeholder="Enter field code or name"
                               aria-label="default input example"
                               value={SearchedField}
                               onChange={(e) => setSearchedField(e.target.value)}/>
                        <button id="btnSearchFields-equipment" type="button" className="btn btn-primary" onClick={handleFieldSearch}>Search</button>
                    </div>

                    {/*Fields Code*/}
                    <div id="field-code-div">
                        <label id="lblFieldCode" htmlFor="txtFieldCode">Field Code :</label>
                        <input id="txtFieldCode" className="form-control" type="text"
                               aria-label="default input example"
                               value={fieldCode}
                               onChange={(e) => setFieldCode(e.target.value)}/>
                    </div>

                    {/*Fields Name*/}
                    <div id="field-name-equipment-div">
                        <label id="lblFieldName-equipment" htmlFor="txtFieldName">Field Name :</label>
                        <input id="txtFieldName-equipment" className="form-control" type="text"
                               aria-label="default input example"
                               value={fieldName}
                               onChange={(e) => setFieldName(e.target.value)}/>
                    </div>

                    {/*Fields Location*/}
                    <div id="field-location-equipment-div">
                        <label id="lblFieldLocation-equipment" htmlFor="txtFieldLocation">Field Location :</label>
                        <input id="txtFieldLocation-equipment" className="form-control" type="text"
                               aria-label="default input example"
                               value={fieldLocation}
                               onChange={(e) => setFieldLocation(e.target.value)}/>
                    </div>

                    {/*Buttons*/}
                    <div id="button-div-equipment">
                        <button type="button" className="btn btn-primary" id="save-equipment" onClick={handleSave}>Save</button>
                        <button type="button" className="btn btn-secondary" id="update-equipment" onClick={handleUpdate}>Update</button>
                        <button type="button" className="btn btn-danger" id="delete-equipment" onClick={handleDelete}>Delete</button>
                        <button type="button" className="btn btn-warning" id="clear-equipment" onClick={handleClear}>Clear</button>
                    </div>
                </div>

                {/*Search Section*/}
                <div id="search-equipment-div">
                    {/*Label for Search*/}
                    <label id="lblSearchEquipment" htmlFor="txtSearch-equipment">Search Vehicles :</label>
                    <input id="txtSearch-equipment" className="form-control" type="text"
                           placeholder="vehicle code or license plate"
                           aria-label="default input example"
                           value={SearchedEquipment}
                           onChange={(e) => setSearchedEquipment(e.target.value)}/>
                    <button id="search-equipment" type="button" className="btn btn-primary" onClick={handleSearch}>Search</button>
                </div>

                {/*Table*/}
                <div className="col-md-12 mt-4" style={{height: '285px', overflowY: 'scroll'}} id="Tbl-equipment">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Equipment Code</th>
                            <th>Equipment Name</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Member ID</th>
                            <th>First Name</th>
                            <th>Role</th>
                            <th>Phone Number</th>
                            <th>Field Code</th>
                            <th>Field Name</th>
                            <th>Field Location</th>
                        </tr>
                        </thead>
                        <tbody id="equipment-table-tb">
                        {equipments.map((equipment, index) => (
                            <tr key={index}>
                                <td>{equipment.eq_code}</td>
                                <td>{equipment.name}</td>
                                <td>{equipment.type}</td>
                                <td>{equipment.status}</td>
                                <td>{equipment.staff_id}</td>
                                <td>{equipment.first_name}</td>
                                <td>{equipment.role}</td>
                                <td>{equipment.phone_no}</td>
                                <td>{equipment.field_code}</td>
                                <td>{equipment.field_name}</td>
                                <td>{equipment.field_location}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </section>
        </div>
    );
};