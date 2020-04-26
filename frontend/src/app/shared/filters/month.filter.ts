import { Creature } from '../model/creature';
import { Months } from '../model/months';

export const monthFilter = (
  creatures: Creature[],
  southernHemisphere: boolean,
  selectedMonths: Months[]
): Creature[] => {
  return creatures.filter((creature) =>
    (southernHemisphere
      ? creature.catchTime.southernHemisphereMonths
      : creature.catchTime.northernHemisphereMonths
    ).some((month) => selectedMonths.includes(month.name))
  );
};
