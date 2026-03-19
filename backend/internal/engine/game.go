package engine

type Game struct {
	ID               string
	Players          []*Player
	State            GameState
	CurrentTurn      int
	DiceValue        int
	DiceRolled       bool
	ConsecutiveSixes int
	Winner           *Player
	dice             *Dice
}

func NewGame(id string, seed int64) *Game {
	return &Game{
		ID:    id,
		State: Waiting,
		dice:  NewDice(seed),
	}
}

func (g *Game) AddPlayer(id string, color Color) {
	g.Players = append(g.Players, NewPlayer(id, color))
}

func (g *Game) Start() {
	if len(g.Players) < 2 {
		return
	}
	g.State = InProgress
	g.CurrentTurn = 0
}

func (g *Game) RollDice(playerID string) (int, error) {
	if g.State != InProgress {
		return 0, ErrGameNotStarted
	}

	if g.DiceRolled {
		return 0, ErrInvalidDiceRoll // Or create a new error if needed, but the prompt says maintain existing errors.
	}

	current := g.Players[g.CurrentTurn]
	if current.ID != playerID {
		return 0, ErrNotYourTurn
	}

	value := g.dice.Roll()
	g.DiceValue = value

	if value == 6 {
		g.ConsecutiveSixes++
		if g.ConsecutiveSixes == 3 {
			g.ConsecutiveSixes = 0
			g.DiceRolled = false
			g.CurrentTurn = (g.CurrentTurn + 1) % len(g.Players)
			return 6, nil
		}
	} else {
		g.ConsecutiveSixes = 0
	}

	g.DiceRolled = true

	return value, nil
}

func (g *Game) MoveToken(playerID string, tokenID int) error {
	if g.State != InProgress {
		return ErrGameNotStarted
	}

	if !g.DiceRolled {
		return ErrInvalidDiceRoll
	}

	current := g.Players[g.CurrentTurn]
	if current.ID != playerID {
		return ErrNotYourTurn
	}

	if tokenID < 0 || tokenID >= len(current.Tokens) {
		return ErrInvalidMove
	}

	token := current.Tokens[tokenID]

	if !g.canMoveToken(token) {
		return ErrInvalidMove
	}

	if token.State == InYard {
		token.State = OnTrack
		token.StepsMoved = 0
	} else {
		token.StepsMoved += g.DiceValue
		if token.StepsMoved == MaxSteps {
			token.State = Done
		}
	}

	g.handleCapture(current, token)

	g.DiceRolled = false
	g.checkWinner()
	if g.State != Finished {
		g.advanceTurn()
	}

	return nil
}
