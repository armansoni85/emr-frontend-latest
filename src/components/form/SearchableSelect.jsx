import { useCallback, useEffect, useRef, useState } from "react";

import { EachLoop } from "@src/utils/EachLoop";

const SearchableSelect = ({
  id,
  className,
  disabled,
  readOnly,
  options = [],
  placeholder,
  onChange,
  onSearch,
  debounceTime = 300,
  defaultValue,
  keyValue = "value",
  keyLabel = "label",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownPosition, setDropdownPosition] = useState("bottom"); // "bottom" or "top"
  const [currentDropdownHeight, setCurrentDropdownHeight] = useState(240); // "bottom" or "top"

  const wrapperRef = useRef(null); // Reference to the wrapper div
  const inputRef = useRef(null); // Reference to the input container
  const dropdownContainer = useRef(null); // Reference to the dropdown container

  const filterOptions = (searchTerm) => {
    if (!searchTerm) {
      setFilteredOptions(options);
      return;
    }

    if (options.length < 1) return;

    const filtered = options.filter((option) =>
      option?.label?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  // Handle search input change
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    filterOptions(event.target.value);
    if (onSearch) {
      onSearch(event.target.value);
    } else {
      // filterOptions(event.target.value);
    }
  };

  // Handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchTerm("");
    setFilteredOptions(options);
    if (onChange) {
      onChange(option);
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    if (disabled || readOnly) return; // Prevent toggling if disabled or read-only
    setIsOpen(!isOpen);
  };

  const getValueLabelOption = useCallback(
    (option, isValue = true) => {
      if (!option) return null; // Return null if option is not provided

      if (typeof keyValue === "function" && isValue) {
        return keyValue(option);
      } else if (typeof keyLabel === "function" && !isValue) {
        return keyLabel(option);
      }

      return isValue ? option[keyValue] : option[keyLabel];
    },
    [keyValue, keyLabel]
  );

  // Calculate dropdown position dynamically
  const calculateDropdownPosition = () => {
    if (!inputRef.current) return;

    const inputRect = inputRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const dropdownHeight = dropdownContainer.current
      ? dropdownContainer.current.offsetHeight + inputRect.height + 5
      : 0;
    setCurrentDropdownHeight(dropdownHeight); // Update the current dropdown height
    // console.log("dropdownHeight", dropdownHeight);

    // Check if there's enough space below the input
    if (viewportHeight - inputRect.bottom > dropdownHeight + 20) {
      setDropdownPosition("bottom");
    } else {
      setDropdownPosition("top");
    }
  };

  // Handle click outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update dropdown position on toggle and scroll
  useEffect(() => {
    if (isOpen) {
      calculateDropdownPosition();
    }

    const handleScroll = () => {
      if (isOpen) {
        calculateDropdownPosition();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    if (defaultValue) {
      const defaultOption = options.find(
        (option) =>
          getValueLabelOption(option, true) ===
          (typeof keyValue === "function"
            ? keyValue(defaultValue)
            : defaultValue)
      );
      if (defaultOption) {
        setSelectedOption(defaultOption);
      }
    }
  }, [defaultValue, options, getValueLabelOption, keyValue]);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div
        ref={inputRef}
        id={id}
        className={`flex justify-between focus:outline-none w-full mt-1 px-5 py-3 border rounded-full ${className}
                    ${disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"}
                    ${readOnly ? "" : "cursor-pointer"}`}
        onClick={toggleDropdown}
        aria-disabled={disabled || readOnly}
        tabIndex={disabled || readOnly ? -1 : 0}
      >
        <span>{getValueLabelOption(selectedOption, false) || placeholder}</span>
        <svg
          fill="black"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 10l5 5 5-5z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </div>
      {isOpen && (
        <div
          ref={dropdownContainer}
          className={`absolute w-full bg-white shadow-lg rounded-md z-10 ${
            dropdownPosition === "bottom" ? "mt-2" : ``
          }`}
          style={{
            marginTop:
              dropdownPosition === "bottom"
                ? "0"
                : `-${currentDropdownHeight}px`,
          }}
        >
          {dropdownPosition === "bottom" && (
            <div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search..."
                className="w-full px-4 py-2 border-b focus:outline-none"
              />
            </div>
          )}
          <ul className="overflow-auto max-h-60 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-hide">
            <EachLoop
              of={filteredOptions}
              render={(option, index) => (
                <li
                  key={getValueLabelOption(option, true)}
                  className={`px-4 py-2 ${
                    selectedOption?.value === getValueLabelOption(option, true)
                      ? "bg-gray-200"
                      : "hover:bg-gray-100 cursor-pointer"
                  }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {getValueLabelOption(option, false)}
                </li>
              )}
            />
          </ul>
          {dropdownPosition === "top" && (
            <div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search..."
                className="w-full px-4 py-2 border-b focus:outline-none"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
