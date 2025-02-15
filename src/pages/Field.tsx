import './Field.css'
import './formControll.css'
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Fields} from "../models/Fields.ts";
import {AppDispatch} from "../store/Store.ts";
import {deleteFields, getFields, saveFields, searchFields, updateFields} from "../reducers/FieldsSlice.ts";

export const Field = () => {

    const dispatch = useDispatch<AppDispatch>();
    const fields = useSelector((state: { fields: Fields[] }) => state.fields);

    const [fieldID, setFieldID] = useState('');
    const [fieldName, setFieldName] = useState('');
    const [fieldLocation, setFieldLocation] = useState('');
    const [fieldSize, setFieldSize] = useState('');
    const [fieldImage_1, setFieldImage_1] = useState<File | undefined>();
    const [fieldImage_2, setFieldImage_2] = useState<File | undefined>();
    const [SearchedField, setSearchedField] = useState('');
    const inputRefForImg_01 = useRef<HTMLInputElement>(null);
    const inputRefForImg_02 = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (fields.length === 0)
        dispatch(getFields());
    },[dispatch,fields.length]);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("field_code", fieldID);
        formData.append("field_name", fieldName);
        formData.append("field_location", fieldLocation);
        formData.append("extent_size", fieldSize);

        if (fieldImage_1) formData.append("img_01", fieldImage_1);
        if (fieldImage_2) formData.append("img_02", fieldImage_2);

        try {
            await dispatch(saveFields(formData));
            dispatch(getFields());
            console.log("Field data saved successfully.");
        } catch (e) {
            console.error("Error saving field data:", e);
        }
    };

    const handleDelete = async () => {
        try {
            await dispatch(deleteFields(fieldID));
            dispatch(getFields());
            console.log("Field data deleted successfully.");
        } catch (e) {
            console.error("Error deleting field data:", e);
        }
    };

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append("field_code", fieldID);
        formData.append("field_name", fieldName);
        formData.append("field_location", fieldLocation);
        formData.append("extent_size", fieldSize);
        if (fieldImage_1) formData.append("img_01", fieldImage_1);
        if (fieldImage_2) formData.append("img_02", fieldImage_2);
        try {
            await dispatch(updateFields(formData));
            dispatch(getFields());
            console.log("Field data updated successfully.");
        } catch (e) {
            console.error("Error updating field data:", e);
        }
    };

    const handleSearch = async () => {
        try {
            const fetchedFields = await dispatch(searchFields(SearchedField));
            if (fetchedFields.payload) {
                setFieldID(fetchedFields.payload.field_code);
                setFieldName(fetchedFields.payload.field_name);
                setFieldLocation(fetchedFields.payload.field_location);
                setFieldSize(fetchedFields.payload.extent_size);
            } else {
                console.warn("No field data found.");
            }
        } catch (e) {
            console.error("Error fetching fields data:", e);
        }
    };

    const handleClear = async () => {
        setFieldID('');
        setFieldName('');
        setFieldLocation('');
        setFieldSize('');
        if (inputRefForImg_01.current != null && inputRefForImg_02.current != null) {
            inputRefForImg_01.current.value = '';
            inputRefForImg_02.current.value = '';
        }
    };

    return (
        <div>
            <section id="field-section" className="animate__animated animate__fadeIn">
                <div id="field-content-card-left">
                    {/*Fields ID*/}
                    <div id="field-id-div">
                        <label id="lblFieldID" htmlFor="txtFieldID">Field ID :</label>
                        <input id="txtFieldID" className="form-control" type="text"
                               aria-label="default input example"
                               value={fieldID}
                               onChange={(e) => setFieldID(e.target.value)}/>
                    </div>

                    {/*Fields Name*/}
                    <div id="field-name-div">
                        <label id="lblFieldName" htmlFor="txtFieldName">Field Name :</label>
                        <input id="txtFieldName" className="form-control" type="text"
                               aria-label="default input example"
                               value={fieldName}
                               onChange={(e) => setFieldName(e.target.value)}/>
                    </div>

                    {/*Fields Location*/}
                    <div id="field-location-div">
                        <label id="lblFieldLocation" htmlFor="txtFieldLocation">Field Location :</label>
                        <input id="txtFieldLocation" className="form-control" type="text"
                               aria-label="default input example"
                               value={fieldLocation}
                               onChange={(e) => setFieldLocation(e.target.value)}/>
                    </div>

                    {/*Fields Size*/}
                    <div id="field-size-div">
                        <label id="lblFieldSize" htmlFor="txtFieldSize">Field Size :</label>
                        <input id="txtFieldSize" className="form-control" type="text"
                               aria-label="default input example"
                               value={fieldSize}
                               onChange={(e) => setFieldSize(e.target.value)}/>
                    </div>

                    {/*Fields Image 01*/}
                    <div id="field-image1-div">
                        <label id="lblFieldImage1" htmlFor="txtFieldImage1">Field Image 01 :</label>
                        <input id="txtFieldImage1" className="form-control" type="file"
                               aria-label="default input example"
                               ref={inputRefForImg_01}
                               onChange={(e) => {
                                   const input = e.target as HTMLInputElement;
                                   if (input.files) {
                                       setFieldImage_1(input.files[0]);
                                   }
                               }}/>
                    </div>

                    {/*Fields Image 02*/}
                    <div id="field-image2-div">
                        <label id="lblFieldImage2" htmlFor="txtFieldImage2">Field Image 02 :</label>
                        <input id="txtFieldImage2" className="form-control" type="file"
                               aria-label="default input example"
                               ref={inputRefForImg_02}
                               onChange={(e) => {
                                   const input = e.target as HTMLInputElement;
                                   if (input.files) {
                                       setFieldImage_2(input.files[0]);
                                   }
                               }}/>
                    </div>

                    {/*Buttons*/}
                    <div id="button-div-field">
                        <button type="button" className="btn btn-primary" id="save-fields" onClick={handleSubmit}>Save</button>
                        <button type="button" className="btn btn-secondary" id="update-fields" onClick={handleUpdate}>Update</button>
                        <button type="button" className="btn btn-danger" id="delete-fields" onClick={handleDelete}>Delete</button>
                        <button type="button" className="btn btn-warning" id="clear-fields" onClick={handleClear}>Clear</button>
                    </div>
                </div>
                {/*Search Section*/}
                <div id="search-fields-div">
                    {/*Label for Search*/}
                    <label id="lblSearchFields" htmlFor="txtSearch-fields">Search Fields :</label>
                    <input id="txtSearch-fields" className="form-control" type="text" placeholder="Search by ID or size"
                           aria-label="default input example" onChange={(e) => setSearchedField(e.target.value)}/>
                    {/*Search Button*/}
                    <button id="search-field" type="button" className="btn btn-primary" onClick={handleSearch}>Search</button>
                </div>

                {/*Table*/}
                <div className="col-md-12 mt-4" style={{height:'285px', overflowY: 'scroll'}} id="Tbl-fields">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Field ID</th>
                            <th>Field Name</th>
                            <th>Field Location</th>
                            <th>Field Size</th>
                            <th>Field Image 01</th>
                            <th>Field Image 02</th>
                        </tr>
                        </thead>
                        <tbody id="fields-table-tb">
                        {fields?.map((field, index) => (
                            <tr key={index}>
                                <td>{field.field_code}</td>
                                <td>{field.field_name}</td>
                                <td>{field.field_location}</td>
                                <td>{field.extent_size}</td>
                                <td><img src={`data:image/png;base64,${field.img_01}`} width="140"/></td>
                                <td><img src={`data:image/png;base64,${field.img_02}`} width="140"/></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </section>
        </div>
    );
};