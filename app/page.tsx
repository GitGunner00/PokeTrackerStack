import { Suspense } from "react"
import { getCards } from "./lib/actions"
import Header from "./components/header"
import SearchSection from "./components/search-section"
import StatsGrid from "./components/stats-grid"
import CollectionSection from "./components/collection-section"

export default async function HomePage() {
  const cards = await getCards()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      <Header cards={cards} />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Suspense fallback={<div>Loading...</div>}>
            <SearchSection />
            <StatsGrid cards={cards} />
            <CollectionSection cards={cards} />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
