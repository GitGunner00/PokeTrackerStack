"use client"

import { useState } from "react"
import AddCardModal from "./add-card-modal"

export default function AddCardButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
      >
        <span>+</span>
        Add Card
      </button>
      <AddCardModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
