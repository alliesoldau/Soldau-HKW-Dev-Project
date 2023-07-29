import { useState, useEffect, useRef } from "react";
import Select, { components } from "react-select";
import { FaRegEye } from "react-icons/fa";

function HiddenColumns({ hideShow, setHideShow, headers, headersFormatted }) {
  let hideColumns = [];

  // state variable to track the selected value
  const [selectedValue, setSelectedValue] = useState("");
  // const [placeHolderColor, setPlaceHolderColor] = useState("#242235");

  // ref for the select element
  const selectRef = useRef();

  // effect hook to listen for clicks on the document
  useEffect(() => {
    const handleDocumentClick = (event) => {
      let node = event.target;
      while (node) {
        if (node === selectRef.current) {
          return; // click occurred within the Select component, do nothing
        }
        node = node.parentNode;
      }
      // reset the selected value when a click outside the dropdown occurs
      setSelectedValue("");
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  // filter the object and extract keys with value "hide"
  let counter = 0;
  for (const key in hideShow) {
    if (hideShow[key] === "hide") {
      hideColumns.push(headersFormatted[counter]);
    }
    counter++;
  }

  const handleDropDownChange = (selectedOption) => {
    if (selectedOption) {
      const selectedKey = selectedOption.value;
      console.log("Selected key:", selectedKey);
      const headerIndex = headersFormatted.indexOf(selectedKey);
      const headerRawFormat = headers[headerIndex];
      let updatedHideShow = {
        ...hideShow,
        [headerRawFormat]: "show",
      };
      setSelectedValue(selectedOption);
      setHideShow(updatedHideShow);
    } else {
      setSelectedValue("");
    }
  };

  // custom Option component
  const Option = (props) => {
    return (
      <components.Option {...props}>
        <div className="custom-option">
          {props.label}
          <div className="open-eye">
            <FaRegEye />
          </div>
        </div>
      </components.Option>
    );
  };

  // transform the hideColumns array into an array of objects with label and value properties
  const options = hideColumns.map((key) => ({ label: key, value: key }));

  // inline styles for the Select component --> resources say inline styling works better for background of Select over css
  let columnsDisplay = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#f5feff",
      fontSize: "0.9em",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#100f24",
      fontSize: "0.9em",
      color: hideColumns.length > 0 ? "#242235" : "grey",
    }),
  };

  return (
    <div className="hidden-columns-container">
      <Select
        ref={selectRef}
        options={options}
        value={selectedValue}
        onChange={handleDropDownChange}
        placeholder="Hidden Columns"
        className="hidden-columns-select"
        components={{ Option }}
        styles={columnsDisplay}
      />
    </div>
  );
}

export default HiddenColumns;
