"use client"

import { useState } from "react"
import { addCard } from "../lib/actions"
import { X } from "lucide-react"

interface AddCardModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddCardModal({ isOpen, onClose }: AddCardModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      await addCard(formData)
      onClose()
    } catch (error) {
      console.error("Error adding card:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Add New Pokemon Card</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form action={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Pokemon Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="e.g., Charizard"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="set" className="block text-sm font-medium text-gray-700 mb-2">
                Set *
              </label>
              <select
                id="set"
                name="set"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Set</option>
                <option value="base-set">Base Set</option>
                <option value="jungle">Jungle</option>
                <option value="fossil">Fossil</option>
                <option value="team-rocket">Team Rocket</option>
                <option value="gym-heroes">Gym Heroes</option>
                <option value="neo-genesis">Neo Genesis</option>
              </select>
            </div>

            <div>
              <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                id="number"
                name="number"
                placeholder="e.g., 4/102"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="rarity" className="block text-sm font-medium text-gray-700 mb-2">
                Rarity *
              </label>
              <select
                id="rarity"
                name="rarity"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Rarity</option>
                <option value="common">Common</option>
                <option value="uncommon">Uncommon</option>
                <option value="rare">Rare</option>
                <option value="rare-holo">Rare Holo</option>
                <option value="ultra-rare">Ultra Rare</option>
                <option value="secret-rare">Secret Rare</option>
              </select>
            </div>

            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">
                Condition *
              </label>
              <select
                id="condition"
                name="condition"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Condition</option>
                <option value="mint">Mint</option>
                <option value="near-mint">Near Mint</option>
                <option value="lightly-played">Lightly Played</option>
                <option value="moderately-played">Moderately Played</option>
                <option value="heavily-played">Heavily Played</option>
                <option value="damaged">Damaged</option>
              </select>
            </div>

            <div>
              <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Value
              </label>
              <input
                type="number"
                id="value"
                name="value"
                step="0.01"
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Card Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              placeholder="https://example.com/card-image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder="Any additional notes about this card..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Adding..." : "Add Card"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
