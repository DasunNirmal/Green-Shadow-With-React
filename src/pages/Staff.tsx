import './Staff.css'
import './formControll.css'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store/Store.ts";
import Staffs from "../models/Staffs.ts";
import {useEffect, useState} from "react";
import {searchFields} from "../reducers/FieldsSlice.ts";
import {getStaffs, saveStaffs} from "../reducers/StaffsSlice.ts";
import {getCrops} from "../reducers/CropsSlice.ts";

export const Staff = () => {

    const dispatch = useDispatch<AppDispatch>();
    const staffs = useSelector((state: { staffs: Staffs[] }) => state.staffs);

    const [staffID, setStaffID] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [designation, setDesignation] = useState('');
    const [dob, setDob] = useState('');
    const [role, setRole] = useState('');
    const [gender, setGender] = useState('');
    const [joinedDate, setJoinedDate] = useState('');
    const [address01, setAddress01] = useState('');
    const [address02, setAddress02] = useState('');
    const [address03, setAddress03] = useState('');
    const [address04, setAddress04] = useState('');
    const [address05, setAddress05] = useState('');
    const [fieldCode, setFieldCode] = useState('');
    const [fieldName, setFieldName] = useState('');
    const [SearchedField, setSearchedField] = useState('');
    const [SearchedStaff, setSearchedStaff] = useState('');

    useEffect(() => {
        if (staffs.length === 0)
            dispatch(getStaffs());
    },[dispatch,staffs.length]);

    const handleFieldSearch = async () => {
        try {
            const fetchedFields = await dispatch(searchFields(SearchedField));
            if (fetchedFields.payload) {
                setFieldCode(fetchedFields.payload.field_code);
                setFieldName(fetchedFields.payload.field_name);
            } else {
                console.warn("No field data found.");
            }
        } catch (e) {
            console.error("Error fetching fields data:", e);
        }
    };

    const handleSave = async () => {
      const staffObj = new Staffs(staffID, address01, address02, address03, address04, address05, designation, dob, email, firstName, gender, joinedDate, lastName, phoneNumber,
          role, fieldCode);

      try {
          await dispatch(saveStaffs(staffObj));
          dispatch(getStaffs());
          console.log("Staff data saved successfully.");
      } catch (e) {
          console.error("Error saving staff data:", e);
      }
    };

    return (
        <div>
            <style>{'body { overflow-y: scroll; }'}</style>
            <section id="staff-section" className="animate__animated animate__fadeIn">
                {/*Left Card*/}
                <div id="staff-content-card-left">
                    {/*Member ID*/}
                    <div id="staff-id-div">
                        <label id="lblMemberID" htmlFor="txtMemberID">Member ID :</label>
                        <input id="txtMemberID" className="form-control" type="text"
                               aria-label="default input example"
                               value={staffID}
                               onChange={(e) => setStaffID(e.target.value)}/>
                    </div>

                    {/*First Name*/}
                    <div id="staff-first-name-div">
                        <label id="lblFirstName" htmlFor="txtFirstName">First Name :</label>
                        <input id="txtFirstName" className="form-control" type="text"
                               aria-label="default input example"
                               value={firstName}
                               onChange={(e) => setFirstName(e.target.value)}/>
                    </div>

                    {/*Last Name*/}
                    <div id="staff-last-name-div">
                        <label id="lblLastName" htmlFor="txtLastName">Last Name :</label>
                        <input id="txtLastName" className="form-control" type="text"
                               aria-label="default input example"
                               value={lastName}
                               onChange={(e) => setLastName(e.target.value)}/>
                    </div>

                    {/*Email*/}
                    <div id="staff-email-div">
                        <label id="lblEmail" htmlFor="txtEmail">Email :</label>
                        <input id="txtEmail" className="form-control" type="email"
                               aria-label="default input example"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    {/*Phone Number*/}
                    <div id="staff-phone-div">
                        <label id="lblPhoneNumber" htmlFor="txtPhoneNumber">Phone Number :</label>
                        <input id="txtPhoneNumber" className="form-control" type="text"
                               aria-label="default input example"
                               value={phoneNumber}
                               onChange={(e) => setPhoneNumber(e.target.value)}/>
                    </div>

                    {/*Designation*/}
                    <div id="staff-designation-div">
                        <label id="lblDesignation" htmlFor="txtDesignation">Designation :</label>
                        <input id="txtDesignation" className="form-control" type="text"
                               aria-label="default input example"
                               value={designation}
                               onChange={(e) => setDesignation(e.target.value)}/>
                    </div>

                    {/*Date of Birth*/}
                    <div id="staff-dob-div">
                        <label id="lblDateOfBirth" htmlFor="txtDateOfBirth">Date of Birth :</label>
                        <input id="txtDateOfBirth" className="form-control" type="date"
                               aria-label="default input example"
                               value={dob}
                               onChange={(e) => setDob(e.target.value)}/>
                    </div>

                    {/*Role*/}
                    <div id="staff-role-div">
                        <label id="lblRole" htmlFor="txtRole">Role :</label>
                        <input id="txtRole" className="form-control" type="text"
                               aria-label="default input example"
                               value={role}
                               onChange={(e) => setRole(e.target.value)}/>
                    </div>

                    {/*Gender*/}
                    <div id="staff-gender-div">
                        <label id="lblGender" htmlFor="txtGender">Gender :</label>
                        <input id="txtGender" className="form-control" type="text"
                               aria-label="default input example"
                               value={gender}
                               onChange={(e) => setGender(e.target.value)}/>
                    </div>

                    {/*Joined Date*/}
                    <div id="staff-joined-div">
                        <label id="lblJoinedDate" htmlFor="txtJoinedDate">Joined Date :</label>
                        <input id="txtJoinedDate" className="form-control" type="date"
                               aria-label="default input example"
                               value={joinedDate}
                               onChange={(e) => setJoinedDate(e.target.value)}/>
                    </div>

                    {/*Address Line 01*/}
                    <div id="staff-address-line1-div">
                        <label id="lblAddressLine1" htmlFor="txtAddressLine1">Address Line 01 :</label>
                        <input id="txtAddressLine1" className="form-control" type="text"
                               aria-label="default input example"
                               value={address01}
                               onChange={(e) => setAddress01(e.target.value)}/>
                    </div>

                    {/*Address Line 02*/}
                    <div id="staff-address-line2-div">
                        <label id="lblAddressLine2" htmlFor="txtAddressLine2">Address Line 02 :</label>
                        <input id="txtAddressLine2" className="form-control" type="text"
                               aria-label="default input example"
                               value={address02}
                               onChange={(e) => setAddress02(e.target.value)}/>
                    </div>

                    {/*Address Line 03*/}
                    <div id="staff-address-line3-div">
                        <label id="lblAddressLine3" htmlFor="txtAddressLine3">Address Line 03 :</label>
                        <input id="txtAddressLine3" className="form-control" type="text"
                               aria-label="default input example"
                               value={address03}
                               onChange={(e) => setAddress03(e.target.value)}/>
                    </div>

                    {/*Address Line 04*/}
                    <div id="staff-address-line4-div">
                        <label id="lblAddressLine4" htmlFor="txtAddressLine4">Address Line 04 :</label>
                        <input id="txtAddressLine4" className="form-control" type="text"
                               aria-label="default input example"
                               value={address04}
                               onChange={(e) => setAddress04(e.target.value)}/>
                    </div>

                    {/*Address Line 05*/}
                    <div id="staff-address-line5-div">
                        <label id="lblAddressLine5" htmlFor="txtAddressLine5">Address Line 05 :</label>
                        <input id="txtAddressLine5" className="form-control" type="text"
                               aria-label="default input example"
                               value={address05}
                               onChange={(e) => setAddress05(e.target.value)}/>
                    </div>

                    {/*Search Fields*/}
                    <div id="search-fields-staff-div">
                        <label id="lblSearchFields-staff" htmlFor="txtSearchFields-staff">Search Fields :</label>
                        <input id="txtSearchFields-staff" className="form-control" type="text"
                               placeholder="Enter field code or name"
                               aria-label="default input example"
                               onChange={(e) => setSearchedField(e.target.value)}/>
                        <button id="btnSearchFields-staff" type="button" className="btn btn-primary" onClick={handleFieldSearch}>Search</button>
                    </div>

                    {/*Fields Code*/}
                    <div id="field-code-staff-div">
                        <label id="lblFieldCode-staff" htmlFor="txtFieldCode-staff">Field Code :</label>
                        <input id="txtFieldCode-staff" className="form-control" type="text"
                               aria-label="default input example"
                               value={fieldCode}
                               onChange={(e) => setFieldCode(e.target.value)}/>
                    </div>

                    {/*Fields Name*/}
                    <div id="field-name-staff-div">
                        <label id="lblFieldName-staff" htmlFor="txtFieldName-staff">Field Name :</label>
                        <input id="txtFieldName-staff" className="form-control" type="text"
                               aria-label="default input example"
                               value={fieldName}
                               onChange={(e) => setFieldName(e.target.value)}/>
                    </div>

                    {/*Buttons*/}
                    <div id="button-div-staff">
                        <button type="button" className="btn btn-primary" id="save-staff" onClick={handleSave}>Save</button>
                        <button type="button" className="btn btn-secondary" id="update-staff">Update</button>
                        <button type="button" className="btn btn-danger" id="delete-staff">Delete</button>
                        <button type="button" className="btn btn-warning" id="clear-staff">Clear</button>
                    </div>
                </div>

                {/*Search Section*/}
                <div id="search-staff-div">
                    {/*Label for Search*/}
                    <label id="lblSearchStaff" htmlFor="txtSearch-staff">Search Staff :</label>
                    <input id="txtSearch-staff" className="form-control" type="text" placeholder="Search by ID or Name"
                           aria-label="default input example"
                           onChange={(e) => setSearchedStaff(e.target.value)}/>
                    {/*Search Button*/}
                    <button id="search-staff" type="button" className="btn btn-primary">Search</button>
                </div>

                {/*Table*/}
                <div className="col-md-12 mt-4" style={{height: '285px', overflowY: 'scroll'}} id="Tbl-staff">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Designation</th>
                            <th>DOB</th>
                            <th>Role</th>
                            <th>Gender</th>
                            <th>Joined Date</th>
                            <th>Address-01</th>
                            <th>Address-02</th>
                            <th>Address-03</th>
                            <th>Address-04</th>
                            <th>Address-05</th>
                            <th>Assigned Field</th>
                        </tr>
                        </thead>
                        <tbody id="staff-table-tb">
                        {staffs.map((staff, index) => (
                            <tr key={index}>
                                <td>{staff.staff_id}</td>
                                <td>{staff.first_name}</td>
                                <td>{staff.last_name}</td>
                                <td>{staff.email}</td>
                                <td>{staff.phone_no}</td>
                                <td>{staff.designation}</td>
                                <td>{staff.dob}</td>
                                <td>{staff.role}</td>
                                <td>{staff.gender}</td>
                                <td>{staff.joined_date}</td>
                                <td>{staff.address_01}</td>
                                <td>{staff.address_02}</td>
                                <td>{staff.address_03}</td>
                                <td>{staff.address_04}</td>
                                <td>{staff.address_05}</td>
                                <td>{staff.field_code}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </section>
        </div>
    );
};