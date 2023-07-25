import { useState, useEffect, useRef } from "react";

function HiddenColumns({ hideShow, setHideShow, headers, headersFormatted }) {
  let hideColumns = [];

  // State variable to track the selected value
  const [selectedValue, setSelectedValue] = useState("");

  // Ref for the select element
  const selectRef = useRef();

  // Effect hook to listen for clicks on the document
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!selectRef.current.contains(event.target)) {
        // Reset the selected value when a click outside the dropdown occurs
        setSelectedValue("");
      }
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

  const handleDropDownChange = (event) => {
    const selectedKey = event.target.value;
    console.log("Selected key:", selectedKey);
    const headerIndex = headersFormatted.indexOf(selectedKey);
    const headerRawFormat = headers[headerIndex];
    let updatedHideShow = {
      ...hideShow,
      [headerRawFormat]: "show",
    };
    setSelectedValue(event.target.value);
    setHideShow(updatedHideShow);
  };

  return (
    <div>
      <select
        select
        ref={selectRef}
        onChange={handleDropDownChange}
        value={selectedValue}
      >
        <option value="" disabled selected>
          Hidden Columns
        </option>
        {hideColumns.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
}

export default HiddenColumns;
