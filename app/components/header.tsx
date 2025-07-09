import type { PokemonCard } from "../lib/types"
import AddCardButton from "./add-card-button"

interface HeaderProps {
  cards: PokemonCard[]
}

export default function Header({ cards }: HeaderProps) {
  const totalCards = cards.length
  const totalValue = cards.reduce((sum, card) => sum + Number.parseFloat(card.value || "0"), 0)

  return (
    <header className="bg-white shadow-lg border-b-4 border-blue-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-yellow-400 rounded-full flex items-center justify-center text-xl">
              ⚡
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PokeTracker</h1>
              <p className="text-sm text-gray-600">Pokemon Card Collection</p>
            </div>
          </div>

          <nav className="flex gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
              Home
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
              Collection
            </button>
          </nav>

          <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <span>👥</span>
                <span>{totalCards}</span>
                <span>Cards</span>
              </div>
              <div className="flex items-center gap-1">
                <span>⭐</span>
                <span>${totalValue.toFixed(2)}</span>
                <span>Value</span>
              </div>
            </div>
            <AddCardButton />
          </div>
        </div>
      </div>
    </header>
  )
}
