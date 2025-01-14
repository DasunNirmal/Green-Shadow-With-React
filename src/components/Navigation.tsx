import {Link, useLocation, useNavigate} from "react-router";
import "./Naigation.css";

export const Navigation = () => {

    const navigate = useNavigate();
    const {pathname} = useLocation();
    let subpage = pathname.split("/")?.[1];

    function activePage(type: string | null = null) {
        if (subpage === 'home') {
            subpage = 'home';
        }
        let activePageCss = '';
        if (type === subpage) {
            activePageCss = ' active-page';
        } else {
            activePageCss = ' hover-nav-bar';
        }
        return activePageCss;
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" id="navigation-bar">
            <div className="container-fluid">
                <a id="logo-navbar-div" className="navbar-brand" >
                    <div id="logo-navbar"></div>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav" id="nav-bar">
                        <Link className={`nav-link ${activePage('home')}`} to='/home'>Home</Link>
                        <Link className={`nav-link ${activePage('field')}`} to='/field'>Field</Link>
                        <Link className={`nav-link ${activePage('crop')}`} to='/crop'>Crop</Link>
                        <Link className={`nav-link ${activePage('staff')}`} to='/staff'>Staff</Link>
                        <Link className={`nav-link ${activePage('vehicle')}`} to='/vehicle'>Vehicle</Link>
                        <Link className={`nav-link ${activePage('equipment')}`} to='/equipment'>Equipment</Link>
                        <Link className={`nav-link ${activePage('logs')}`} to='/logs'>Logs</Link>
                    </div>
                    <div id="log-out" onClick={() => navigate('')}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="#3e3c5c"
                                  d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </nav>
    );
};