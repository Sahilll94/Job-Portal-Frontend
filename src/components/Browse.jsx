import React, { useEffect, useState } from 'react'
import Navbar from './Shared/Navbar'
import Job from './Job'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search, Loader2 } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const Browse = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const fetchJobs = async (query) => {
    try {
      setLoading(true)
      const response = await axios.get(`${JOB_API_END_POINT}/search?q=${encodeURIComponent(query)}`)
      if (response.data.success) {
        setJobs(response.data.jobs)
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
      toast.error('Failed to fetch jobs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const q = queryParams.get('q')
    if (q) {
      setSearchQuery(q)
      fetchJobs(q)
    }
  }, [location.search])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto my-10'>
        <form onSubmit={handleSearch} className='flex w-full max-w-2xl mx-auto mb-8 gap-2'>
          <Input
            type="text"
            placeholder="Search jobs by title, company, or keywords"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" className='bg-[#6A38C2] hover:bg-[#5b30a6]'>
            <Search className='h-5 w-5'/>
          </Button>
        </form>

        {loading ? (
          <div className='flex items-center justify-center h-64'>
            <Loader2 className='h-8 w-8 animate-spin text-[#6A38C2]' />
          </div>
        ) : (
          <>
            <h1 className='font-bold text-xl mb-6'>
              {searchQuery ? `Search Results for "${searchQuery}" (${jobs.length})` : 'All Jobs'}
            </h1>
            {jobs.length === 0 ? (
              <div className='text-center py-12'>
                <p className='text-gray-500'>No jobs found. Try different search terms.</p>
              </div>
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {jobs.map((job) => (
                  <Job key={job._id} job={job} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Browse