package engine

type Player struct {
	ID         string
	Color      Color
	StartIndex int
	Tokens     []*Token
}

func NewPlayer(id string, color Color) *Player {
	p := &Player{
		ID:         id,
		Color:      color,
		StartIndex: int(color) * 13,
	}

	for i := range TokensPerPlayer {
		p.Tokens = append(p.Tokens, &Token{
			ID:         i,
			StepsMoved: -1,
			State:      InYard,
		})
	}

	return p
}