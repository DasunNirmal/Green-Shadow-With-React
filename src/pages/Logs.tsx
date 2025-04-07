import './Logs.css'
import './formControll.css'
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store/Store.ts";
import FieldLogs from "../models/FieldLogs.ts";
import {searchFields} from "../reducers/FieldsSlice.ts";
import {deleteFieldLogs, getFieldLogs, saveFieldLogs, searchFieldLogs, updateFieldLogs} from "../reducers/FieldLogsSlice.ts";
import CropLogs from "../models/CropLogs.ts";
import {searchCrops} from "../reducers/CropsSlice.ts";
import {deleteCropLogs, getCropLogs, saveCropLogs, searchCropLogs, updateCropLogs} from "../reducers/CropLogsSlice.ts";
import StaffLogs from "../models/StaffLogs.ts";
import {deleteStaffLogs, getStaffLogs, saveStaffLogs, searchStaffLogs, updateStaffLogs} from "../reducers/StaffLogsSlice.ts";
import {searchStaffs} from "../reducers/StaffsSlice.ts";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Logs = () => {

    const dispatch = useDispatch<AppDispatch>();
    const fieldLogs = useSelector((state: { fieldLogs: FieldLogs[]}) => state.fieldLogs);
    const cropLogs = useSelector((state: { cropLogs: CropLogs[]}) => state.cropLogs);
    const staffLogs = useSelector((state: { staffLogs: StaffLogs[]}) => state.staffLogs);

    const [selectedLog, setSelectedLog] = useState('field');
    const [fieldLogCode, setFieldLogCode] = useState('');
    const [fieldLogDetails, setFieldLogDetails] = useState('');
    const [fieldLogImage, setFieldLogImage] = useState<File | undefined>();
    const [fieldLogDate, setFieldLogDate] = useState('');
    const [fieldLocation, setFieldLocation] = useState('');
    const [fieldName, setFieldName] = useState('');
    const [fieldCode, setFieldCode] = useState('');
    const inputRefForFieldImg = useRef<HTMLInputElement>(null);

    const [cropLogCode, setCropLogCode] = useState('');
    const [cropLogDetails, setCropLogDetails] = useState('');
    const [cropLogImage, setCropLogImage] = useState<File | undefined>();
    const [cropLogDate, setCropLogDate] = useState('');
    const [cropName, setCropName] = useState('');
    const [cropCode, setCropCode] = useState('');
    const inputRefForCropImg = useRef<HTMLInputElement>(null);

    const [staffLogCode, setStaffLogCode] = useState('');
    const [staffLogDetails, setStaffLogDetails] = useState('');
    const [staffLogImage, setStaffLogImage] = useState<File | undefined>();
    const [staffLogDate, setStaffLogDate] = useState('');
    const [staffName, setStaffName] = useState('');
    const [staffPhoneNumber, setStaffPhoneNumber] = useState('');
    const [staffID, setStaffID] = useState('');
    const inputRefForStaffImg = useRef<HTMLInputElement>(null);

    const [SearchedCrop, setSearchedCrop] = useState('');
    const [SearchedCropLog, setSearchedCropLog] = useState('');
    const [SearchedStaff, setSearchedStaff] = useState('');
    const [SearchedStaffLog, setSearchedStaffLog] = useState('');
    const [SearchedField, setSearchedField] = useState('');
    const [SearchedFieldLog, setSearchedFieldLog] = useState('');

    useEffect(() => {
        if (fieldLogs.length === 0)
            dispatch(getFieldLogs());
    }, [dispatch, fieldLogs.length]);

    useEffect(() => {
        if (cropLogs.length === 0)
            dispatch(getCropLogs());
    }, [dispatch, cropLogs.length]);

    useEffect(() => {
        if (staffLogs.length === 0)
            dispatch(getStaffLogs());
    }, [dispatch, staffLogs.length]);

    const handleClear = async () => {
        setFieldLogCode('');
        setFieldLogDetails('');
        setFieldLogDate('');
        setFieldLocation('');
        setFieldName('');
        setFieldCode('');
        setCropCode('');
        setCropName('');
        setCropLogCode('');
        setCropLogDetails('');
        setCropLogDate('');
        setSearchedCrop('');
        setSearchedCropLog('');
        setSearchedField('');
        setSearchedFieldLog('');
        setStaffLogCode('');
        setStaffLogDetails('');
        setStaffLogDate('');
        setStaffName('');
        setStaffPhoneNumber('');
        setStaffID('');
        setSearchedStaff('');
        setSearchedStaffLog('');

        if (inputRefForStaffImg.current != null) inputRefForStaffImg.current.value = '';
        if (inputRefForCropImg.current != null) inputRefForCropImg.current.value = '';
        if (inputRefForFieldImg.current != null) inputRefForFieldImg.current.value = '';
    };

    const handleRadioChange = (logType:string) => {
        setSelectedLog(logType);
    }

    const handleFieldSearch = async () => {
        try {
            const fetchedFields = await dispatch(searchFields(SearchedField));
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

    const handleCropSearch = async () => {
        try {
            const fetchedCrops = await dispatch(searchCrops(SearchedCrop));
            if (fetchedCrops.payload) {
                setCropCode(fetchedCrops.payload.crop_code);
                setCropName(fetchedCrops.payload.common_name);
                setSearchedCrop('');
            } else {
                console.warn("No crop data found.");
            }
        } catch (e) {
            console.error("Error fetching crops data:", e);
        }
    };

    const handleStaffSearch = async () => {
        try {
            const fetchedStaffs = await dispatch(searchStaffs(SearchedStaff));
            if (fetchedStaffs.payload) {
                setStaffID(fetchedStaffs.payload.staff_id);
                setStaffName(fetchedStaffs.payload.first_name);
                setStaffPhoneNumber(fetchedStaffs.payload.phone_no);
                setSearchedStaff('');
            } else {
                console.warn("No staff data found.");
            }
        } catch (e) {
            console.error("Error fetching staff data:", e);
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
            toast.success("Data Saved Successfully !");
        } catch (e) {
            console.error("Error saving field logs data:", e);
            if (e instanceof Error) {
                toast.error("Error Saving Data !");
            }
        }
    };

    const handleCropLogsSave = async () => {
        const formData = new FormData();
        formData.append("log_code", cropLogCode);
        formData.append("details", cropLogDetails);
        formData.append("log_date", cropLogDate);
        formData.append("crop_name", cropName);
        formData.append("crop_code", cropCode);
        if (cropLogImage) formData.append("img", cropLogImage);
        try {
            await dispatch(saveCropLogs(formData));
            dispatch(getCropLogs());
            handleClear();
            toast.success("Data Saved Successfully !");
        } catch (e) {
            console.error("Error saving crop logs data:", e);
            if (e instanceof Error) {
                toast.error("Error Saving Data !");
            }
        }
    };

    const handleStaffLogsSave = async () => {
        const formData = new FormData();
        formData.append("log_code", staffLogCode);
        formData.append("details", staffLogDetails);
        formData.append("log_date", staffLogDate);
        formData.append("first_name", staffName);
        formData.append("staff_id", staffID);
        formData.append("phone_no", staffPhoneNumber);
        if (staffLogImage) formData.append("img", staffLogImage);
        try {
            await dispatch(saveStaffLogs(formData));
            dispatch(getStaffLogs());
            handleClear();
            toast.success("Data Saved Successfully !");
        } catch (e) {
            console.error("Error saving staff logs data:", e);
            if (e instanceof Error) {
                toast.error("Error Saving Data !");
            }
        }
    };

    const handleFieldLogsDelete = async () => {
        try {
            await dispatch(deleteFieldLogs(fieldLogCode));
            dispatch(getFieldLogs());
            handleClear();
            toast.success("Data Deleted successfully !");
        } catch (e) {
            console.error("Error deleting field logs data:", e);
            if (e instanceof Error) {
                toast.error("Error Deleting Data !");
            }
        }
    };

    const handleCropLogsDelete = async () => {
        try {
            await dispatch(deleteCropLogs(cropLogCode));
            dispatch(getCropLogs());
            handleClear();
            toast.success("Data Deleted successfully !");
        } catch (e) {
            console.error("Error deleting crop logs data:", e);
            if (e instanceof Error) {
                toast.error("Error Deleting Data !");
            }
        }
    };

    const handleStaffLogsDelete = async () => {
        try {
            await dispatch(deleteStaffLogs(staffLogCode));
            dispatch(getStaffLogs());
            handleClear();
            toast.success("Data Deleted successfully !");
        } catch (e) {
            console.error("Error deleting staff logs data:", e);
            if (e instanceof Error) {
                toast.error("Error Deleting Data !");
            }
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
            handleClear();
            toast.success("Data Updated successfully !");
        } catch (e) {
            console.error("Error updating field logs data:", e);
            if (e instanceof Error) {
                toast.error("Error Updating Data !");
            }
        }
    };

    const handleCropLogsUpdate = async () => {
        const formData = new FormData();
        formData.append("log_code", cropLogCode);
        formData.append("details", cropLogDetails);
        formData.append("log_date", cropLogDate);
        formData.append("crop_name", cropName);
        formData.append("crop_code", cropCode);
        if (cropLogImage) formData.append("img", cropLogImage);
        try {
            await dispatch(updateCropLogs(formData));
            dispatch(getCropLogs());
            toast.success("Data Updated successfully !");
        } catch (e) {
            console.error("Error updating crop logs data:", e);
            if (e instanceof Error) {
                toast.error("Error Updating Data !");
            }
        }
    };

    const handleStaffLogsUpdate = async () => {
        const formData = new FormData();
        formData.append("log_code", staffLogCode);
        formData.append("details", staffLogDetails);
        formData.append("log_date", staffLogDate);
        formData.append("first_name", staffName);
        formData.append("staff_id", staffID);
        formData.append("phone_no", staffPhoneNumber);
        if (staffLogImage) formData.append("img", staffLogImage);
        try {
            await dispatch(updateStaffLogs(formData));
            dispatch(getStaffLogs());
            handleClear();
            toast.success("Data Updated successfully !");
        } catch (e) {
            console.error("Error updating staff logs data:", e);
            if (e instanceof Error) {
                toast.error("Error Updating Data !");
            }
        }
    }

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

    const handleCropLogsSearch = async () => {
        try {
            const fetchedCrops = await dispatch(searchCropLogs(SearchedCropLog));
            if (fetchedCrops.payload) {
                setCropLogCode(fetchedCrops.payload.log_code);
                setCropLogDetails(fetchedCrops.payload.details);
                setCropLogDate(fetchedCrops.payload.log_date);
                setCropName(fetchedCrops.payload.crop_name);
                setCropCode(fetchedCrops.payload.crop_code);
                setSearchedCropLog('');
            } else {
                console.warn("No crop data found.");
            }
        } catch (e) {
            console.error("Error fetching crops data:", e);
        }
    };

    const handleStaffLogsSearch = async () => {
        try {
            const fetchedStaffs = await dispatch(searchStaffLogs(SearchedStaffLog));
            if (fetchedStaffs.payload) {
                setStaffLogCode(fetchedStaffs.payload.log_code);
                setStaffLogDetails(fetchedStaffs.payload.details);
                setStaffLogDate(fetchedStaffs.payload.log_date);
                setStaffName(fetchedStaffs.payload.first_name);
                setStaffID(fetchedStaffs.payload.staff_id);
                setStaffPhoneNumber(fetchedStaffs.payload.phone_no);
                setSearchedStaffLog('');
            } else {
                console.warn("No staff data found.");
            }
        } catch (e) {
            console.error("Error fetching staffs data:", e);
        }
    }

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
                    <ToastContainer/>
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
                                   aria-label="default input example"
                                   value={cropLogCode}
                                   onChange={(e) => setCropLogCode(e.target.value)}/>
                        </div>

                        {/*Search Crops*/}
                        <div id="search-crops-logs-div">
                            <label id="lblSearchCropsLogs" htmlFor="txtSearchCropsLogs">Search Crops :</label>
                            <input id="txtSearchCropsLogs" className="form-control" type="text"
                                   placeholder="Enter crop code or name"
                                   aria-label="default input example"
                                   value={SearchedCrop}
                                   onChange={(e) => setSearchedCrop(e.target.value)}/>
                            <button id="btnSearchCropsLogs" type="button" className="btn btn-primary" onClick={handleCropSearch}>Search
                            </button>
                        </div>

                        {/*Crop Code*/}
                        <div id="crop-code-logs-div">
                            <label id="lblCropCodeLogs" htmlFor="txtCropCode">Crop Code :</label>
                            <input id="txtCropCodeLogs" className="form-control" type="text"
                                   aria-label="default input example"
                                   value={cropCode}
                                   onChange={(e) => setCropCode(e.target.value)}/>
                        </div>

                        {/*Crop Name*/}
                        <div id="crop-name-logs-div">
                            <label id="lblCropNameLogs" htmlFor="txtCropNameLogs">Crop Name :</label>
                            <input id="txtCropNameLogs" className="form-control" type="text"
                                   aria-label="default input example"
                                   value={cropName}
                                   onChange={(e) => setCropName(e.target.value)}/>
                        </div>

                        {/*Date*/}
                        <div id="log-date-crop-div">
                            <label id="lblLogDateCrop" htmlFor="txtLogDate">Date :</label>
                            <input id="txtLogDateCrop" className="form-control" type="date"
                                   aria-label="default input example"
                                   value={cropLogDate}
                                   onChange={(e) => setCropLogDate(e.target.value)}/>
                        </div>

                        {/*Details*/}
                        <div id="crop-details-div">
                            <label id="lblCropDetails" htmlFor="txtCropDetails">Details :</label>
                            <textarea id="txtCropDetails" className="form-control" rows={3}
                                      placeholder="Enter details here"
                                      aria-label="default input example"
                                      value={cropLogDetails}
                                      onChange={(e) => setCropLogDetails(e.target.value)}></textarea>
                        </div>

                        {/*Image*/}
                        <div id="log-image-crop-div">
                            <label id="lblLogImageCrop" htmlFor="txtLogImageCrop">Image :</label>
                            <input id="txtLogImageCrop" className="form-control" type="file"
                                   aria-label="default input example"
                                   ref={inputRefForCropImg}
                                   onChange={(e) => {
                                    const input = e.target as HTMLInputElement;
                                    if (input.files)
                                    setCropLogImage(e.target.files?.[0])
                                   }}/>
                        </div>

                        {/*Buttons*/}
                        <div id="button-div-crop-logs">
                            <button type="button" className="btn btn-primary" id="save-crop-logs" onClick={handleCropLogsSave}>Save</button>
                            <button type="button" className="btn btn-secondary" id="update-crop-logs" onClick={handleCropLogsUpdate}>Update</button>
                            <button type="button" className="btn btn-danger" id="delete-crop-logs" onClick={handleCropLogsDelete}>Delete</button>
                            <button type="button" className="btn btn-warning" id="clear-crop-logs" onClick={handleClear}>Clear</button>
                        </div>
                    </div>
                    <ToastContainer/>
                    {/*Search Section*/}
                    <div id="search-crop-logs-tbl-div">
                        {/*Label for Search*/}
                        <label id="lblSearchCropLogs" htmlFor="txtSearch-crop-logs">Search Crops :</label>
                        <input id="txtSearch-crop-logs" className="form-control" type="text"
                               placeholder="log code or crop name"
                               aria-label="default input example"
                               value={SearchedCropLog}
                               onChange={(e) => setSearchedCropLog(e.target.value)}/>
                        {/*Search Button*/}
                        <button id="search-crop-logs" type="button" className="btn btn-primary" onClick={handleCropLogsSearch}>Search</button>
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
                            {cropLogs.map((cropLog, index) => (
                                <tr key={index}>
                                    <td>{cropLog.log_code}</td>
                                    <td>{cropLog.crop_code}</td>
                                    <td>{cropLog.crop_name}</td>
                                    <td>{cropLog.details}</td>
                                    <td>{cropLog.log_date}</td>
                                    <td><img src={`data:image/png;base64,${cropLog.img}`} width="140"/></td>
                                </tr>
                            ))}
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
                                   aria-label="default input example"
                                   value={staffLogCode}
                                   onChange={(e) => setStaffLogCode(e.target.value)}/>
                        </div>

                        {/*Search Members*/}
                        <div id="search-members-logs-div">
                            <label id="lblSearchMembersLogs" htmlFor="txtSearchMembersLogs">Search Members :</label>
                            <input id="txtSearchMembersLogs" className="form-control" type="text"
                                   placeholder="Enter member ID or name"
                                   aria-label="default input example"
                                   value={SearchedStaff}
                                   onChange={(e) => setSearchedStaff(e.target.value)}/>
                            <button id="btnSearchMembersLogs" type="button" className="btn btn-primary" onClick={handleStaffSearch}>Search</button>
                        </div>

                        {/*Member ID*/}
                        <div id="member-id-logs-div">
                            <label id="lblMemberIDLogs" htmlFor="txtMemberIDLogs">Member ID :</label>
                            <input id="txtMemberIDLogs" className="form-control" type="text"
                                   aria-label="default input example"
                                   value={staffID}
                                   onChange={(e) => setStaffID(e.target.value)}/>
                        </div>

                        {/*First Name*/}
                        <div id="first-name-logs-div">
                            <label id="lblFirstNameLogs" htmlFor="txtFirstNameLogs">First Name :</label>
                            <input id="txtFirstNameLogs" className="form-control" type="text"
                                   aria-label="default input example"
                                   value={staffName}
                                   onChange={(e) => setStaffName(e.target.value)}/>
                        </div>

                        {/*Phone Number*/}
                        <div id="phone-number-logs-div">
                            <label id="lblPhoneNumberLogs" htmlFor="txtPhoneNumberLogs">Phone Number :</label>
                            <input id="txtPhoneNumberLogs" className="form-control" type="text"
                                   aria-label="default input example"
                                   value={staffPhoneNumber}
                                   onChange={(e) => setStaffPhoneNumber(e.target.value)}/>
                        </div>

                        {/*Details*/}
                        <div id="staff-details-div">
                            <label id="lblStaffDetails" htmlFor="txtStaffDetails">Details :</label>
                            <textarea id="txtStaffDetails" className="form-control" rows={3}
                                      placeholder="Enter details here"
                                      aria-label="default input example"
                                      value={staffLogDetails}
                                      onChange={(e) => setStaffLogDetails(e.target.value)}></textarea>
                        </div>

                        {/*Date*/}
                        <div id="log-date-staff-div">
                            <label id="lblLogDateStaff" htmlFor="txtLogDateStaff">Date :</label>
                            <input id="txtLogDateStaff" className="form-control" type="date"
                                   aria-label="default input example"
                                   value={staffLogDate}
                                   onChange={(e) => setStaffLogDate(e.target.value)}/>
                        </div>

                        {/*Image*/}
                        <div id="log-image-staff-div">
                            <label id="lblLogImageStaff" htmlFor="txtLogImageStaff">Image :</label>
                            <input id="txtLogImageStaff" className="form-control" type="file"
                                   aria-label="default input example"
                                   ref={inputRefForStaffImg}
                                   onChange={(e) => {
                                    const input = e.target as HTMLInputElement;
                                    if (input.files)
                                    setStaffLogImage(e.target.files?.[0])
                                   }}/>
                        </div>

                        {/*Buttons*/}
                        <div id="button-div-staff-logs">
                            <button type="button" className="btn btn-primary" id="save-staff-logs" onClick={handleStaffLogsSave}>Save</button>
                            <button type="button" className="btn btn-secondary" id="update-staff-logs" onClick={handleStaffLogsUpdate}>Update</button>
                            <button type="button" className="btn btn-danger" id="delete-staff-logs" onClick={handleStaffLogsDelete}>Delete</button>
                            <button type="button" className="btn btn-warning" id="clear-staff-logs" onClick={handleClear}>Clear</button>
                        </div>
                    </div>
                    <ToastContainer/>
                    {/*Search Section*/}
                    <div id="search-staff-logs-tbl-div">
                        {/*Label for Search*/}
                        <label id="lblSearchStaffLogs" htmlFor="txtSearch-staff-logs">Search Members :</label>
                        <input id="txtSearch-staff-logs" className="form-control" type="text"
                               placeholder="Log code or member name"
                               aria-label="default input example"
                               value={SearchedStaffLog}
                               onChange={(e) => setSearchedStaffLog(e.target.value)}/>
                        {/*Search Button*/}
                        <button id="search-staff-logs" type="button" className="btn btn-primary" onClick={handleStaffLogsSearch}>Search</button>
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
                            {staffLogs.map((staffLog, index) => (
                                <tr key={index}>
                                    <td>{staffLog.log_code}</td>
                                    <td>{staffLog.staff_id}</td>
                                    <td>{staffLog.first_name}</td>
                                    <td>{staffLog.phone_no}</td>
                                    <td>{staffLog.details}</td>
                                    <td>{staffLog.log_date}</td>
                                    <td><img src={`data:image/png;base64,${staffLog.img}`} width="140"/></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>}
            </section>
        </div>
    );
};