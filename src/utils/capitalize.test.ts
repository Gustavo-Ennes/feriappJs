import { describe, expect, it } from "vitest";

import { capitalizeName } from "./capitalize";

const NAMES: string[] = [
  "sérgio silva dos santos",
  "antônio de castro",
  "maria das dores",
  "lúcia do carmo",
  "josé da graça",
  "gustavo ennes"
];
const CAPITALIZEDNAMES: string[] = [
  "Sérgio Silva dos Santos",
  "Antônio de Castro",
  "Maria das Dores",
  "Lúcia do Carmo",
  "José da Graça",
  "Gustavo Ennes"
];

describe("Utils: capitalize text function", async (): Promise<void> => {
  NAMES.forEach((name: string): void => {
    it(`name ${name} has to be in CAPITALIZEDNAMES array`, async (): Promise<void> => {
      const capitalizedName = capitalizeName(name);
      expect(CAPITALIZEDNAMES).to.include(capitalizedName);
    });
  });
});
