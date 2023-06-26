import React, {useState} from "react";
import { Checkbox, Collapse } from "antd"
import { Label } from "reactstrap";

const { Panel } = Collapse

function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {

        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked)

    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <div className="inline-block-div">
                <Checkbox
                    onChange={() => handleToggle(value.id)}
                    type="checkbox"
                    checked={Checked.indexOf(value.id) === -1 ? false : true}
                />&nbsp;&nbsp;
                <Label className=" ">{value.name}</Label>
                
            </div>
        </React.Fragment>
    ))

    return (
        <div className="filter-bar">
            <Collapse defaultActiveKey={['0']} >
                <Panel header="Kategorie" key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox