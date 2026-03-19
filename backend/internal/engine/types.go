package engine

type GameState int

const (
	Waiting GameState = iota
	InProgress
	Finished
)

type Color int

const (
	Red Color = iota
	Blue
	Green
	Yellow
)

type TokenState int

const (
	InYard TokenState = iota
	OnTrack
	Done
)

const (
	MainTrackSize    = 52
	HomeLaneSize     = 6
	MaxSteps         = MainTrackSize + HomeLaneSize - 1 // 57
	TokensPerPlayer  = 4
)