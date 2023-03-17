import React from "react";
const Container = ({className, backgroundColor}) => {
    return (
        <div className={`container ${className}`} style={{background:backgroundColor}}>
            
        </div>
    );
}
export default Container;