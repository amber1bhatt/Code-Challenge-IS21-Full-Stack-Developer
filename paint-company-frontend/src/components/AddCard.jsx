import React, { useState } from "react";
import axios from "axios";

const AddCard = ({ status, setCards }) => {
  const [title, setTitle] = useState("");
  const [count, setCount] = useState(0);
  const [adding, setAdding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim().length) return;

    console.log(title, count);

    try {
      const response = await axios.post(
        "https://code-challenge-is-21-full-stack-developer-ab-backend.vercel.app:8080/paints",
        {
          title: title.trim(),
          count,
          status,
        }
      );

      const newCard = response.data;
      setCards((previousCards) => [...previousCards, newCard]);
      setAdding(false);
      setTitle("");
      setCount(0);
    } catch (error) {
      console.error("Error adding paint:", error);
    }
  };

  return (
    <>
      {adding ? (
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              placeholder="Add new paint..."
              className="flex-grow w-full rounded border border-violet-400 bg-violet-400/20 p-2 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
            />
            <input
              value={count}
              onChange={(e) => setCount(e.target.value)}
              type="number"
              min={1}
              placeholder="Add count."
              className="flex-grow w-full rounded border border-violet-400 bg-violet-400/20 p-2 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
            />
          </div>
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add Paint</span>
        </button>
      )}
    </>
  );
};

export default AddCard;
