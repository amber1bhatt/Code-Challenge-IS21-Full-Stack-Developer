import React, { useState } from "react";
import axios from "axios";
import Card from "./Card";
import DropIndicator from "./DropIndicator";
import AddCard from "./AddCard";

const Column = ({ title, headingColor, status, cards, setCards, role }) => {
  const [active, setActive] = useState(false);
  const userRole = role;

  cards.sort((a, b) => b.count - a.count);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card._id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const element = getNearestIndicator(e, indicators);
    element.element.style.opacity = "1";
  };

  const clearHighlights = (elements) => {
    const indicators = elements || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-status="${status}"]`));
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;
    const element = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return element;
  };

  const handleDragLeave = () => {
    setActive(false);
    clearHighlights();
  };

  const handleDragEnd = async (e) => {
    setActive(false);
    clearHighlights();

    const cardId = e.dataTransfer.getData("cardId");
    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    const newStatus = element.dataset.status;

    if (before !== cardId) {
      try {
        await axios.put(
          `https://code-challenge-is-21-full-stack-developer-ab-backend.vercel.app:8080/paints/${cardId}`,
          {
            status: newStatus,
          }
        );

        const updatedCards = cards.map((card) =>
          card._id === cardId ? { ...card, status: newStatus } : card
        );
        console.log("Status changed successfully");

        setCards(updatedCards);
      } catch (error) {
        console.error("Error updating card status:", error);
      }
    }
  };

  const filteredCards = cards.filter((c) => c.status === status);
  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.reduce((sum, card) => sum + card.count, 0)}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return (
            <Card
              key={c._id}
              {...c}
              handleDragStart={handleDragStart}
              role={userRole}
            />
          );
        })}
        <DropIndicator beforeId="-1" status={status} />
        {["Jane", "Adam", "GeneralPainter"].includes(userRole) && (
          <AddCard status={status} setCards={setCards} />
        )}
      </div>
    </div>
  );
};

export default Column;
