enum PLAYER {
  ONE,
  TWO,
}

enum POINTS {
  FIFTEEN = 15,
  THIRTY = 30,
  FORTY = 40,
}

const CONSTANTS = {
  DEUCE: "Deuce",
  ADVANTAGE: "Advantage ",
  SCORE_DASH: "-",
  SCORE_COMMA: ", ",
};

export class Match {
  player1: string;
  player2: string;
  games: number[] = [0, 0];
  sets: number[] = [0, 0];
  matchScore: string = "";
  points: number[] = [0, 0];
  advantage: boolean[] = [false, false];
  playerLookup: Map<string, PLAYER> = new Map();

  constructor(player1: string, player2: string) {
    this.player1 = player1;
    this.player2 = player2;
    this.playerLookup.set(player1, PLAYER.ONE);
    this.playerLookup.set(player2, PLAYER.TWO);
  }

  getMatchScore() {
    return this.matchScore;
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
      if (this.advantage[PLAYER.ONE]) {
        return (
          score + CONSTANTS.SCORE_COMMA + CONSTANTS.ADVANTAGE + this.player1
        );
      }
      if (this.advantage[PLAYER.TWO]) {
        return (
          score + CONSTANTS.SCORE_COMMA + CONSTANTS.ADVANTAGE + this.player2
        );
      }
      return score + CONSTANTS.SCORE_COMMA + CONSTANTS.DEUCE;
    }
    return (
      score +
      CONSTANTS.SCORE_COMMA +
      this.points[PLAYER.ONE] +
      CONSTANTS.SCORE_DASH +
      this.points[PLAYER.TWO]
    );
  }

  incGameScore(playerIndex: PLAYER) {
    this.games[playerIndex] += 1;
    this.points[PLAYER.ONE] = 0;
    this.points[PLAYER.TWO] = 0;
    if (this.games[playerIndex] == 6) {
      const otherPlayerIndex = (playerIndex + 1) % 2;
      if (this.games[otherPlayerIndex] < 5) {
        if (this.matchScore === "") {
          this.matchScore += this.score();
        } else {
          this.matchScore += CONSTANTS.SCORE_COMMA + this.score();
        }
        this.points[PLAYER.ONE] = 0;
        this.points[PLAYER.TWO] = 0;
        this.games[PLAYER.ONE] = 0;
        this.games[PLAYER.TWO] = 0;
        this.sets[playerIndex] += 1;
      }
    }
  }

  pointWonBy(player: string) {
    const playerIndex = this.playerLookup.get(player);
    const otherPlayerIndex = (playerIndex + 1) % 2;
    if (this.points[playerIndex] === POINTS.FORTY) {
      if (this.points[otherPlayerIndex] === POINTS.FORTY) {
        if (this.advantage[playerIndex]) {
          this.incGameScore(playerIndex);
        } else if (this.advantage[otherPlayerIndex]) {
          this.advantage[otherPlayerIndex] = false;
        } else {
          this.advantage[playerIndex] = true;
        }
      } else {
        this.incGameScore(playerIndex);
      }
    } else if (this.points[playerIndex] === POINTS.THIRTY) {
      this.points[playerIndex] = POINTS.FORTY;
    } else {
      this.points[playerIndex] += POINTS.FIFTEEN;
    }
  }
}
