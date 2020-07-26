enum PLAYER {
  ONE,
  TWO,
}

export class Match {
  player1: string;
  player2: string;
  games: number[] = [0, 0];
  points: number[] = [0, 0];
  playerLookup: Map<string, PLAYER> = new Map();

  constructor(player1: string, player2: string) {
    this.player1 = player1;
    this.player2 = player2;
    this.playerLookup.set(player1, PLAYER.ONE);
    this.playerLookup.set(player2, PLAYER.TWO);
  }

  score(): string {
    let score = this.games[PLAYER.ONE] + "-" + this.games[PLAYER.TWO];
    if (this.points[PLAYER.ONE] == 0 && this.points[PLAYER.TWO] == 0) {
      return score;
    }
    return (
      score + ", " + this.points[PLAYER.ONE] + "-" + this.points[PLAYER.TWO]
    );
  }

  pointWonBy(player: string) {
    const playerIndex = this.playerLookup.get(player);
    this.points[playerIndex] += 15;
  }
}
