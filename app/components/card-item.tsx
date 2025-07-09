"use client"

import type React from "react"

import { useState } from "react"
import type { PokemonCard } from "../lib/types"
import { formatText } from "../lib/utils"
import { Edit, Trash2 } from "lucide-react"
import CardDetailsModal from "./card-details-modal"
import { deleteCard } from "../lib/actions"

interface CardItemProps {
  card: PokemonCard
}

export default function CardItem({ card }: CardItemProps) {
  const [showDetails, setShowDetails] = useState(false)

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm(`Are you sure you want to delete ${card.name}?`)) {
      await deleteCard(card.id)
    }
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    // TODO: Implement edit functionality
    alert(`Edit functionality for ${card.name} - This would open an edit modal with pre-filled data.`)
  }

  return (
    <>
      <div
        onClick={() => setShowDetails(true)}
        className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-sm p-4 cursor-pointer card-hover group"
      >
        <div className="relative mb-4">
          <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-yellow-100 rounded-lg flex items-center justify-center overflow-hidden">
            {card.imageUrl ? (
              <img
                src={card.imageUrl || "/placeholder.svg"}
                alt={card.name}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                  const placeholder = target.nextElementSibling as HTMLElement
                  if (placeholder) placeholder.style.display = "flex"
                }}
              />
            ) : (
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">🎴</div>
                <div className="text-sm font-medium">{card.name}</div>
              </div>
            )}
          </div>
          <div className={`absolute top-2 right-2 badge badge-${card.rarity}`}>{formatText(card.rarity)}</div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-900 truncate">{card.name}</h3>
            <span className="text-sm text-gray-500 ml-2">{card.number || "N/A"}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 truncate">{formatText(card.set)}</span>
            <span className="font-semibold text-blue-600">${card.value}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className={`badge badge-${card.condition}`}>{formatText(card.condition)}</span>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={handleEdit} className="p-1 hover:bg-gray-100 rounded transition-colors" title="Edit">
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                className="p-1 hover:bg-red-100 hover:text-red-600 rounded transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <CardDetailsModal card={card} isOpen={showDetails} onClose={() => setShowDetails(false)} />
    </>
  )
}
