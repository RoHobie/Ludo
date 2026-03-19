package engine

func (g *Game) checkWinner() {
	current := g.Players[g.CurrentTurn]

	for _, t := range current.Tokens {
		if t.State != Done {
			return
		}
	}

	g.Winner = current
	g.State = Finished
}