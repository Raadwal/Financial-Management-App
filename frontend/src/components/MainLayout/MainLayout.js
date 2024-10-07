import MainNavigation from "./MainNavigation";

import { Outlet } from "react-router-dom";

function MainLayout(props) {
    return (
        <div>
            <MainNavigation />
            <Outlet />
        </div>
    )
}

export default MainLayout;