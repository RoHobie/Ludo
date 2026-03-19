package engine

func (g *Game) handleCapture(current *Player, moved *Token) {
	index, ok := g.getBoardIndex(current, moved)

	if moved.State == Done {
		return
	}

	if !ok {
		return
	}

	if g.isSafeSquare(index) {
		return
	}

	for _, p := range g.Players {
		if p.ID == current.ID {
			continue
		}
		for _, t := range p.Tokens {
			oppIndex, ok := g.getBoardIndex(p, t)
			if ok && oppIndex == index {
				t.State = InYard
				t.StepsMoved = -1
			}
		}
	}
}