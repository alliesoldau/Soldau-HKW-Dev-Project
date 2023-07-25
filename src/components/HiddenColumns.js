import { useState, useEffect, useRef } from "react";
import Select from "react-select";

function HiddenColumns({ hideShow, setHideShow, headers, headersFormatted }) {
  let hideColumns = [];

  // state variable to track the selected value
  const [selectedValue, setSelectedValue] = useState("");

  // ref for the select element
  const selectRef = useRef();

  // effect hook to listen for clicks on the document
  useEffect(() => {
    const handleDocumentClick = (event) => {
      let node = event.target;
      while (node) {
        if (node === selectRef.current) {
          return; // Click occurred within the Select component, do nothing
        }
        node = node.parentNode;
      }
      // Reset the selected value when a click outside the dropdown occurs
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

  // transform the hideColumns array into an array of objects with label and value properties
  const options = hideColumns.map((key) => ({ label: key, value: key }));

  return (
    <div>
      <Select
        ref={selectRef}
        options={options}
        value={selectedValue}
        onChange={handleDropDownChange}
        placeholder="Hidden Columns"
        className="hidden-columns-select"
      />
    </div>
  );
}

export default HiddenColumns;
