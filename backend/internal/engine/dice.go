package engine

import (
	"math/rand"
	"time"
)

type Dice struct {
	rng *rand.Rand
}

func NewDice(seed int64) *Dice {
	if seed == 0 {
		seed = time.Now().UnixNano()
	}
	return &Dice{
		rng: rand.New(rand.NewSource(seed)),
	}
}

func (d *Dice) Roll() int {
	return d.rng.Intn(6) + 1
}