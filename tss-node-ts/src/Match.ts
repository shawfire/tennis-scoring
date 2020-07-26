import { POINT_CONVERSION_COMPRESSED } from "constants";

enum PLAYER {
  ONE,
  TWO,
}

enum POINTS {
  FIFTEEN = 15,
  THIRTY = 30,
  FORTY = 40,
}

enum TIE {
  DEUCE = "Deuce",
  ADVANTAGE = "Advantage",
}

const CONSTANTS = {
  DEUCE: "Deuce",
  ADVANTAGE: "Advantage",
  SCORE_DASH: "-",
  SCORE_COMMA: ", ",
};

export class Match {
  player1: string;
  player2: string;
  games: number[] = [0, 0];
  points: number[] = [0, 0];
  advantage: boolean[] = [false, false];
  playerLookup: Map<string, PLAYER> = new Map();

  constructor(player1: string, player2: string) {
    this.player1 = player1;
    this.player2 = player2;
    this.playerLookup.set(player1, PLAYER.ONE);
    this.playerLookup.set(player2, PLAYER.TWO);
  }

  score(): string {
    let score =
      this.games[PLAYER.ONE] + CONSTANTS.SCORE_DASH + this.games[PLAYER.TWO];
    if (this.points[PLAYER.ONE] == 0 && this.points[PLAYER.TWO] == 0) {
      return score;
    }
    if (
      this.points[PLAYER.ONE] === POINTS.FORTY &&
      this.points[PLAYER.TWO] === POINTS.FORTY
    ) {
      return score + CONSTANTS.SCORE_COMMA + TIE.DEUCE;
    }
    return (
      score +
      CONSTANTS.SCORE_COMMA +
      this.points[PLAYER.ONE] +
      CONSTANTS.SCORE_DASH +
      this.points[PLAYER.TWO]
    );
    return score;
  }

  pointWonBy(player: string) {
    const playerIndex = this.playerLookup.get(player);
    const otherPlayerIndex = playerIndex + (1 % 2);
    if (this.points[playerIndex] === POINTS.THIRTY) {
      if (this.points[otherPlayerIndex] === POINTS.FORTY) {
      } else {
        this.points[playerIndex] = POINTS.FORTY;
      }
    } else {
      this.points[playerIndex] += POINTS.FIFTEEN;
    }
  }
}
