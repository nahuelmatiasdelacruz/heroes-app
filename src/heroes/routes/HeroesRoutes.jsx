import React from 'react'
import { Navbar } from '../../ui'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DCPage, MarvelPage, Search, Hero } from '../pages'

export const HeroesRoutes = () => {
  return (
    <>
      <Navbar/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/marvel" />} />
          <Route path="dc" element={<DCPage />} />
          <Route path="hero/:heroId" element={<Hero />} />
          <Route path="marvel" element={<MarvelPage />} />
          <Route path="search" element={<Search />} />
        </Routes>
      </div>
    </>
  )
}