import './Crop.css'
import './formControll.css'

export const Crop = () => {
    return (
        <>
            <section id="crop-section" className="animate__animated animate__fadeIn">
                {/*Left Card*/}
                <div id="crop-content-card-left">
                    {/*Crop Code*/}
                    <div id="crop-code-div">
                        <label id="lblCropCode" htmlFor="txtCropCode">Crop Code :</label>
                        <input id="txtCropCode" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Common Name*/}
                    <div id="crop-common-name-div">
                        <label id="lblCommonName" htmlFor="txtCommonName">Common Name :</label>
                        <input id="txtCommonName" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Scientific Name*/}
                    <div id="crop-scientific-name-div">
                        <label id="lblScientificName" htmlFor="txtScientificName">Scientific Name :</label>
                        <input id="txtScientificName" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Category*/}
                    <div id="crop-category-div">
                        <label id="lblCategory" htmlFor="txtCategory">Category :</label>
                        <input id="txtCategory" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Season*/}
                    <div id="crop-season-div">
                        <label id="lblSeason" htmlFor="txtSeason">Season :</label>
                        <input id="txtSeason" className="form-control" type="text" aria-label="default input example"/>
                    </div>

                    {/*Crop Image*/}
                    <div id="crop-image-div">
                        <label id="lblCropImage" htmlFor="txtCropImage">Crop Image :</label>
                        <input id="txtCropImage" className="form-control" type="file"
                               aria-label="default input example"/>
                    </div>

                    <div id="search-field-div">
                        <label id="lblSearchField" htmlFor="txtSearchField">Search Field :</label>
                        <input id="txtSearchField" className="form-control" type="text" placeholder="Enter field code"
                               aria-label="default input example"/>
                        <button id="btnSearchField" type="button" className="btn btn-primary">Search</button>
                    </div>

                    <div id="crop-field-div">
                        <label id="lblCropFieldName" htmlFor="txtCropFieldName">Field Name :</label>
                        <input id="txtCropFieldName" className="form-control" type="text"
                               aria-label="default input example"/>
                    </div>

                    {/*Buttons*/}
                    <div id="button-div-crop">
                        <button type="button" className="btn btn-primary" id="save-crops">Save</button>
                        <button type="button" className="btn btn-secondary" id="update-crops">Update</button>
                        <button type="button" className="btn btn-danger" id="delete-crops">Delete</button>
                        <button type="button" className="btn btn-warning" id="clear-crops">Clear</button>
                    </div>
                </div>

                {/*Search Section*/}
                <div id="search-crops-div">
                    {/*Label for Search*/}
                    <label id="lblSearchCrops" htmlFor="txtSearch-crops">Search Crops :</label>
                    <input id="txtSearch-crops" className="form-control" type="text"
                           placeholder="Search by code or category" aria-label="default input example"/>
                    {/*Search Button*/}
                    <button id="search-crop" type="button" className="btn btn-primary">Search</button>
                </div>

                {/*Table*/}
                <div className="col-md-12 mt-4" style={{height:'285px', overflowY: 'scroll'}} id="Tbl-crops">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Crop Code</th>
                            <th>Common Name</th>
                            <th>Scientific Name</th>
                            <th>Category</th>
                            <th>Season</th>
                            <th>Field</th>
                            <th>Crop Image</th>
                        </tr>
                        </thead>
                        <tbody id="crops-table-tb">
                        <tr>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </section>
        </>
    );
};