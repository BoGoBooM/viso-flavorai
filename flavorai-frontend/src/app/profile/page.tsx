'use client'

import React, { useEffect, useState } from 'react'
import { FaStar, FaRegStar } from 'react-icons/fa'
import Link from 'next/link'

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

export default function ProfilePage() {
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([])

  const userId = 1 // тимчасово

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('recipes') || '[]')
    const filtered = stored.filter((r: Recipe) => r.userId === userId)
    setMyRecipes(filtered)
  }, [])

  const handleDelete = (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this recipe?')
    if (!confirmed) return
  
    const allRecipes: Recipe[] = JSON.parse(localStorage.getItem('recipes') || '[]')
    const updatedAll = allRecipes.filter((r) => r.id !== id)
  
    localStorage.setItem('recipes', JSON.stringify(updatedAll))
  
    const filtered = updatedAll.filter((r) => r.userId === userId)
    setMyRecipes(filtered)
  }

  const handleRatingChange = (recipeId: number, newRating: number) => {
    const allRecipes: Recipe[] = JSON.parse(localStorage.getItem('recipes') || '[]')
  
    const updatedAll = allRecipes.map((r) =>
      r.id === recipeId ? { ...r, rating: newRating } : r
    )
  
    localStorage.setItem('recipes', JSON.stringify(updatedAll))
  
    const filtered = updatedAll.filter((r) => r.userId === userId)
    setMyRecipes(filtered)
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {myRecipes.length === 0 ? (
        <p>You have no recipes yet.</p>
      ) : (
        <ul>
          {myRecipes.map((recipe) => (
            <li key={recipe.id} className="mb-6 p-4 border rounded shadow-sm relative">
              <h2 className="text-xl font-semibold">{recipe.title}</h2>
              <p className="text-gray-700 mt-1">{recipe.description}</p>
              <p className="text-gray-600 mt-1">
                Ingredients:{' '}
                {Array.isArray(recipe.ingredients)
                  ? recipe.ingredients.map((i) => i.name).join(', ')
                  : 'N/A'}
              </p>
              <div className="flex space-x-1 text-yellow-400 items-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingChange(recipe.id, star)}
                    className="focus:outline-none"
                  >
                    {star <= recipe.rating ? <FaStar /> : <FaRegStar />}
                  </button>
                ))}
              </div>


              <button
                onClick={() => handleDelete(recipe.id)}
                className="absolute top-4 right-4 text-red-600 hover:text-red-800 font-bold"
                aria-label="Delete recipe"
              >
                ×
              </button>

              <Link
                href={`/recipes/edit/${recipe.id}`}
                className="absolute top-4 right-10 text-blue-600 hover:text-blue-800 font-semibold"
              >
                Edit
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link href="/recipes" className="text-blue-500 hover:underline mt-6 inline-block">
        &larr; Back to all recipes
      </Link>
    </div>
  )
}
