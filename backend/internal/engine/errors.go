package engine

import "errors"

var (
	ErrGameNotStarted  = errors.New("game not started")
	ErrNotYourTurn     = errors.New("not your turn")
	ErrInvalidDiceRoll = errors.New("dice not rolled")
	ErrInvalidMove     = errors.New("invalid move")
	ErrGameFinished    = errors.New("game finished")
)