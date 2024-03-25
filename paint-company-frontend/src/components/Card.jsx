import React, { useState } from "react";
import axios from "axios";
import DropIndicator from "./DropIndicator";

const Card = ({ title, _id, count, status, handleDragStart, role }) => {
  const [editing, setEditing] = useState(false);
  const [editedCount, setEditedCount] = useState(count);
  const [editedTitle, setEditedTitle] = useState(title);

  const userRole = role;

  const handleEdit = () => {
    setEditedCount(count);
    setEditedTitle(title);
    setEditing(true);
  };

  const handleEditSave = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/paints/${_id}`, {
        title: editedTitle,
        count: editedCount,
      });

      console.log("Paint updated successfully:", response.data);
      const updatedCount = response.data.count;
      const updatedTitle = response.data.title;

      setEditedCount(updatedCount);
      setEditedTitle(updatedTitle);
      setEditing(false);
    } catch (error) {
      console.error("Error updating paint:", error);
    }
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleCountChange = (e) => {
    setEditedCount(e.target.value);
  };

  return (
    <>
      <DropIndicator beforeId={_id} status={status} />
      <form onSubmit={(e) => e.preventDefault()} className="relative">
        <div
          onClick={
            ["Jane", "Adam", "GeneralPainter"].includes(userRole)
              ? handleEdit
              : null
          }
          draggable={["Jane", "Adam", "GeneralPainter"].includes(userRole)}
          onDragStart={(e) =>
            handleDragStart(e, { title, _id, editedCount, status })
          }
          className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
        >
          {editing ? (
            <div className="flex">
              <input
                className="flex-grow w-full rounded border border-violet-400 bg-violet-400/20 p-2 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0 mr-2"
                type="text"
                value={editedTitle}
                onChange={handleTitleChange}
                autoFocus
              />
              <input
                className="flex-grow w-full rounded border border-violet-400 bg-violet-400/20 p-2 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
                type="text"
                value={editedCount}
                onChange={handleCountChange}
              />
            </div>
          ) : (
            <p className="text-sm text-neutral-100 flex justify-between">
              <span style={{ color: editedTitle }}>{editedTitle}</span>
              <span>{editedCount}</span>
            </p>
          )}
        </div>
        {editing && (
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              onClick={handleEditSave}
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Save</span>
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default Card;
