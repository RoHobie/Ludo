package engine

type Token struct {
	ID         int
	StepsMoved int // -1 means yard
	State      TokenState
}