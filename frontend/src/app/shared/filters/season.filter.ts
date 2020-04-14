import { Creature } from '../model/creature';
import { Months } from '../model/months';

export const seasonFilter = (
  creatures: Creature[],
  southernHemisphere: boolean
): Creature[] => {
  const currentMonth = Object.keys(Months)[new Date().getMonth()] as Months;
  return creatures.filter((creature) =>
    southernHemisphere
      ? creature.catchTime.southernHemisphereMonths.some(
          (month) => month.name === currentMonth
        )
      : creature.catchTime.northernHemisphereMonths.some(
          (month) => month.name === currentMonth
        )
  );
};
