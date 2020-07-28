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
  inTieBreaker = false;
  tieBreakerScore: string;

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

  setWonBy(playerIndex: PLAYER) {
    this.points[PLAYER.ONE] = 0;
    this.points[PLAYER.TWO] = 0;
    if (this.matchScore === "") {
      this.matchScore += this.score();
    } else {
      this.matchScore += CONSTANTS.SCORE_COMMA + this.score();
    }
    if (this.inTieBreaker) {
      this.matchScore += this.tieBreakerScore;
      this.inTieBreaker = false;
    }
    this.games[PLAYER.ONE] = 0;
    this.games[PLAYER.TWO] = 0;
    this.sets[playerIndex] += 1;
  }

  gameWonBy(playerIndex: PLAYER, otherPlayerIndex: PLAYER) {
    this.games[playerIndex] += 1;

    if (this.inTieBreaker) {
      this.tieBreakerScore =
        " (" + this.points[PLAYER.ONE] + "," + this.points[PLAYER.TWO] + ")";
      this.setWonBy(playerIndex);
    } else if (this.games[playerIndex] >= 6) {
      if (this.games[playerIndex] - this.games[otherPlayerIndex] >= 2) {
        this.setWonBy(playerIndex);
      }
    }
    if (this.games[PLAYER.ONE] === 6 && this.games[PLAYER.ONE] === 6) {
      this.inTieBreaker = true;
    }
    this.points[PLAYER.ONE] = 0;
    this.points[PLAYER.TWO] = 0;
  }

  gamePointWonBy(playerIndex: PLAYER, otherPlayerIndex: PLAYER) {
    if (this.points[playerIndex] === POINTS.FORTY) {
      if (this.points[otherPlayerIndex] === POINTS.FORTY) {
        if (this.advantage[playerIndex]) {
          this.gameWonBy(playerIndex, otherPlayerIndex);
        } else if (this.advantage[otherPlayerIndex]) {
          this.advantage[otherPlayerIndex] = false;
        } else {
          this.advantage[playerIndex] = true;
        }
      } else {
        this.gameWonBy(playerIndex, otherPlayerIndex);
      }
    } else if (this.points[playerIndex] === POINTS.THIRTY) {
      this.points[playerIndex] = POINTS.FORTY;
    } else {
      this.points[playerIndex] += POINTS.FIFTEEN;
    }
  }

  tieBreakerPointWonBy(playerIndex: PLAYER, otherPlayerIndex: PLAYER) {
    this.points[playerIndex] += 1;
    if (
      this.points[playerIndex] >= 7 &&
      this.points[playerIndex] - this.points[otherPlayerIndex] >= 2
    ) {
      this.gameWonBy(playerIndex, otherPlayerIndex);
    }
  }

  pointWonBy(player: string) {
    const playerIndex = this.playerLookup.get(player);
    const otherPlayerIndex = (playerIndex + 1) % 2;
    if (this.inTieBreaker) {
      this.tieBreakerPointWonBy(playerIndex, otherPlayerIndex);
    } else {
      this.gamePointWonBy(playerIndex, otherPlayerIndex);
    }
  }
}
