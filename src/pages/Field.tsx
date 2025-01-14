import './Field.css'
import './formControll.css'

export const Field = () => {
    return (
        <div>
            <section id="field-section" className="animate__animated animate__fadeIn">
                <div id="field-content-card-left">
                    {/*Field ID*/}
                    <div id="field-id-div">
                        <label id="lblFieldID" htmlFor="txtFieldID">Field ID :</label>
                        <input id="txtFieldID" className="form-control" type="text" aria-label="default input example"/>
                    </div>

                    {/*Field Name*/}
                    <div id="field-name-div">
                        <label id="lblFieldName" htmlFor="txtFieldName">Field Name :</label>
                        <input id="txtFieldName" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Field Location*/}
                    <div id="field-location-div">
                        <label id="lblFieldLocation" htmlFor="txtFieldLocation">Field Location :</label>
                        <input id="txtFieldLocation" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Field Size*/}
                    <div id="field-size-div">
                        <label id="lblFieldSize" htmlFor="txtFieldSize">Field Size :</label>
                        <input id="txtFieldSize" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Field Image 01*/}
                    <div id="field-image1-div">
                        <label id="lblFieldImage1" htmlFor="txtFieldImage1">Field Image 01 :</label>
                        <input id="txtFieldImage1" className="form-control" type="file"
                               aria-label="default input example"/>
                    </div>

                    {/*Field Image 02*/}
                    <div id="field-image2-div">
                        <label id="lblFieldImage2" htmlFor="txtFieldImage2">Field Image 02 :</label>
                        <input id="txtFieldImage2" className="form-control" type="file"
                               aria-label="default input example"/>
                    </div>

                    {/*Buttons*/}
                    <div id="button-div-field">
                        <button type="button" className="btn btn-primary" id="save-fields">Save</button>
                        <button type="button" className="btn btn-secondary" id="update-fields">Update</button>
                        <button type="button" className="btn btn-danger" id="delete-fields">Delete</button>
                        <button type="button" className="btn btn-warning" id="clear-fields">Clear</button>
                    </div>
                </div>
                {/*Search Section*/}
                <div id="search-fields-div">
                    {/*Label for Search*/}
                    <label id="lblSearchFields" htmlFor="txtSearch-fields">Search Fields :</label>
                    <input id="txtSearch-fields" className="form-control" type="text" placeholder="Search by ID or size"
                           aria-label="default input example"/>
                    {/*Search Button*/}
                    <button id="search-field" type="button" className="btn btn-primary">Search</button>
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
                        <tr>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </section>
        </div>
    );
};