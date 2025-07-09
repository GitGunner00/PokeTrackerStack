"use client"

import type { PokemonCard } from "../lib/types"
import { formatText } from "../lib/utils"
import { X, Edit, Trash2 } from "lucide-react"
import { deleteCard } from "../lib/actions"

interface CardDetailsModalProps {
  card: PokemonCard
  isOpen: boolean
  onClose: () => void
}

export default function CardDetailsModal({ card, isOpen, onClose }: CardDetailsModalProps) {
  if (!isOpen) return null

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${card.name}?`)) {
      await deleteCard(card.id)
      onClose()
    }
  }

  const handleEdit = () => {
    // TODO: Implement edit functionality
    alert(`Edit functionality for ${card.name} - This would open an edit modal with pre-filled data.`)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{card.name}</h2>
            <p className="text-gray-600">{formatText(card.set)}</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          <div className="flex justify-center">
            <div className="w-full max-w-sm h-96 bg-gradient-to-br from-blue-100 to-yellow-100 rounded-xl flex items-center justify-center overflow-hidden">
              {card.imageUrl ? (
                <img
                  src={card.imageUrl || "/placeholder.svg"}
                  alt={card.name}
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    const placeholder = target.nextElementSibling as HTMLElement
                    if (placeholder) placeholder.style.display = "flex"
                  }}
                />
              ) : (
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">🎴</div>
                  <div className="text-xl font-semibold">{card.name}</div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Card Number</label>
                <span className="text-lg font-semibold text-gray-900">{card.number || "N/A"}</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Rarity</label>
                <span className={`badge badge-${card.rarity}`}>{formatText(card.rarity)}</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Condition</label>
                <span className={`badge badge-${card.condition}`}>{formatText(card.condition)}</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Estimated Value</label>
                <span className="text-lg font-semibold text-blue-600">${card.value}</span>
              </div>
            </div>

            {card.notes && card.notes.trim() && (
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Collection Notes</label>
                <p className="text-gray-900 leading-relaxed">{card.notes}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleEdit}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit Card
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
