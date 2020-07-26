import { expect } from "chai";
import { Match } from "../Match";

describe("test for class Match", () => {
  it("should score game", () => {
    const player1 = "player 1";
    const player2 = "player 2";

    const match = new Match(player1, player2);
    expect(match.score()).to.equal("0-0");
  });
});
