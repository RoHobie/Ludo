package engine

func (g *Game) canMoveToken(t *Token) bool {
	if t.State == Done {
		return false
	}

	if t.State == InYard {
		return g.DiceValue == 6
	}

	next := t.StepsMoved + g.DiceValue
	return next <= MaxSteps
}

func (g *Game) getBoardIndex(p *Player, t *Token) (int, bool) {
	if !g.isOnMainTrack(t) {
		return -1, false
	}
	return (p.StartIndex + t.StepsMoved) % MainTrackSize, true
}

func (g *Game) advanceTurn() {
	if g.DiceValue == 6 {
		return
	}
	g.CurrentTurn = (g.CurrentTurn + 1) % len(g.Players)
	g.ConsecutiveSixes = 0
}

func (g *Game) isSafeSquare(index int) bool {
	for i := range 4 {
		start := i * 13
		if index == start || (start+7) == index {
			return true
		}
	}
	return false
}

func (g *Game) isOnMainTrack(t *Token) bool {
	return t.StepsMoved >= 0 && t.StepsMoved < MainTrackSize
}

func (g *Game) GetValidMoves(playerID string) ([]int, error) {
	if g.DiceValue == 0 || !g.DiceRolled {
		return nil, ErrInvalidDiceRoll
	}

	current := g.Players[g.CurrentTurn]
	if current.ID != playerID {
		return nil, ErrNotYourTurn
	}

	valid := []int{}
	for i, t := range current.Tokens {
		if g.canMoveToken(t) {
			valid = append(valid, i)
		}
	}
	return valid, nil
}