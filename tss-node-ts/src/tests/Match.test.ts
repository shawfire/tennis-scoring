import { expect } from "chai";
import { Match } from "../Match";

describe("test for class Match", () => {
  it("should score game and increment game from Advantage", () => {
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

    match.pointWonBy(player1);
    expect(match.score()).to.equal("0-0, 40-15");
    match.pointWonBy(player2);
    expect(match.score()).to.equal("0-0, 40-30");
    match.pointWonBy(player2);
    expect(match.score()).to.equal("0-0, Deuce");
    match.pointWonBy(player1);
    expect(match.score()).to.equal("0-0, Advantage " + player1);
    match.pointWonBy(player2);
    expect(match.score()).to.equal("0-0, Deuce");
    match.pointWonBy(player2);
    expect(match.score()).to.equal("0-0, Advantage " + player2);
    match.pointWonBy(player2);
    expect(match.score()).to.equal("0-1");
  });

  it("should score game and increment game from 40", () => {
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

    match.pointWonBy(player1);
    expect(match.score()).to.equal("0-0, 40-15");
    match.pointWonBy(player2);
    expect(match.score()).to.equal("0-0, 40-30");
    match.pointWonBy(player1);
    expect(match.score()).to.equal("1-0");
  });

  it("should score set and increment set from 6 games", () => {
    const player1 = "player 1";
    const player2 = "player 2";
    const games: number[] = [0, 0];

    const match = new Match(player1, player2);
    for (let g = 0; g < 5; g++) {
      for (let p = 0; p < 4; p++) {
        match.pointWonBy(player1);
      }
      games[0] += 1;
      expect(match.score()).to.equal(games[0] + "-0");
    }
    expect(match.score()).to.equal("5-0");
    match.pointWonBy(player1);
    expect(match.score()).to.equal("5-0, 15-0");
    match.pointWonBy(player1);
    expect(match.score()).to.equal("5-0, 30-0");
    match.pointWonBy(player1);
    expect(match.score()).to.equal("5-0, 40-0");
    match.pointWonBy(player1);
    expect(match.getMatchScore()).to.equal("6-0");
    expect(match.score()).to.equal("0-0");
  });
});
