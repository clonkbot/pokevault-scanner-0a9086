import { useState, useEffect } from 'react'

interface PokemonCard {
  id: string
  name: string
  set: string
  rarity: string
  type: string
  marketPrice: number
  estimatedValue: number
  supply: number
  supplyTrend: 'decreasing' | 'stable' | 'increasing'
  undervalueScore: number
  imageUrl: string
  lastUpdated: string
}

const mockCards: PokemonCard[] = [
  {
    id: '1',
    name: 'Charizard VSTAR',
    set: 'Brilliant Stars',
    rarity: 'Secret Rare',
    type: 'Fire',
    marketPrice: 45.99,
    estimatedValue: 89.00,
    supply: 234,
    supplyTrend: 'decreasing',
    undervalueScore: 94,
    imageUrl: 'https://images.pokemontcg.io/swsh9/174_hires.png',
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    name: 'Umbreon VMAX',
    set: 'Evolving Skies',
    rarity: 'Alt Art',
    type: 'Dark',
    marketPrice: 189.00,
    estimatedValue: 320.00,
    supply: 89,
    supplyTrend: 'decreasing',
    undervalueScore: 91,
    imageUrl: 'https://images.pokemontcg.io/swsh7/215_hires.png',
    lastUpdated: '2024-01-15'
  },
  {
    id: '3',
    name: 'Pikachu VMAX',
    set: 'Vivid Voltage',
    rarity: 'Rainbow Rare',
    type: 'Electric',
    marketPrice: 78.50,
    estimatedValue: 145.00,
    supply: 156,
    supplyTrend: 'stable',
    undervalueScore: 88,
    imageUrl: 'https://images.pokemontcg.io/swsh4/188_hires.png',
    lastUpdated: '2024-01-15'
  },
  {
    id: '4',
    name: 'Rayquaza VMAX',
    set: 'Evolving Skies',
    rarity: 'Alt Art',
    type: 'Dragon',
    marketPrice: 245.00,
    estimatedValue: 380.00,
    supply: 67,
    supplyTrend: 'decreasing',
    undervalueScore: 86,
    imageUrl: 'https://images.pokemontcg.io/swsh7/218_hires.png',
    lastUpdated: '2024-01-15'
  },
  {
    id: '5',
    name: 'Gengar VMAX',
    set: 'Fusion Strike',
    rarity: 'Alt Art',
    type: 'Psychic',
    marketPrice: 125.00,
    estimatedValue: 195.00,
    supply: 112,
    supplyTrend: 'stable',
    undervalueScore: 84,
    imageUrl: 'https://images.pokemontcg.io/swsh8/271_hires.png',
    lastUpdated: '2024-01-15'
  },
  {
    id: '6',
    name: 'Moonbreon',
    set: 'Moonlit Sorrow',
    rarity: 'Special Art Rare',
    type: 'Dark',
    marketPrice: 156.00,
    estimatedValue: 240.00,
    supply: 98,
    supplyTrend: 'decreasing',
    undervalueScore: 82,
    imageUrl: 'https://images.pokemontcg.io/swsh7/203_hires.png',
    lastUpdated: '2024-01-15'
  },
  {
    id: '7',
    name: 'Mew VMAX',
    set: 'Fusion Strike',
    rarity: 'Secret Rare',
    type: 'Psychic',
    marketPrice: 55.00,
    estimatedValue: 85.00,
    supply: 189,
    supplyTrend: 'increasing',
    undervalueScore: 79,
    imageUrl: 'https://images.pokemontcg.io/swsh8/269_hires.png',
    lastUpdated: '2024-01-15'
  },
  {
    id: '8',
    name: 'Dragonite V',
    set: 'Pokemon GO',
    rarity: 'Alt Art',
    type: 'Dragon',
    marketPrice: 38.00,
    estimatedValue: 58.00,
    supply: 267,
    supplyTrend: 'stable',
    undervalueScore: 76,
    imageUrl: 'https://images.pokemontcg.io/pgo/76_hires.png',
    lastUpdated: '2024-01-15'
  }
]

const typeColors: Record<string, string> = {
  Fire: '#FF6B35',
  Dark: '#705898',
  Electric: '#F7D02C',
  Dragon: '#7038F8',
  Psychic: '#F95587',
  Water: '#6390F0',
  Grass: '#7AC74C'
}

function App() {
  const [cards, setCards] = useState<PokemonCard[]>([])
  const [selectedCard, setSelectedCard] = useState<PokemonCard | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'score' | 'price' | 'supply'>('score')
  const [isLoading, setIsLoading] = useState(true)
  const [scanProgress, setScanProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsLoading(false)
          setCards(mockCards)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 150)
    return () => clearInterval(interval)
  }, [])

  const filteredCards = cards
    .filter(card => filter === 'all' || card.type.toLowerCase() === filter)
    .sort((a, b) => {
      if (sortBy === 'score') return b.undervalueScore - a.undervalueScore
      if (sortBy === 'price') return a.marketPrice - b.marketPrice
      return a.supply - b.supply
    })

  const totalPotentialValue = cards.reduce((sum, card) => sum + (card.estimatedValue - card.marketPrice), 0)
  const avgUndervalueScore = cards.length ? Math.round(cards.reduce((sum, card) => sum + card.undervalueScore, 0) / cards.length) : 0

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white noise-bg gradient-mesh">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" style={{ animation: 'float 8s ease-in-out infinite' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" style={{ animation: 'float 10s ease-in-out infinite', animationDelay: '-3s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" style={{ animation: 'float 12s ease-in-out infinite', animationDelay: '-5s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500 flex items-center justify-center" style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
                  <span className="text-2xl">💎</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#0a0a0f] animate-pulse" />
              </div>
              <div>
                <h1 className="font-archivo text-2xl tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500">POKÉ</span>
                  <span className="text-white">VAULT</span>
                </h1>
                <p className="text-xs text-white/40 font-mono tracking-widest">UNDERVALUED CARD SCANNER</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-white/60 font-mono">Live Scanning</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/40">Last Updated</p>
                <p className="text-sm font-mono text-yellow-400">Jan 15, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-[#0a0a0f] flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-40 h-56 mx-auto mb-8">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-red-500/20 border border-white/10" />
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" style={{ animation: 'scan-line 1.5s linear infinite' }} />
              </div>
              <div className="absolute inset-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300"
                    style={{ width: `${Math.min(scanProgress, 100)}%` }}
                  />
                </div>
              </div>
            </div>
            <h2 className="font-archivo text-xl mb-2">Scanning Market Data</h2>
            <p className="text-white/40 font-mono text-sm">{Math.round(Math.min(scanProgress, 100))}% Complete</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Cards Scanned', value: cards.length.toString(), suffix: '', color: 'from-blue-400 to-cyan-400' },
            { label: 'Avg Score', value: avgUndervalueScore.toString(), suffix: '%', color: 'from-green-400 to-emerald-400' },
            { label: 'Potential Value', value: `$${totalPotentialValue.toFixed(0)}`, suffix: '', color: 'from-yellow-400 to-orange-400' },
            { label: 'Weekly Update', value: 'Active', suffix: '', color: 'from-pink-400 to-red-400' }
          ].map((stat, i) => (
            <div 
              key={stat.label}
              className="relative group animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
              <div className="relative p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all">
                <p className="text-xs text-white/40 font-mono tracking-wider mb-1">{stat.label}</p>
                <p className={`text-2xl font-archivo text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                  {stat.value}{stat.suffix}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-white/40 font-mono mr-2">TYPE:</span>
            {['all', 'fire', 'dark', 'electric', 'dragon', 'psychic'].map(type => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === type 
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black' 
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/40 font-mono mr-2">SORT:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'score' | 'price' | 'supply')}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-mono focus:outline-none focus:border-yellow-500/50"
            >
              <option value="score">Undervalue Score</option>
              <option value="price">Market Price</option>
              <option value="supply">Supply</option>
            </select>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCards.map((card, index) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className="group cursor-pointer animate-fade-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative card-shine rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-4 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
                {/* Score Badge */}
                <div className="absolute -top-3 -right-3 z-20">
                  <div className={`px-3 py-1 rounded-full font-mono text-sm font-bold ${
                    card.undervalueScore >= 90 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black' :
                    card.undervalueScore >= 80 ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-black' :
                    'bg-white/20 text-white'
                  }`}>
                    {card.undervalueScore}%
                  </div>
                </div>

                {/* Card Image */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-black/50 to-black/20">
                  <img 
                    src={card.imageUrl} 
                    alt={card.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/245x342/1a1a2e/ffffff?text=${encodeURIComponent(card.name)}`
                    }}
                  />
                  <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                </div>

                {/* Card Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-archivo text-lg leading-tight">{card.name}</h3>
                    <p className="text-xs text-white/40 font-mono">{card.set}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span 
                      className="px-2 py-0.5 rounded-md text-xs font-medium"
                      style={{ backgroundColor: `${typeColors[card.type]}20`, color: typeColors[card.type] }}
                    >
                      {card.type}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10 text-xs text-white/60">
                      {card.rarity}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-white/40">Market</p>
                        <p className="text-lg font-mono text-white">${card.marketPrice.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/40">Est. Value</p>
                        <p className="text-lg font-mono text-green-400">${card.estimatedValue.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <span className="text-white/40">Supply:</span>
                      <span className="font-mono text-white">{card.supply}</span>
                    </div>
                    <div className={`flex items-center gap-1 ${
                      card.supplyTrend === 'decreasing' ? 'text-red-400' :
                      card.supplyTrend === 'increasing' ? 'text-green-400' : 'text-white/40'
                    }`}>
                      {card.supplyTrend === 'decreasing' ? '↓' : card.supplyTrend === 'increasing' ? '↑' : '→'}
                      <span className="capitalize">{card.supplyTrend}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!isLoading && filteredCards.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-archivo text-xl mb-2">No cards found</h3>
            <p className="text-white/40">Try adjusting your filters</p>
          </div>
        )}
      </main>

      {/* Card Detail Modal */}
      {selectedCard && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedCard(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] rounded-3xl border border-white/10 overflow-hidden animate-fade-up"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2 gap-6 p-6">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-black/50 to-black/20">
                <img 
                  src={selectedCard.imageUrl}
                  alt={selectedCard.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/245x342/1a1a2e/ffffff?text=${encodeURIComponent(selectedCard.name)}`
                  }}
                />
                <div className="absolute inset-0 holographic opacity-20" />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="font-archivo text-2xl">{selectedCard.name}</h2>
                      <p className="text-white/40 font-mono text-sm">{selectedCard.set}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-xl font-mono text-xl font-bold ${
                      selectedCard.undervalueScore >= 90 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black' :
                      selectedCard.undervalueScore >= 80 ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-black' :
                      'bg-white/20 text-white'
                    }`}>
                      {selectedCard.undervalueScore}%
                    </div>
                  </div>

                  <div className="flex gap-2 mb-6">
                    <span 
                      className="px-3 py-1 rounded-lg text-sm font-medium"
                      style={{ backgroundColor: `${typeColors[selectedCard.type]}20`, color: typeColors[selectedCard.type] }}
                    >
                      {selectedCard.type}
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-white/10 text-sm text-white/60">
                      {selectedCard.rarity}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/40 text-sm">Market Price</span>
                        <span className="font-mono text-xl">${selectedCard.marketPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/40 text-sm">Estimated Value</span>
                        <span className="font-mono text-xl text-green-400">${selectedCard.estimatedValue.toFixed(2)}</span>
                      </div>
                      <div className="pt-2 border-t border-white/10">
                        <div className="flex justify-between items-center">
                          <span className="text-white/40 text-sm">Potential Gain</span>
                          <span className="font-mono text-lg text-yellow-400">
                            +${(selectedCard.estimatedValue - selectedCard.marketPrice).toFixed(2)} ({Math.round((selectedCard.estimatedValue / selectedCard.marketPrice - 1) * 100)}%)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-white/40 text-xs mb-1">Available Supply</p>
                        <p className="font-mono text-xl">{selectedCard.supply}</p>
                        <p className={`text-xs mt-1 ${
                          selectedCard.supplyTrend === 'decreasing' ? 'text-red-400' :
                          selectedCard.supplyTrend === 'increasing' ? 'text-green-400' : 'text-white/40'
                        }`}>
                          {selectedCard.supplyTrend === 'decreasing' ? '↓ Decreasing' : 
                           selectedCard.supplyTrend === 'increasing' ? '↑ Increasing' : '→ Stable'}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-white/40 text-xs mb-1">Last Scanned</p>
                        <p className="font-mono text-xl">{selectedCard.lastUpdated}</p>
                        <p className="text-xs text-white/40 mt-1">Weekly updates</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-archivo text-lg hover:from-yellow-400 hover:to-orange-400 transition-all hover:scale-[1.02]">
                    Add to Watchlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 mt-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-sm">💎</div>
              <span className="font-archivo text-sm text-white/40">PokéVault Scanner</span>
            </div>
            <p className="text-xs text-white/30 font-mono">
              Requested by <span className="text-white/50">@0xSwampy</span> · Built by <span className="text-white/50">@clonkbot</span>
            </p>
            <p className="text-xs text-white/30">Data refreshed weekly • Not financial advice</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App