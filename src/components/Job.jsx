import React, { useState } from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { format } from 'date-fns'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const [isSaved, setIsSaved] = useState(false)
    const [isApplying, setIsApplying] = useState(false)
    const { user } = useSelector(store => store.auth)
    const navigate = useNavigate()

    const handleSave = async () => {
        if (!user) {
            navigate('/login')
            return
        }
        setIsSaved(!isSaved)
        // TODO: Implement save job functionality with backend
    }

    const handleApply = async () => {
        if (!user) {
            navigate('/login')
            return
        }
        
        try {
            setIsApplying(true)
            const response = await axios.post(`${APPLICATION_API_END_POINT}/apply`, {
                jobId: job._id
            }, {
                withCredentials: true
            })

            if (response.data.success) {
                toast.success('Application submitted successfully')
            }
        } catch (error) {
            console.error('Application error:', error)
            toast.error(error.response?.data?.message || 'Failed to submit application')
        } finally {
            setIsApplying(false)
        }
    }

    const formatDate = (date) => {
        try {
            return format(new Date(date), 'MMM d, yyyy')
        } catch {
            return 'Invalid date'
        }
    }

    return (
        <div className='p-5 rounded-md bg-white border border-gray-200 hover:shadow-lg transition-shadow'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{formatDate(job?.createdAt)}</p>
                <Button 
                    variant="outline" 
                    className={`rounded-full ${isSaved ? 'bg-[#6A38C2] text-white' : ''}`} 
                    size="icon"
                    onClick={handleSave}
                >
                    <Bookmark />
                </Button>
            </div>
           
            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{job?.location}</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-4 flex-wrap'>
                {job?.positions && (
                    <Badge className={'text-blue-700 font-bold'} variant="ghost">
                        {job.positions} Positions
                    </Badge>
                )}
                {job?.type && (
                    <Badge className={'text-[#F83002] font-bold'} variant="ghost">
                        {job.type}
                    </Badge>
                )}
                {job?.salary && (
                    <Badge className={'text-[#7209b7] font-bold'} variant="ghost">
                        {job.salary}
                    </Badge>
                )}
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Button variant="outline" onClick={() => {}}>View Details</Button>
                <Button 
                    className="bg-[#7209b7] hover:bg-[#6008a0]"
                    onClick={handleApply}
                    disabled={isApplying}
                >
                    {isApplying ? 'Applying...' : 'Apply Now'}
                </Button>
            </div>
        </div>
    )
}

export default Job