import React from 'react'
import { Link } from 'react-router-dom'
import { tabs } from '~/data/data'


const Header = () => {
    return (
        <header className='w-full py-4 px-12 border-b flex justify-between items-center'>
            <Link to="/" className='text-4xl bg-gradient-to-r bg-clip-text text-transparent from-red-500 to-purple-500 font-bold'>  QuizPatch</Link >
            <nav className='flex gap-x-5'>
                {tabs.map((item) => (
                    <Link key={item.id} to={item.to} className='bg-zinc-100 hover:bg-zinc-200 border rounded-md px-4 py-2 transition-colors flex items-center gap-x-2'>
                        <span><item.icon /></span>
                        <span>{item.title}</span>
                    </Link>
                ))}
            </nav>
        </header>
    )
}

export default Header