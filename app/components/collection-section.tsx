import { Suspense } from "react"
import type { PokemonCard } from "../lib/types"
import CardGrid from "./card-grid"

interface CollectionSectionProps {
  cards: PokemonCard[]
}

export default function CollectionSection({ cards }: CollectionSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">My Collection</h2>
        <div className="text-sm text-gray-600">
          <span>{cards.length}</span> of <span>{cards.length}</span> cards
        </div>
      </div>

      <Suspense fallback={<div>Loading cards...</div>}>
        <CardGrid cards={cards} />
      </Suspense>
    </div>
  )
}
