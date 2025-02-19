import './Logs.css'
import './formControll.css'
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store/Store.ts";
import FieldLogs from "../models/FieldLogs.ts";
import {searchFields} from "../reducers/FieldsSlice.ts";
import {
    deleteFieldLogs,
    getFieldLogs,
    saveFieldLogs,
    searchFieldLogs,
    updateFieldLogs
} from "../reducers/FieldLogsSlice.ts";

export const Logs = () => {

    const dispatch = useDispatch<AppDispatch>();
    const fieldLogs = useSelector((state: { fieldLogs: FieldLogs[]}) => state.fieldLogs);

    const [selectedLog, setSelectedLog] = useState('field');
    const [fieldLogCode, setFieldLogCode] = useState('');
    const [fieldLogDetails, setFieldLogDetails] = useState('');
    const [fieldLogImage, setFieldLogImage] = useState<File | undefined>();
    const [fieldLogDate, setFieldLogDate] = useState('');
    const [fieldLocation, setFieldLocation] = useState('');
    const [fieldName, setFieldName] = useState('');
    const [fieldCode, setFieldCode] = useState('');
    const inputRefForFieldImg = useRef<HTMLInputElement>(null);

    const [SearchedCrop, setSearchedCrop] = useState('');
    const [SearchedField, setSearchedField] = useState('');
    const [SearchedFieldLog, setSearchedFieldLog] = useState('');

    useEffect(() => {
        if (fieldLogs.length === 0)
            dispatch(getFieldLogs());
    }, [dispatch, fieldLogs.length]);

    const handleClear = async () => {
        setFieldLogCode('');
        setFieldLogDetails('');
        setFieldLogDate('');
        setFieldLocation('');
        setFieldName('');
        setFieldCode('');
        if (inputRefForFieldImg.current != null) inputRefForFieldImg.current.value = '';
    };

    const handleRadioChange = (logType:string) => {
        setSelectedLog(logType);
    }

    const handleFieldSearch = async () => {
        try {
            const fetchedFields = await dispatch(searchFields(SearchedFieldLog));
            if (fetchedFields.payload) {
                setFieldCode(fetchedFields.payload.field_code);
                setFieldName(fetchedFields.payload.field_name);
                setFieldLocation(fetchedFields.payload.field_location);
            } else {
                console.warn("No field data found.");
            }
        } catch (e) {
            console.error("Error fetching fields data:", e);
        }
    };

    const handleFieldLogsSave = async () => {
        const formData = new FormData();
        formData.append("log_code", fieldLogCode);
        formData.append("details", fieldLogDetails);
        formData.append("log_date", fieldLogDate);
        formData.append("field_location", fieldLocation);
        formData.append("field_name", fieldName);
        formData.append("field_code", fieldCode);
        if (fieldLogImage) formData.append("img", fieldLogImage);
        try {
            await dispatch(saveFieldLogs(formData));
            dispatch(getFieldLogs());
            handleClear();
            console.log("Field Logs data saved successfully.");
        } catch (e) {
            console.error("Error saving field logs data:", e);
        }
    };

    const handleFieldLogsDelete = async () => {
        try {
            await dispatch(deleteFieldLogs(fieldLogCode));
            dispatch(getFieldLogs());
            handleClear();
            console.log("Field Logs data deleted successfully.");
        } catch (e) {
            console.error("Error deleting field logs data:", e);
        }
    };

    const handleFieldLogsUpdate = async () => {
        const formData = new FormData();
        formData.append("log_code", fieldLogCode);
        formData.append("details", fieldLogDetails);
        formData.append("log_date", fieldLogDate);
        formData.append("field_location", fieldLocation);
        formData.append("field_name", fieldName);
        formData.append("field_code", fieldCode);
        if (fieldLogImage) formData.append("img", fieldLogImage);
        try {
            await dispatch(updateFieldLogs(formData));
            dispatch(getFieldLogs());
            console.log("Field Logs data updated successfully.");
        } catch (e) {
            console.error("Error updating field logs data:", e);
        }
    };

    const handleFieldLogsSearch = async () => {
        try {
            const fetchedFields = await dispatch(searchFieldLogs(SearchedFieldLog));
            if (fetchedFields.payload) {
                setFieldLogCode(fetchedFields.payload.log_code);
                setFieldLogDetails(fetchedFields.payload.details);
                setFieldLogDate(fetchedFields.payload.log_date);
                setFieldLocation(fetchedFields.payload.field_location);
                setFieldName(fetchedFields.payload.field_name);
                setFieldCode(fetchedFields.payload.field_code);
                setSearchedFieldLog('');
            } else {
                console.warn("No field data found.");
            }
        } catch (e) {
            console.error("Error fetching fields data:", e);
        }
    };

    return (
        <div>
            <section id="logs-section" className="animate__animated animate__fadeIn">
                <div id="select-logs-div">
                    <div className="form-check" id="field-log">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="field-log-button"
                               onClick={() => handleRadioChange('field')} checked={selectedLog === 'field'} onChange={() => {}}/>
                        <label className="form-check-label" htmlFor="field-log-button">
                            Fields Logs
                        </label>
                    </div>
                    <div className="form-check" id="crop-log">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="crop-log-button"
                               onClick={() => handleRadioChange('crop')} onChange={() => {}}/>
                        <label className="form-check-label" htmlFor="crop-log-button">
                            Crops Logs
                        </label>
                    </div>
                    <div className="form-check" id="staff-log">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="staff-log-button"
                               onClick={() => handleRadioChange('staff')} onChange={() => {}}/>
                        <label className="form-check-label" htmlFor="staff-log-button">
                            Staff Logs
                        </label>
                    </div>
                </div>

                {selectedLog === 'field' && <div id="field-log-section">
                    {/*Left Card*/}
                    <div id="field-logs-content-card-left">
                        {/*Log Code*/}
                        <div id="log-code-div">
                            <label id="lblLogCode" htmlFor="txtLogCode">Log Code :</label>
                            <input id="txtLogCode" className="form-control" type="text"
                                   aria-label="default input example"
                                   value={fieldLogCode}
                                   onChange={(e) => setFieldLogCode(e.target.value)}/>
                        </div>

                        {/*Search Fields*/}
                        <div id="search-fields-logs-div">
                            <label id="lblSearchFieldsLogs" htmlFor="txtSearchFieldsLogs">Search Fields :</label>
                            <input id="txtSearchFieldsLogs" className="form-control" type="text"
                                   placeholder="Enter field code or name"
                                   aria-label="default input example"
                                   value={SearchedField}
                                   onChange={(e) => setSearchedField(e.target.value)}/>
                            <button id="btnSearchFieldsLogs" type="button" className="btn btn-primary" onClick={handleFieldSearch}>Search
                            </button>
                        </div>

                        {/*Fields Code*/}
                        <div id="field-code-logs-div">
                            <label id="lblFieldCodeLogs" htmlFor="txtFieldCode">Field Code :</label>
                            <input id="txtFieldCodeLogs" className="form-control" type="text"
                                   aria-label="default input example"
                                   value={fieldCode}
                                   onChange={(e) => setFieldCode(e.target.value)}/>
                        </div>

                        {/*Fields Name*/}
                        <div id="field-name-logs-div">
                            <label id="lblFieldNameLogs" htmlFor="txtFieldName">Field Name :</label>
                            <input id="txtFieldNameLogs" className="form-control" type="text"
                                   aria-label="default input example"
                                   value={fieldName}
                                   onChange={(e) => setFieldName(e.target.value)}/>
                        </div>

                        {/*Fields Location*/}
                        <div id="field-location-logs-div">
                            <label id="lblFieldLocationLogs" htmlFor="txtFieldLocation">Field Location :</label>
                            <input id="txtFieldLocationLogs" className="form-control" type="text"
                                   aria-label="default input example"
                                   value={fieldLocation}
                                   onChange={(e) => setFieldLocation(e.target.value)}/>
                        </div>

                        {/*Details*/}
                        <div id="field-details-div">
                            <label id="lblFieldDetails" htmlFor="txtFieldDetails">Details :</label>
                            <textarea id="txtFieldDetails" className="form-control" rows={3}
                                      placeholder="Enter details here"
                                      aria-label="default input example"
                                      value={fieldLogDetails}
                                      onChange={(e) => setFieldLogDetails(e.target.value)}></textarea>
                        </div>

                        {/*Date*/}
                        <div id="log-date-div">
                            <label id="lblLogDate" htmlFor="txtLogDate">Date :</label>
                            <input id="txtLogDate" className="form-control" type="date"
                                   aria-label="default input example"
                                   value={fieldLogDate}
                                   onChange={(e) => setFieldLogDate(e.target.value)}/>
                        </div>

                        {/*Image*/}
                        <div id="log-image-div">
                            <label id="lblLogImage" htmlFor="txtLogImage">Image :</label>
                            <input id="txtLogImage" className="form-control" type="file"
                                   aria-label="default input example"
                            ref={inputRefForFieldImg}
                            onChange={(e) => {
                                const input = e.target as HTMLInputElement;
                                if (input.files)
                                setFieldLogImage(e.target.files?.[0])}}/>
                        </div>

                        {/*Buttons*/}
                        <div id="button-div-field-logs">
                            <button type="button" className="btn btn-primary" id="save-field-logs" onClick={handleFieldLogsSave}>Save</button>
                            <button type="button" className="btn btn-secondary" id="update-field-logs" onClick={handleFieldLogsUpdate}>Update</button>
                            <button type="button" className="btn btn-danger" id="delete-field-logs" onClick={handleFieldLogsDelete}>Delete</button>
                            <button type="button" className="btn btn-warning" id="clear-field-logs" onClick={handleClear}>Clear</button>
                        </div>
                    </div>

                    {/*Search Section*/}
                    <div id="search-field-logs-tbl-div">
                        {/*Label for Search*/}
                        <label id="lblSearchFieldLogs" htmlFor="txtSearch-field-logs">Search Logs :</label>
                        <input id="txtSearch-field-logs" className="form-control" type="text"
                               placeholder="log code or field name"
                               aria-label="default input example"
                        value={SearchedFieldLog}
                        onChange={(e) => setSearchedFieldLog(e.target.value)}/>
                        {/*Search Button*/}
                        <button id="search-field-logs" type="button" className="btn btn-primary" onClick={handleFieldLogsSearch}>Search</button>
                    </div>

                    {/*Table*/}
                    <div className="col-md-12 mt-4" style={{height: '285px', overflowY: 'scroll'}}
                         id="Tbl-field-logs">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>Log Code</th>
                                <th>Field Code</th>
                                <th>Field Name</th>
                                <th>Field Location</th>
                                <th>Details</th>
                                <th>Date</th>
                                <th>Image</th>
                            </tr>
                            </thead>
                            <tbody id="field-logs-table-tb">
                            {fieldLogs.map((fieldLog, index) => (
                                <tr key={index}>
                                    <td>{fieldLog.log_code}</td>
                                    <td>{fieldLog.field_code}</td>
                                    <td>{fieldLog.field_name}</td>
                                    <td>{fieldLog.field_location}</td>
                                    <td>{fieldLog.details}</td>
                                    <td>{fieldLog.log_date}</td>
                                    <td><img src={`data:image/png;base64,${fieldLog.img}`} width="140"/></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>}
                {selectedLog === 'crop' && <div id="crop-log-section">
                    {/*Left Card*/}
                    <div id="crop-logs-content-card-left">
                        {/*Log Code*/}
                        <div id="log-code-crop-div">
                            <label id="lblLogCodeCrop" htmlFor="txtLogCode">Log Code :</label>
                            <input id="txtLogCodeCrop" className="form-control" type="text"
                                   aria-label="default input example"/>
                        </div>

                        {/*Search Crops*/}
                        <div id="search-crops-logs-div">
                            <label id="lblSearchCropsLogs" htmlFor="txtSearchCropsLogs">Search Crops :</label>
                            <input id="txtSearchCropsLogs" className="form-control" type="text"
                                   placeholder="Enter crop code or name" aria-label="default input example"/>
                            <button id="btnSearchCropsLogs" type="button" className="btn btn-primary">Search
                            </button>
                        </div>

                        {/*Crop Code*/}
                        <div id="crop-code-logs-div">
                            <label id="lblCropCodeLogs" htmlFor="txtCropCode">Crop Code :</label>
                            <input id="txtCropCodeLogs" className="form-control" type="text"
                                   aria-label="default input example"/>
                        </div>

                        {/*Crop Name*/}
                        <div id="crop-name-logs-div">
                            <label id="lblCropNameLogs" htmlFor="txtCropNameLogs">Crop Name :</label>
                            <input id="txtCropNameLogs" className="form-control" type="text"
                                   aria-label="default input example"/>
                        </div>

                        {/*Date*/}
                        <div id="log-date-crop-div">
                            <label id="lblLogDateCrop" htmlFor="txtLogDate">Date :</label>
                            <input id="txtLogDateCrop" className="form-control" type="date"
                                   aria-label="default input example"/>
                        </div>

                        {/*Details*/}
                        <div id="crop-details-div">
                            <label id="lblCropDetails" htmlFor="txtCropDetails">Details :</label>
                            <textarea id="txtCropDetails" className="form-control" rows={3}
                                      placeholder="Enter details here"
                                      aria-label="default input example"></textarea>
                        </div>

                        {/*Image*/}
                        <div id="log-image-crop-div">
                            <label id="lblLogImageCrop" htmlFor="txtLogImageCrop">Image :</label>
                            <input id="txtLogImageCrop" className="form-control" type="file"
                                   aria-label="default input example"/>
                        </div>

                        {/*Buttons*/}
                        <div id="button-div-crop-logs">
                            <button type="button" className="btn btn-primary" id="save-crop-logs">Save</button>
                            <button type="button" className="btn btn-secondary" id="update-crop-logs">Update
                            </button>
                            <button type="button" className="btn btn-danger" id="delete-crop-logs">Delete</button>
                            <button type="button" className="btn btn-warning" id="clear-crop-logs">Clear</button>
                        </div>
                    </div>

                    {/*Search Section*/}
                    <div id="search-crop-logs-tbl-div">
                        {/*Label for Search*/}
                        <label id="lblSearchCropLogs" htmlFor="txtSearch-crop-logs">Search Crops :</label>
                        <input id="txtSearch-crop-logs" className="form-control" type="text"
                               placeholder="log code or crop name" aria-label="default input example"/>
                        {/*Search Button*/}
                        <button id="search-crop-logs" type="button" className="btn btn-primary">Search</button>
                    </div>

                    {/*Table*/}
                    <div className="col-md-12 mt-4" style={{height: '285px', overflowY: 'scroll'}}
                         id="Tbl-crop-logs">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>Log Code</th>
                                <th>Crop Code</th>
                                <th>Crop Name</th>
                                <th>Details</th>
                                <th>Date</th>
                                <th>Image</th>
                            </tr>
                            </thead>
                            <tbody id="crop-logs-table-tb">
                            <tr>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>}
                {selectedLog === 'staff' && <div id="staff-log-section">
                    {/*Left Card*/}
                    <div id="staff-logs-content-card-left">
                        {/*Log Code*/}
                        <div id="log-code-staff-div">
                            <label id="lblLogCodeStaff" htmlFor="txtLogCodeStaff">Log Code :</label>
                            <input id="txtLogCodeStaff" className="form-control" type="text"
                                   aria-label="default input example"/>
                        </div>

                        {/*Search Members*/}
                        <div id="search-members-logs-div">
                            <label id="lblSearchMembersLogs" htmlFor="txtSearchMembersLogs">Search Members :</label>
                            <input id="txtSearchMembersLogs" className="form-control" type="text"
                                   placeholder="Enter member ID or name" aria-label="default input example"/>
                            <button id="btnSearchMembersLogs" type="button" className="btn btn-primary">Search
                            </button>
                        </div>

                        {/*Member ID*/}
                        <div id="member-id-logs-div">
                            <label id="lblMemberIDLogs" htmlFor="txtMemberIDLogs">Member ID :</label>
                            <input id="txtMemberIDLogs" className="form-control" type="text"
                                   aria-label="default input example"/>
                        </div>

                        {/*First Name*/}
                        <div id="first-name-logs-div">
                            <label id="lblFirstNameLogs" htmlFor="txtFirstNameLogs">First Name :</label>
                            <input id="txtFirstNameLogs" className="form-control" type="text"
                                   aria-label="default input example"/>
                        </div>

                        {/*Phone Number*/}
                        <div id="phone-number-logs-div">
                            <label id="lblPhoneNumberLogs" htmlFor="txtPhoneNumberLogs">Phone Number :</label>
                            <input id="txtPhoneNumberLogs" className="form-control" type="text"
                                   aria-label="default input example"/>
                        </div>

                        {/*Details*/}
                        <div id="staff-details-div">
                            <label id="lblStaffDetails" htmlFor="txtStaffDetails">Details :</label>
                            <textarea id="txtStaffDetails" className="form-control" rows={3}
                                      placeholder="Enter details here"
                                      aria-label="default input example"></textarea>
                        </div>

                        {/*Date*/}
                        <div id="log-date-staff-div">
                            <label id="lblLogDateStaff" htmlFor="txtLogDateStaff">Date :</label>
                            <input id="txtLogDateStaff" className="form-control" type="date"
                                   aria-label="default input example"/>
                        </div>

                        {/*Image*/}
                        <div id="log-image-staff-div">
                            <label id="lblLogImageStaff" htmlFor="txtLogImageStaff">Image :</label>
                            <input id="txtLogImageStaff" className="form-control" type="file"
                                   aria-label="default input example"/>
                        </div>

                        {/*Buttons*/}
                        <div id="button-div-staff-logs">
                            <button type="button" className="btn btn-primary" id="save-staff-logs">Save</button>
                            <button type="button" className="btn btn-secondary" id="update-staff-logs">Update
                            </button>
                            <button type="button" className="btn btn-danger" id="delete-staff-logs">Delete</button>
                            <button type="button" className="btn btn-warning" id="clear-staff-logs">Clear</button>
                        </div>
                    </div>

                    {/*Search Section*/}
                    <div id="search-staff-logs-tbl-div">
                        {/*Label for Search*/}
                        <label id="lblSearchStaffLogs" htmlFor="txtSearch-staff-logs">Search Members :</label>
                        <input id="txtSearch-staff-logs" className="form-control" type="text"
                               placeholder="Log code or member name" aria-label="default input example"/>
                        {/*Search Button*/}
                        <button id="search-staff-logs" type="button" className="btn btn-primary">Search</button>
                    </div>

                    {/*Table*/}
                    <div className="col-md-12 mt-4" style={{height: '285px', overflowY: 'scroll'}}
                         id="Tbl-staff-logs">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>Log Code</th>
                                <th>Member ID</th>
                                <th>First Name</th>
                                <th>Phone Number</th>
                                <th>Details</th>
                                <th>Date</th>
                                <th>Image</th>
                            </tr>
                            </thead>
                            <tbody id="staff-logs-table-tb">
                            <tr>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>}
            </section>
        </div>
    );
};