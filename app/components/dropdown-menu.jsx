import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DropdownMenu = ({ captionSuiteValue, selectedStateValue }) => {
  const [selected, setSelected] = useState(captionSuiteValue[0]?.id?.toString() || "");

  useEffect(() => {
    const selectedValue = captionSuiteValue.find(value => value.id.toString() === selected);
    selectedStateValue(selectedValue);
  }, [selected, selectedStateValue, captionSuiteValue]);

  const handleChange = value => {
    setSelected(value); // value will already be a string
  };

  return (
    <div className="relative inline-block text-left w-72 ml-2.5">
      <Select onValueChange={handleChange} value={selected}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {captionSuiteValue.map(value => (
            <SelectItem
              key={value.id}
              value={value.id.toString()} // Ensure IDs are strings for consistency
              disabled={value.id === 0} // Optionally disable specific options
            >
              {value.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropdownMenu;
