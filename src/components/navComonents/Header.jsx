
import React from 'react'
import { Menu, X } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import SearchItem from './SearchItem'
import Cart from './Cart'
import { useProducts } from '../../context/Product/ProductContext'
import { useAuth } from '../../context/Auth/AuthContex'
import Logout from '../Logout'



export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const { token, userData} = useAuth()
  
const navigate = useNavigate()

  const image = userData?.image
  const firstName = userData?.firstName
  const lastName = userData?.lastName


  const {searchQuery , handleSearch} = useProducts()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="relative w-full bg-blue-900 ">
      <div className="flex items-center justify-between px-4 py-2 max-w-8xl sm:px-6 lg:px-8">
        <Logo />
        {token? <SearchItem  handleSearch={(query) => handleSearch(query)} searchQuery={searchQuery}  />: null}
      {token?  <NavLink to={'/cart'}>

         <Cart/>
        </NavLink> : null}


        {token? <div className="hidden mt-2 ml-2 md:block" onClick={toggleMenu}>
          <span className="inline-flex items-center space-x-2 cursor-pointer " >
            <img
              className="w-10 h-10 rounded-full"
              src={image} //img from user
              alt=""
            />
            <span className="font-bold text-white">{firstName}</span>
          </span>
          {isMenuOpen && (
            <div className="absolute inset-y-0 top-0 right-0 z-50 p-2 text-center transition duration-150 ease-in origin-center transform ">
              <div className="w-[250px] bg-white divide-y-2 rounded-lg shadow-lg divide-gray-50 ring-1 ring-black ring-opacity-5">
                <div className="px-5 pt-5 pb-6">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center space-x-2">
                      <span>

                        <img
                          className="w-10 h-10 rounded-full"
                          src={image} //img from user
                          alt="name"
                        />
                      </span>
                      <span className="font-bold">{firstName + " " + lastName}</span>
                    </div>
                    <div className="-mr-2">
                      <button
                        type="button"
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        <span className="sr-only">Close menu</span>
                        <X className="w-6 h-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center mt-4 ml-3 space-x-2">
                    <span className="flex flex-col">
                     
                     <Logout/>

                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>: null}
        {token? <div className="ml-2 md:hidden">
          <Menu onClick={toggleMenu} className="w-6 h-6 cursor-pointer" />
        </div>: null}
        {token? isMenuOpen && (
            <div className="absolute inset-y-0 top-0 right-0 z-50 p-2 text-center transition duration-150 ease-in origin-center transform ">
            <div className="bg-white divide-y-2 rounded-lg shadow-lg w-[250px] divide-gray-50 ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>

                      <img
                        className="w-10 h-10 rounded-full"
                        src={image} //img from user
                        alt="name"
                      />
                    </span>
                    <span className="font-bold">{firstName + " " + lastName}</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center mt-4 ml-3 space-x-2">
                  <span className="flex flex-col">
                  <Logout/>

                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : <button className='px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700' onClick={() => navigate('/login')}>Login</button>}
      </div>
    </div>
  )
}
