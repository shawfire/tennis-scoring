const expect = require("chai").expect;
const Match = require("../Match");

describe("test for class Match", () => {
  it("should score game", () => {
    const player1 = "player 1";
    const player2 = "player 2";

    match = new Match(player1, player2);
    expect(match.score(player1)).to.equal("0-0");
  });
});
