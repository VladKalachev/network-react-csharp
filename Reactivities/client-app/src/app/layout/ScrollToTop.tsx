import React, { useEffect } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';

const ScrollToTop = ({ children, location: { pathname }}: any) => {
    useEffect(() => {
       window.scrollTo(0,0);
    }, [pathname])

    return children;
}

export default withRouter(ScrollToTop);
