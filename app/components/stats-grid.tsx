import type { PokemonCard } from "../lib/types"

interface StatsGridProps {
  cards: PokemonCard[]
}

export default function StatsGrid({ cards }: StatsGridProps) {
  const totalCards = cards.length
  const totalValue = cards.reduce((sum, card) => sum + Number.parseFloat(card.value || "0"), 0)
  const rareCards = cards.filter((card) =>
    ["rare", "rare-holo", "ultra-rare", "secret-rare"].includes(card.rarity),
  ).length

  const stats = [
    {
      label: "Total Cards",
      value: totalCards.toString(),
      icon: "👥",
      color: "blue",
    },
    {
      label: "Collection Value",
      value: `$${totalValue.toFixed(2)}`,
      icon: "⭐",
      color: "yellow",
    },
    {
      label: "Rare Cards",
      value: rareCards.toString(),
      icon: "💎",
      color: "green",
    },
    {
      label: "Sets Complete",
      value: "0",
      icon: "🔥",
      color: "red",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
              stat.color === "blue"
                ? "bg-blue-100 text-blue-600"
                : stat.color === "yellow"
                  ? "bg-yellow-100 text-yellow-600"
                  : stat.color === "green"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
            }`}
          >
            {stat.icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
