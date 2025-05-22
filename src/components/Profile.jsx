import React, { useState } from 'react'
import Navbar from './Shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Pen, X } from 'lucide-react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'

const Profile = () => {
  const { user } = useSelector(store => store.auth)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullname: user?.fullname || '',
    phoneNumber: user?.phoneNumber || '',
    file: null
  })
  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    if (e.target.name === 'file') {
      setFormData({ ...formData, file: e.target.files[0] })
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const submitData = new FormData()
    submitData.append('fullname', formData.fullname)
    submitData.append('phoneNumber', formData.phoneNumber)
    if (formData.file) {
      submitData.append('file', formData.file)
    }

    try {
      const res = await axios.put(`${USER_API_END_POINT}/update`, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })

      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success('Profile updated successfully')
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Update error:', error)
      toast.error(error.response?.data?.message || 'Failed to update profile')
    }
  }

  if (!user) return <div>Please login to view profile</div>

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>
          <Button 
            variant="outline" 
            className="text-right"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <X /> : <Pen />}
          </Button>
        </div>
        
        {isEditing ? (
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='flex items-center gap-4'>
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar?.url || "https://github.com/shadcn.png"} alt={user.fullname} />
              </Avatar>
              <div className='space-y-2 flex-1'>
                <div>
                  <Label>Full Name</Label>
                  <Input
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <Label>Profile Picture</Label>
                  <Input
                    type="file"
                    name="file"
                    onChange={handleInputChange}
                    accept="image/*"
                  />
                </div>
                <Button type="submit" className="bg-[#6A38C2] mt-4">Save Changes</Button>
              </div>
            </div>
          </form>
        ) : (
          <div className='flex items-center gap-4'>
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar?.url || "https://github.com/shadcn.png"} alt={user.fullname} />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl'>{user.fullname}</h1>
              <p className='text-gray-600'>{user.email}</p>
              <p className='text-gray-500'>{user.phoneNumber}</p>
              <p className='text-gray-500 capitalize'>Role: {user.role}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile