'use client'

import { useState } from 'react'

export default function DiceRoller2d20() {
  const [results, setResults] = useState<number[]>([])
  const [successes, setSuccesses] = useState<number | null>(null)
  const [skillLevel, setSkillLevel] = useState<number>(10) // domyślnie 10

  const rollDice = () => {
    const rolls = [rollD20(), rollD20()]
    const successCount = rolls.reduce((acc, roll) => {
      if (roll === 1) return acc + 2
      if (roll <= skillLevel) return acc + 1
      return acc
    }, 0)

    setResults(rolls)
    setSuccesses(successCount)
  }

  const rollD20 = () => Math.floor(Math.random() * 20) + 1

  return (
    <div className="bg-gray-800 p-6 rounded-2xl text-white max-w-sm shadow-xl">
      <h2 className="text-2xl mb-4">🎲 Rzut 2d20</h2>

      <label className="block mb-2">
        Skill Level:
        <input
          type="number"
          value={skillLevel}
          onChange={(e) => setSkillLevel(parseInt(e.target.value))}
          className="ml-2 p-1 rounded text-black w-16"
        />
      </label>

      <button
        onClick={rollDice}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 mt-2 rounded"
      >
        Rzuć kośćmi
      </button>

      {results.length > 0 && (
        <div className="mt-4">
          <p className="text-lg">🎯 Wyniki: {results.join(', ')}</p>
          <p className="text-xl mt-2">✅ Sukcesy: {successes}</p>
        </div>
      )}
    </div>
  )
}
