import './Staff.css'
import './formControll.css'

export const Staff = () => {
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
                               aria-label="default input example"/>
                    </div>

                    {/*First Name*/}
                    <div id="staff-first-name-div">
                        <label id="lblFirstName" htmlFor="txtFirstName">First Name :</label>
                        <input id="txtFirstName" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Last Name*/}
                    <div id="staff-last-name-div">
                        <label id="lblLastName" htmlFor="txtLastName">Last Name :</label>
                        <input id="txtLastName" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Email*/}
                    <div id="staff-email-div">
                        <label id="lblEmail" htmlFor="txtEmail">Email :</label>
                        <input id="txtEmail" className="form-control" type="email" aria-label="default input example"/>
                    </div>

                    {/*Phone Number*/}
                    <div id="staff-phone-div">
                        <label id="lblPhoneNumber" htmlFor="txtPhoneNumber">Phone Number :</label>
                        <input id="txtPhoneNumber" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Designation*/}
                    <div id="staff-designation-div">
                        <label id="lblDesignation" htmlFor="txtDesignation">Designation :</label>
                        <input id="txtDesignation" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Date of Birth*/}
                    <div id="staff-dob-div">
                        <label id="lblDateOfBirth" htmlFor="txtDateOfBirth">Date of Birth :</label>
                        <input id="txtDateOfBirth" className="form-control" type="date"
                               aria-label="default input example"/>
                    </div>

                    {/*Role*/}
                    <div id="staff-role-div">
                        <label id="lblRole" htmlFor="txtRole">Role :</label>
                        <input id="txtRole" className="form-control" type="text" aria-label="default input example"/>
                    </div>

                    {/*Gender*/}
                    <div id="staff-gender-div">
                        <label id="lblGender" htmlFor="txtGender">Gender :</label>
                        <input id="txtGender" className="form-control" type="text" aria-label="default input example"/>
                    </div>

                    {/*Joined Date*/}
                    <div id="staff-joined-div">
                        <label id="lblJoinedDate" htmlFor="txtJoinedDate">Joined Date :</label>
                        <input id="txtJoinedDate" className="form-control" type="date"
                               aria-label="default input example"/>
                    </div>

                    {/*Address Line 01*/}
                    <div id="staff-address-line1-div">
                        <label id="lblAddressLine1" htmlFor="txtAddressLine1">Address Line 01 :</label>
                        <input id="txtAddressLine1" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Address Line 02*/}
                    <div id="staff-address-line2-div">
                        <label id="lblAddressLine2" htmlFor="txtAddressLine2">Address Line 02 :</label>
                        <input id="txtAddressLine2" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Address Line 03*/}
                    <div id="staff-address-line3-div">
                        <label id="lblAddressLine3" htmlFor="txtAddressLine3">Address Line 03 :</label>
                        <input id="txtAddressLine3" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Address Line 04*/}
                    <div id="staff-address-line4-div">
                        <label id="lblAddressLine4" htmlFor="txtAddressLine4">Address Line 04 :</label>
                        <input id="txtAddressLine4" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Address Line 05*/}
                    <div id="staff-address-line5-div">
                        <label id="lblAddressLine5" htmlFor="txtAddressLine5">Address Line 05 :</label>
                        <input id="txtAddressLine5" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Search Fields*/}
                    <div id="search-fields-staff-div">
                        <label id="lblSearchFields-staff" htmlFor="txtSearchFields-staff">Search Fields :</label>
                        <input id="txtSearchFields-staff" className="form-control" type="text"
                               placeholder="Enter field code or name" aria-label="default input example"/>
                        <button id="btnSearchFields-staff" type="button" className="btn btn-primary">Search</button>
                    </div>

                    {/*Fields Code*/}
                    <div id="field-code-staff-div">
                        <label id="lblFieldCode-staff" htmlFor="txtFieldCode-staff">Field Code :</label>
                        <input id="txtFieldCode-staff" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Fields Name*/}
                    <div id="field-name-staff-div">
                        <label id="lblFieldName-staff" htmlFor="txtFieldName-staff">Field Name :</label>
                        <input id="txtFieldName-staff" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Buttons*/}
                    <div id="button-div-staff">
                        <button type="button" className="btn btn-primary" id="save-staff">Save</button>
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
                           aria-label="default input example"/>
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
                        <tr>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </section>
        </div>
    );
};