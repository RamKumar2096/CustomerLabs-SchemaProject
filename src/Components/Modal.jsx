import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faChevronLeft,
  faWindowMinimize,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

function Modal({ onClose }) {
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [newSchema, setNewSchema] = useState("");
  const [segmentName, setSegmentName] = useState("");

  const handleAddSchema = () => {
    setSelectedSchemas([...selectedSchemas, newSchema]);
    setNewSchema("");
  };

  const handleSchemaChange = (e) => {
    setNewSchema(e.target.value);
  };

  const formatLabel = (label) => {
    return label.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const renderSchemaOptions = () => {
    return schemaOptions
      .filter((option) => !selectedSchemas.includes(option.value))
      .map((option) => (
        <option key={option.value} value={option.value}>
          {formatLabel(option.label)}
        </option>
      ));
  };

  const renderSelectedSchemas = () => {
    const handleRemoveSchema = (removedSchema) => {
      setSelectedSchemas(
        selectedSchemas.filter((schema) => schema !== removedSchema)
      );
    };

    return selectedSchemas.map((schema, index) => (
      <div key={index} className="flex items-center mt-2 pb-2">
        <div
          className={`w-4 h-4 rounded-full ${
            schema === "account_name" || schema === "state" || schema === "city"
              ? "bg-rose-500"
              : "bg-green-500"
          } mr-2`}
        ></div>
        <select
          value={schema}
          onChange={(e) => {
            const updatedSchema = e.target.value;
            setSelectedSchemas(
              selectedSchemas.map((s) => (s === schema ? updatedSchema : s))
            );
          }}
          className="w-full border border-gray-300 p-2 rounded-md"
        >
          {schemaOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {formatLabel(option.label)}
            </option>
          ))}
        </select>
        <div
          onClick={() => handleRemoveSchema(schema)}
          className="bg-teal-100 border border-teal-100 rounded-md px-2 py-.5 mt-.5 ml-2 cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faWindowMinimize}
            className="align-center text-darkgray text-xl mb-3"
          />
        </div>
      </div>
    ));
  };

  const saveSegment = () => {
    // Validate the segment name
    if (!segmentName.trim()) {
      alert("Please enter a segment name.");
      return;
    }

    // Prepare the data to be logged
    const data = {
      segment_name: segmentName.trim(),
      schema: selectedSchemas.map((schema) => ({
        [schema]: formatLabel(schema),
      })),
    };

    // Log the segment data to the console
    console.log("Segment data:", data);

    // Send the data to the server using Axios
    axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://webhook.site/5803cf0b-268b-4536-bbf8-94e890feeab6",
        data
      )

      .then((response) => {
        // Handle success
        console.log("Segment saved successfully:", response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error saving segment:", error);
      });
    // Reset the modal state
    setSegmentName("");
    setSelectedSchemas([]);
    setNewSchema("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-50">
      <div className="bg-white w-1/1 h-full overflow-y-auto flex flex-col">
        <div className="flex justify-between items-center bg-teal-600 p-6 text-white">
          <span className="font-semibold text-xl tracking-tight">
            <FontAwesomeIcon icon={faChevronLeft} className="mr-2" /> Saving
            Segment
          </span>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="p-6 flex-1">
          <h4>Enter the Name of the Segment</h4>
          <input
            className="w-full border border-gray-300 p-2 rounded-md mt-4 mb-4"
            type="text"
            placeholder="Name of the Segment"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
          />
          <h4>
            To save your segment, you need to add the schemas to build the query
          </h4>
          <div className="flex justify-end mt-2 mb-4">
            <div className="flex items-center mt-2 mr-4">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
              <div> - User Traits</div>
            </div>
            <div className="flex items-center mt-2">
              <div className="w-4 h-4 rounded-full bg-rose-500 mr-2"></div>
              <div> - Group Traits</div>
            </div>
          </div>
          <div
            className={
              selectedSchemas.length
                ? "border border-2 border-blue-300 rounded pl-2 pr-2"
                : "hidden"
            }
          >
            {renderSelectedSchemas()}
          </div>

          <div className="flex items-center mt-2 pb-2 pl-2 pr-2">
            <div className="w-4 h-4 rounded-full bg-gray-300 mr-2"></div>
            <select
              value={newSchema}
              onChange={handleSchemaChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="">Add schema to segment</option>
              {renderSchemaOptions()}
            </select>
            <div className="bg-teal-100 border border-teal-100 rounded-md px-2 py-.5 mt-.5 ml-2">
              <FontAwesomeIcon
                icon={faWindowMinimize}
                className="align-center text-darkgray text-xl mb-3"
              />
            </div>
          </div>
          <div className="flex items-center ml-6">
            <button
              onClick={handleAddSchema}
              className="text-teal-600 hover:text-green-700 relative"
              disabled={!newSchema}
            >
              +Add new Schema
              <div className="absolute bottom-0 left-1 w-full h-0.5 bg-teal-600"></div>
            </button>
          </div>
        </div>
        <div className="bg-gray-600 p-4 text-white flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-red-500 border border-white rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={saveSegment}
            className="px-4 py-2 bg-teal-600 text-white-600 border border-teal-600 rounded-md"
          >
            Save the Segment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
