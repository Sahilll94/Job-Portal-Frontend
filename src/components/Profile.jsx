import React from 'react'
import Navbar from './Shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Pen } from 'lucide-react'

const Profile = () => {
  return (
    <div>
      <Navbar />

      <div className='max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>


        </div>
        <div className='flex items-center gap-4'>
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
          </Avatar>
          <div>
            <h1 className='font-medium text-xl'>Full Name</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis id repudiandae labore accusamus a suscipit deleniti dignissimos laborum molestias delectus.</p>
          </div>
          <Button className="text-right" variant="outline"><Pen/></Button>
        </div>
      </div>
    </div>
  )
}

export default Profile