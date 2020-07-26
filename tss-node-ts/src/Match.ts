interface Player {
  points: number;
  games: number;
}

enum PLAYER {
  ONE,
  TWO,
}

export class Match {
  player1: string;
  player2: string;
  games: number[] = [0, 0];
  points: number[] = [0, 0];
  lookup: string[];

  constructor(player1: string, player2: string) {
    this.player1 = player1;
    this.player2 = player2;
  }

  score(): string {
    return this.games[PLAYER.ONE] + "-" + this.games[PLAYER.TWO];
  }
}
