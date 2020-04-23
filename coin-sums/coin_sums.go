package main

import "fmt"

/**
    Coin sums

    Problem 31
    In the United Kingdom the currency is made up of pound (£) and pence (p). There are eight coins in general circulation:

    1p, 2p, 5p, 10p, 20p, 50p, £1 (100p), and £2 (200p).
    It is possible to make £2 in the following way:

    1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p
    How many different ways can £2 be made using any number of coins?

	Build from bottom/up (target: 6, coins <= 1p, 2p and 5p):
	----------------------------
	target			|				1p coin
		1					|					1
		2					|					1
		3					|					1
		4					|					1
		5					|					1
		6					|					1
	----------------------------
	target			|				2p coin
		1					|					1
		2					|					2
		3					|					2
		4					|					3
		5					|					3
		6					|					4
	---------------------------
	target			|				5p coin
		1					|					1
		2					|					2
		3					|					2
		4					|					3
		5					|					4
		6					|					5
	---------------------------

	So what we did here is, we ran over all coins.
	For each coin value, we started with the current value and went to the target value.
	Each entry of the array is then the previous value plus the number of ways the amount
	can be expressed, when the coin value is already excluded.
	When implemented, this results in the following pretty piece of code:

**/

func main() {
	finalTarget := 200
	coins := []int{1, 2, 5, 10, 20, 50, 100, 200}
	// coins := []int{1, 2, 5}
	table := make(map[int]int)
	table[0] = 1
	table[1] = 1

	// Compute the possible combinations from 1 to target (bottom up)
	for _, coin := range coins {
		for target := coin; target <= finalTarget; target++ {
			if coin == 1 {
				table[target] = 1
			} else {
				rem := target - coin
				table[target] += table[rem]
			}
		}
	}

	fmt.Println(table)
}
