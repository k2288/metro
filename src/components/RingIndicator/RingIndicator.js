import React from 'react';
const ringIndicator =(props)=>{
    return <div className="mx-auto light-style activity-ring" data-role="activity" data-type="ring" data-style="dark" data-role-activity="true">
        <div className="wrap">
            <div className="circle"></div>
        </div>
        <div className="wrap">
            <div className="circle"></div>
        </div>
        <div className="wrap">
            <div className="circle"></div>
        </div>
        <div className="wrap">
            <div className="circle"></div>
        </div>
        <div className="wrap">
            <div className="circle"></div>
        </div>
    </div>
}

export default ringIndicator;