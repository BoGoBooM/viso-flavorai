'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

type Ingredient = {
  id: number
  name: string
}

const NewRecipePage = () => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [instructions, setInstructions] = useState('')
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: 1, name: '' },
  ])

  const addIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      { id: Date.now(), name: '' },
    ])
  }

  const removeIngredient = (id: number) => {
    setIngredients((prev) => prev.filter((ing) => ing.id !== id))
  }

  const updateIngredientName = (id: number, name: string) => {
    setIngredients((prev) =>
      prev.map((ing) => (ing.id === id ? { ...ing, name } : ing))
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description || ingredients.some(i => !i.name)) {
      alert('Please fill out all fields')
      return
    }
  
    const newRecipe = {
      id: Date.now(),
      title,
      description,
      instructions,
      ingredients,
      rating: 0,
      userId: 1, // temporary placeholder
    }
  
    const existing = JSON.parse(localStorage.getItem('recipes') || '[]')
    localStorage.setItem('recipes', JSON.stringify([...existing, newRecipe]))
  
    router.push('/recipes')
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Add New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-semibold">Recipe Title</label>
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
          <label className="block mb-1 font-semibold">Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
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
                onChange={(e) => updateIngredientName(ingredient.id, e.target.value)}
                className="flex-grow border border-gray-300 rounded px-3 py-2"
                placeholder={`Ingredient ${idx + 1}`}
                required
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(ingredient.id)}
                  className="text-red-500 font-bold px-2"
                  aria-label="Remove ingredient"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="mt-2 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
          >
            Add Ingredient
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
        >
          Save Recipe
        </button>
      </form>
    </div>
  )
}

export default NewRecipePage
