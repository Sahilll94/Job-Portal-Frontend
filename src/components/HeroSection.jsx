import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const Herosection = () => {
  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>Empowering your future with personalized job and internship matches.</span>
        <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
        <p className='font-bold'>Join thousands of professionals and students in finding the perfect opportunity that aligns with your goals. From internships to full-time roles, we connect you to what matters.</p>
        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
          <Input type="text" placeholder="Find your next role by job title" className="outline-none border-none w-full"/>
          <Button className='rounded-r-full bg-[#6A38C2]'>
            <Search className='h-5 w-5'/>
          </Button>
        </div>
      </div>

    </div> 
  )
}

export default Herosection