const userIconList = [
  "nes-mario",
  "nes-ash",
  "nes-pokeball",
  "nes-bulbasaur",
  "nes-charmander",
  "nes-squirtle",
  "nes-kirby",
];

// TODO test simple

export const iconClassForUsername = (username: string) => {
  const usernameHash = username.split("").reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  return userIconList[usernameHash % userIconList.length];
};
