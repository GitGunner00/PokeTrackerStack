"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export default function SearchSection() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams],
  )

  const handleSearch = (value: string) => {
    router.push("?" + createQueryString("search", value))
  }

  const handleFilter = (name: string, value: string) => {
    router.push("?" + createQueryString(name, value))
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search cards by name, set, or number..."
          defaultValue={searchParams.get("search") ?? ""}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <select
          defaultValue={searchParams.get("set") ?? ""}
          onChange={(e) => handleFilter("set", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[140px]"
        >
          <option value="">All Sets</option>
          <option value="base-set">Base Set</option>
          <option value="jungle">Jungle</option>
          <option value="fossil">Fossil</option>
          <option value="team-rocket">Team Rocket</option>
          <option value="gym-heroes">Gym Heroes</option>
          <option value="neo-genesis">Neo Genesis</option>
        </select>

        <select
          defaultValue={searchParams.get("condition") ?? ""}
          onChange={(e) => handleFilter("condition", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[140px]"
        >
          <option value="">All Conditions</option>
          <option value="mint">Mint</option>
          <option value="near-mint">Near Mint</option>
          <option value="lightly-played">Lightly Played</option>
          <option value="moderately-played">Moderately Played</option>
          <option value="heavily-played">Heavily Played</option>
          <option value="damaged">Damaged</option>
        </select>

        <select
          defaultValue={searchParams.get("rarity") ?? ""}
          onChange={(e) => handleFilter("rarity", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[140px]"
        >
          <option value="">All Rarities</option>
          <option value="common">Common</option>
          <option value="uncommon">Uncommon</option>
          <option value="rare">Rare</option>
          <option value="rare-holo">Rare Holo</option>
          <option value="ultra-rare">Ultra Rare</option>
          <option value="secret-rare">Secret Rare</option>
        </select>
      </div>
    </div>
  )
}
