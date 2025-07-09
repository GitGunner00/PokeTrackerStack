import type { PokemonCard } from "../lib/types"
import CardItem from "./card-item"

interface CardGridProps {
  cards: PokemonCard[]
}

export default function CardGrid({ cards }: CardGridProps) {
  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎴</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No cards found</h3>
        <p className="text-gray-600">Add your first Pokemon card to get started!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <CardItem key={card.id} card={card} />
      ))}
    </div>
  )
}
