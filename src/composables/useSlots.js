const symbols = [
    { emoji: '🍒', weight: 40, payouts: { 2: 1.5,  3: 5,   4: 20,  5: 100  } },
    { emoji: '🍋', weight: 30, payouts: { 2: 2,    3: 8,   4: 30,  5: 150  } },
    { emoji: '🍊', weight: 15, payouts: { 2: 3,    3: 12,  4: 50,  5: 250  } },
    { emoji: '🔔', weight: 8,  payouts: { 2: 5,    3: 20,  4: 80,  5: 400  } },
    { emoji: '⭐', weight: 4,  payouts: { 2: 8,    3: 35,  4: 150, 5: 750  } },
    { emoji: '💎', weight: 2,  payouts: { 2: 15,   3: 75,  4: 300, 5: 1500 } },
    { emoji: '7',  weight: 1,  payouts: { 2: 25,   3: 150, 4: 600, 5: 3000 } },
]

function getSymbol() {
    let total = 0
    for (let i = 0; i < symbols.length; i++) total += symbols[i].weight
    let rand = Math.floor(Math.random() * total)
    for (let i = 0; i < symbols.length; i++) {
        rand -= symbols[i].weight
        if (rand < 0) return symbols[i]
    }
    return symbols[symbols.length - 1]
}

function spin() {
    return [getSymbol(), getSymbol(), getSymbol(), getSymbol(), getSymbol()]
}

export default function useSlots() {
    return { spin, symbols }
}
