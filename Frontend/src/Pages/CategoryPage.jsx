import React from 'react'
import CategoryCardList from '../components/CategoryCardList'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const CategoryPage = () => {
    const navigate = useNavigate()
    return (
        <>

            <header className=" bg-white shadow-lg px-15 py-3  flex flex-wrap gap-6 justify-between items-center sticky top-0 z-20 rounded-b-md">
                <h1 className="text-3xl font-extrabold text-amber-900 tracking-wider">
                    ToyCycle
                </h1>

            </header>
             {/* Back Button */}
                  <div className="px-15 py-3 mt-2">
                    <button
                      onClick={() => navigate(-1)}
                      className="flex items-center text-amber-950 hover:text-amber-700 transition duration-200 text-lg"
                    >
                      <FaArrowLeft className="mr-2" /> Go Back
                    </button>
                  </div>
            <div>
                <h2 className="text-3xl font-semibold text-center text-amber-950 ">
                    All Categories
                </h2>    
                            <CategoryCardList showAll={true} />
            </div>
        </>
    )
}

export default CategoryPage
