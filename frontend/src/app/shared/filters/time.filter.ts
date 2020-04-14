import { Creature } from '../model/creature';

export const timeFilter = (creatures: Creature[]): Creature[] => {
  const hour = new Date().getHours();
  return creatures.filter((creature) =>
    creature.catchTime.catchHours.some((catchHour) => {
      if (catchHour.endHour < catchHour.startHour) {
        return hour < catchHour.endHour || hour >= catchHour.startHour;
      }
      return hour >= catchHour.startHour && hour < catchHour.endHour;
    })
  );
};
