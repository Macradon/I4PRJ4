import { Token } from '@angular/compiler/src/ml_parser/lexer';

export class User {
    firstName: String;
    lastName: String;
    Username: String;
    password: String;
    gamesPlayed: number;
    bestTime: String;
    gamesWon: Number;
    avgMovesNumber: Number;
    token: token;
}

export class token {
    token: String;
    refreshToken: RefreshToken;
}

export class RefreshToken{
    id: String;
    refreshToken: string;
    revoked: Boolean;
}