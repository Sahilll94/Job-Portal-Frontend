import React, { useState } from "react";
import Navbar from "../Shared/Navbar";
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { RadioGroup } from "../ui/radio-group";
import { Button } from '../ui/button'
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'


const Login = () => {
    const [input,setInput] = useState({
        email:"",
        password:"",
        role:"",
    });

    const {loading} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]:e.target.value});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            });
            if(res.data.success){
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message); // Show error message from response
            } else {
                toast.error("Something went wrong, please try again later."); // Fallback error message
            }
        }finally{
            dispatch(setLoading(false));
        } 
    }


    
    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto mt-36">
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-200  rounded-md  p-4  my-10">
                    <h1 className="font-bold text-xl mb-5">Login</h1>
                    

                    <div className="my-2">
                        <Label>Email Address</Label>
                        <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="Enter your Email Address" />
                    </div>


                    <div className="my-2">
                        <Label>Password</Label>
                        <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="Enter your password" />
                    </div>

                    <div className="flex items-center justify-between">
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="student" checked={input.role == 'student'} onChange={changeEventHandler} className="cursor-pointer"/>
                                <Label htmlFor="option-one">STUDENT</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="recruiter" checked={input.role == 'recruiter'} onChange={changeEventHandler} className="cursor-pointer"/>
                                <Label htmlFor="option-two">RECRUITER</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4 bg-black text-white py-2 rounded-md hover:bg-gray-800">Login</Button>
                    }

                    <span className="text-sm">Don't have an account?<Link to="/signup" className="text-blue-600">&nbsp;Sign Up</Link></span>
                </form>
            </div>
        </div>
    );
};

export default Login;
