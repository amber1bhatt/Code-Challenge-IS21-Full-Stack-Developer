import React, { useState } from "react";
import axios from "axios";

const DeleteCard = ({ setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = async (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    try {
      await axios.delete(`http://localhost:8080/paints/${cardId}`);

      // After successful deletion, update the cards state to remove the deleted card
      setCards((previousCards) =>
        previousCards.filter((card) => card._id !== cardId)
      );

      // Optionally, show a confirmation message to the user
      console.log("Paint deleted successfully");
    } catch (error) {
      console.error("Error deleting paint:", error);
    }

    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl text-center ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      Drop here to delete
    </div>
  );
};

export default DeleteCard;
