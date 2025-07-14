'use client'

import React, { useState, useEffect } from 'react'
import { FaStar, FaRegStar } from 'react-icons/fa'
import Link from 'next/link'

type Recipe = {
  id: number
  title: string
  description: string
  rating: number
  userId: number
  ingredients: { id: number; name: string }[]
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState<Recipe[]>([])

  useEffect(() => {
    // const fakeData: Recipe[] = [
    //   { id: 1, title: 'Pancakes', description: 'Fluffy pancakes...', rating: 4 },
    //   { id: 2, title: 'Spaghetti', description: 'Classic Italian...', rating: 5 },
    // ]
    // setRecipes(fakeData)
    // setFiltered(fakeData)
    const data = JSON.parse(localStorage.getItem('recipes') || '[]')
    setRecipes(data)
    setFiltered(data)
  }, [])

  useEffect(() => {
    setFiltered(
      recipes.filter((r) =>
        r.title.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, recipes])

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Recipes</h1>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs"
        />
        <Link href="/recipes/new" className="ml-4 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
          Add Recipe
        </Link>
        <Link href="/profile" className="ml-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
          Profile
        </Link>
      </div>

      <ul>
        {filtered.length === 0 && <li>No recipes found</li>}
        {filtered.map((recipe) => (
          <li key={recipe.id} className="mb-4 p-4 border rounded shadow-sm">
            <h2 className="text-xl font-semibold">{recipe.title}</h2>
            <p className="text-gray-700">{recipe.description}</p>
            <div className="flex space-x-1 text-yellow-400 items-center mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => {
                    const updated = recipes.map(r =>
                      r.id === recipe.id ? { ...r, rating: star } : r
                    )
                    setRecipes(updated)
                    setFiltered(
                      updated.filter((r) =>
                        r.title.toLowerCase().includes(search.toLowerCase())
                      )
                    )
                  }}
                  aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                >
                  {star <= recipe.rating ? <FaStar /> : <FaRegStar />}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}