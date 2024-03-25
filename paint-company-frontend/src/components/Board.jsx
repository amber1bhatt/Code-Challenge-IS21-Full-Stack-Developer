import React, { useEffect, useState } from "react";
import axios from "axios";
import Column from "./Column";
import DeleteCard from "./DeleteCard";

const Board = ({ role }) => {
  const [cards, setCards] = useState([]);
  const userRole = role;

  useEffect(() => {
    const fetchPaints = async () => {
      try {
        const response = await axios.get(
          "https://code-challenge-is-21-full-stack-developer-ab-backend.vercel.app/paints"
        );
        console.log(response.data);
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching paints:", error);
      }
    };

    fetchPaints();
  }, []);

  return (
    <div className="flex flex-col items-center h-full w-full overflow-scroll p-4 md:p-12">
      <div className="flex flex-wrap justify-center w-full gap-3 xs:justify-between">
        {" "}
        <Column
          title="Available"
          status="available"
          headingColor="text-green-400"
          cards={cards}
          setCards={setCards}
          role={userRole}
        />
        <Column
          title="Running Low"
          status="low"
          headingColor="text-orange-400"
          cards={cards}
          setCards={setCards}
          role={userRole}
        />
        <Column
          title="Out of Stock"
          status="none"
          headingColor="text-red-400"
          cards={cards}
          setCards={setCards}
          role={userRole}
        />
        {["Jane", "Adam", "GeneralPainter"].includes(userRole) && (
          <DeleteCard setCards={setCards} />
        )}
      </div>
    </div>
  );
};

export default Board;
