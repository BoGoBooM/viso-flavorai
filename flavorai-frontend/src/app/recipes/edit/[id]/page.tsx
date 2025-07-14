'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

type Ingredient = {
  id: number
  name: string
}

type Recipe = {
  id: number
  title: string
  description: string
  ingredients: Ingredient[]
  rating: number
  userId: number
}

export default function EditRecipePage() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params.id)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState<Ingredient[]>([])

  useEffect(() => {
    const recipes: Recipe[] = JSON.parse(localStorage.getItem('recipes') || '[]')
    const recipe = recipes.find((r) => r.id === id)
    if (!recipe) return

    setTitle(recipe.title)
    setDescription(recipe.description)
    setIngredients(recipe.ingredients)
  }, [id])

  const updateIngredient = (id: number, name: string) => {
    setIngredients((prev) =>
      prev.map((ing) => (ing.id === id ? { ...ing, name } : ing))
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedRecipe: Recipe = {
      id,
      title,
      description,
      ingredients,
      rating: 0,
      userId: 1,
    }

    const recipes: Recipe[] = JSON.parse(localStorage.getItem('recipes') || '[]')
    const updated = recipes.map((r) => (r.id === id ? updatedRecipe : r))
    localStorage.setItem('recipes', JSON.stringify(updated))
    router.push('/profile')
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Edit Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 min-h-[100px]"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Ingredients</label>
          {ingredients.map((ingredient, idx) => (
            <div key={ingredient.id} className="flex items-center mb-2 space-x-2">
              <input
                type="text"
                value={ingredient.name}
                onChange={(e) => updateIngredient(ingredient.id, e.target.value)}
                className="flex-grow border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}
