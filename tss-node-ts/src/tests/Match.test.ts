import { expect } from "chai";
import { Match } from "../Match";

describe("test for class Match", () => {
  it("should score game", () => {
    const player1 = "player 1";
    const player2 = "player 2";

    const match = new Match(player1, player2);
    expect(match.score()).to.equal("0-0");
    match.pointWonBy(player1);
    expect(match.score()).to.equal("0-0, 15-0");
    match.pointWonBy(player2);
    expect(match.score()).to.equal("0-0, 15-15");
    match.pointWonBy(player1);
    expect(match.score()).to.equal("0-0, 30-15");

    //TODO implement logic to pass this test below:
    // match.pointWonBy(player1);
    // expect(match.score()).to.equal("0-0, 40-15");
  });
});
