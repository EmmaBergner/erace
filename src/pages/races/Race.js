import React from "react";


const Race = (props) => {
    const {
        id, owner, name, distance, country, date, website, created_at, updated_at,
        is_owner, 
    } = props;
    return (
        <div> {date}</div>
    )
}
export default Race;