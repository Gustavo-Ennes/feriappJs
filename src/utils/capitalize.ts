const inelegibleToTitleWords: string[] = ["da", "das", "do", "dos", "de"];

const capitalizeName = (name: string) =>
  name
    .split(" ")
    .map((name) => inelegibleToTitleWords.includes(name) ? name :  name[0].toUpperCase() + name.substring(1))
    .join(" ");

export { capitalizeName };
