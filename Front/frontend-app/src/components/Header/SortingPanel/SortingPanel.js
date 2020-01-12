import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {sortingTypes} from "../../../Utils/sortingTypes";

const SortingPanel = ({setSorting}) => {

    const [sortingType, setSortingType] = useState(false);

    const sortSubmissions = (sortingType) => {
        setSortingType(sortingType);
        setSorting(sortingType);
    }

    return (
        <Tabs
            value={sortingType}
            onChange={setSortingType}
            indicatorColor="primary"
            textColor="primary"
            centered
        >
            <Tab
                value={sortingTypes.newest}
                label={"newest"}
                onClick={() => sortSubmissions(sortingTypes.newest)}
            />
            <Tab
                value={sortingTypes.rating}
                label={"rating"}
                onClick={() => sortSubmissions(sortingTypes.rating)}
            />
        </Tabs>
    );
};

SortingPanel.propTypes = {

};

export default SortingPanel;