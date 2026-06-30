import { useState, useEffect, useContext } from "react";
import { PlayerContext } from "./context/playerContext";
const API_URL = import.meta.env.VITE_API_URL;

function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const { player } = useContext(PlayerContext);
  const [toggle, setToggle] = useState(false);

  type Achievement = {
    id: number;
    name: string;
    description: string;
  };

  async function getAllAchievements() {
    const response = await fetch(`${API_URL}player/achievements`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    setAchievements(data.achievements);
  }

  useEffect(() => {
    getAllAchievements();
  }, []);

  function toggleAchievements() {
    setToggle((prev) => !prev);
  }

  if (!player) return null;

  return (
    <>
        <img src="./trophy.svg" alt="achievements"onClick={toggleAchievements} className="achievements-image"/>
    

      <div className={toggle ? "achievements show" : "achievements"}>
        <div className={toggle ? 'achievements-close show' : 'achievements-close'} onClick={toggleAchievements}>X</div>
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={
              player.achievements.includes(achievement.id)
                ? "achievement completed"
                : "achievement uncompleted"
            }
          >
            <h4>{achievement.name}</h4>
            <p>{achievement.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Achievements;
