import './Equipment.css'
import './formControll.css'

export const Equipment = () => {
    return (
        <div>
            <section id="equipment-section" className="animate__animated animate__fadeIn">
                {/*Left Card*/}
                <div id="equipment-content-card-left">
                    {/*Equipment Code*/}
                    <div id="equipment-code-div">
                        <label id="lblEquipmentCode" htmlFor="txtEquipmentCode">Equipment Code :</label>
                        <input id="txtEquipmentCode" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Equipment Name*/}
                    <div id="equipment-name-div">
                        <label id="lblEquipmentName" htmlFor="txtEquipmentName">Equipment Name :</label>
                        <input id="txtEquipmentName" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Type*/}
                    <div id="equipment-type-div">
                        <label id="lblType" htmlFor="txtType">Type :</label>
                        <input id="txtType" className="form-control" type="text" aria-label="default input example"/>
                    </div>

                    {/*Status*/}
                    <div id="equipment-status-div">
                        <label htmlFor="txtEquipmentStatus" id="lblEquipmentStatus">Status (Available/Not Available)
                            :</label>
                        <select className="form-select" id="txtEquipmentStatus" required>
                            <option>Available</option>
                            <option>Not Available</option>
                        </select>
                    </div>

                    {/*Search Employees*/}
                    <div id="search-employees-div">
                        <label id="lblSearchEmployees" htmlFor="txtSearchEmployees">Search Employees :</label>
                        <input id="txtSearchEmployees" className="form-control" type="text"
                               placeholder="Enter employee name or ID" aria-label="default input example"/>
                        <button id="btnSearchEmployees" type="button" className="btn btn-primary">Search</button>
                    </div>

                    {/*Member ID*/}
                    <div id="employee-member-id-div">
                        <label id="lblMemberID-equipment" htmlFor="txtMemberID">Member ID :</label>
                        <input id="txtMemberID-equipment" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*First Name*/}
                    <div id="employee-first-name-div">
                        <label id="lblFirstName-equipment" htmlFor="txtFirstName">First Name :</label>
                        <input id="txtFirstName-equipment" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Role*/}
                    <div id="employee-role-div">
                        <label id="lblRole-equipment" htmlFor="txtRole">Role :</label>
                        <input id="txtRole-equipment" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Phone Number*/}
                    <div id="employee-phone-number-div">
                        <label id="lblPhoneNumber-equipment" htmlFor="txtPhoneNumber">Phone Number :</label>
                        <input id="txtPhoneNumber-equipment" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Search Fields*/}
                    <div id="search-fields-equipment-div">
                        <label id="lblSearchFields-equipment" htmlFor="txtSearchFields-equipment">Search Fields
                            :</label>
                        <input id="txtSearchFields-equipment" className="form-control" type="text"
                               placeholder="Enter field code or name" aria-label="default input example"/>
                        <button id="btnSearchFields-equipment" type="button" className="btn btn-primary">Search</button>
                    </div>

                    {/*Field Code*/}
                    <div id="field-code-div">
                        <label id="lblFieldCode" htmlFor="txtFieldCode">Field Code :</label>
                        <input id="txtFieldCode" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Field Name*/}
                    <div id="field-name-equipment-div">
                        <label id="lblFieldName-equipment" htmlFor="txtFieldName">Field Name :</label>
                        <input id="txtFieldName-equipment" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Field Location*/}
                    <div id="field-location-equipment-div">
                        <label id="lblFieldLocation-equipment" htmlFor="txtFieldLocation">Field Location :</label>
                        <input id="txtFieldLocation-equipment" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Buttons*/}
                    <div id="button-div-equipment">
                        <button type="button" className="btn btn-primary" id="save-equipment">Save</button>
                        <button type="button" className="btn btn-secondary" id="update-equipment">Update</button>
                        <button type="button" className="btn btn-danger" id="delete-equipment">Delete</button>
                        <button type="button" className="btn btn-warning" id="clear-equipment">Clear</button>
                    </div>
                </div>

                {/*Search Section*/}
                <div id="search-equipment-div">
                    {/*Label for Search*/}
                    <label id="lblSearchEquipment" htmlFor="txtSearch-equipment">Search Vehicles :</label>
                    <input id="txtSearch-equipment" className="form-control" type="text"
                           placeholder="vehicle code or license plate" aria-label="default input example"/>
                    {/*Search Button*/}
                    <button id="search-equipment" type="button" className="btn btn-primary">Search</button>
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
                        <tr>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </section>
        </div>
    );
};