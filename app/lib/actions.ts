"use server"

import { revalidatePath } from "next/cache"
import type { PokemonCard } from "./types"
import { generateId } from "./utils"

// In a real application, this would be stored in a database
// For now, we'll use a simple in-memory store that resets on server restart
let pokemonCards: PokemonCard[] = [
  {
    id: "1",
    name: "Charizard",
    set: "base-set",
    number: "4/102",
    rarity: "rare-holo",
    condition: "near-mint",
    value: "350.00",
    imageUrl: "",
    notes: "First edition, excellent condition",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Pikachu",
    set: "base-set",
    number: "58/102",
    rarity: "common",
    condition: "mint",
    value: "25.00",
    imageUrl: "",
    notes: "",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Blastoise",
    set: "base-set",
    number: "2/102",
    rarity: "rare-holo",
    condition: "lightly-played",
    value: "180.00",
    imageUrl: "",
    notes: "Minor edge wear",
    createdAt: new Date().toISOString(),
  },
]

export async function getCards(): Promise<PokemonCard[]> {
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return pokemonCards
}

export async function addCard(formData: FormData): Promise<void> {
  const card: PokemonCard = {
    id: generateId(),
    name: formData.get("name") as string,
    set: formData.get("set") as string,
    number: (formData.get("number") as string) || undefined,
    rarity: formData.get("rarity") as string,
    condition: formData.get("condition") as string,
    value: (formData.get("value") as string) || "0.00",
    imageUrl: (formData.get("imageUrl") as string) || undefined,
    notes: (formData.get("notes") as string) || undefined,
    createdAt: new Date().toISOString(),
  }

  pokemonCards.push(card)
  revalidatePath("/")
}

export async function deleteCard(id: string): Promise<void> {
  pokemonCards = pokemonCards.filter((card) => card.id !== id)
  revalidatePath("/")
}

export async function updateCard(id: string, updates: Partial<PokemonCard>): Promise<void> {
  const index = pokemonCards.findIndex((card) => card.id === id)
  if (index !== -1) {
    pokemonCards[index] = { ...pokemonCards[index], ...updates }
    revalidatePath("/")
  }
}
