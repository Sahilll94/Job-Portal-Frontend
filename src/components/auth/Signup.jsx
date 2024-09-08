import React, { useState } from "react";
import Navbar from "../Shared/Navbar";
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { RadioGroup } from "../ui/radio-group";
import { Button } from '../ui/button'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setLoading } from "@/redux/authSlice";

const Signup = () => {

    const [input,setInput] = useState({
        fullname:"",
        email:"",
        phoneNumber:"",
        password:"",
        role:"",
        file:""
    });

    const {loading} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]:e.target.value});
    }

    const changeFileHandler = (e) => {
        setInput({...input, file:e.target.files?.[0]});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if(input.file){
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers:{ 'Content-Type':"multipart/form-data" },
                withCredentials:true
            });
            console.log(res.data); // Log the entire response to check structure

            // Temporarily simplify the success condition
            if (res.status === 201) { // Check if the response status is correct
                navigate("/login");
                toast.success(res.data.message || "Account Created Successfully");
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            dispatch(setLoading(false));
        } 
    }



    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto mt-20">
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-200  rounded-md  p-4  my-10">
                    <h1 className="font-bold text-xl mb-5">Sign up</h1>
                    <div className="my-2">
                        <Label>Full Name</Label>
                        <Input type="text" value={input.fullname} name="fullname" onChange={changeEventHandler} placeholder="Enter your full name" />
                    </div>

                    <div className="my-2">
                        <Label>Email Address</Label>
                        <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="Enter your Email Address" />
                    </div>

                    <div className="my-2">
                        <Label>Phone Number</Label>
                        <Input type="text" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} placeholder="Enter your Phone Number" />
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

                        <div className="flex items-center gap-2">
                            <Label>IMAGE</Label>
                            <Input accept="image/*" type="file" onChange={changeFileHandler} className="cursor-pointer"/>
                        </div>
                    </div>

                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4 bg-black text-white py-2 rounded-md hover:bg-gray-800">Sign Up</Button>
                    }
                    
                    <span className="text-sm">Already have an account?<Link to="/login" className="text-blue-600">&nbsp; Login</Link></span>
                </form>
            </div>
        </div>
    );
};

export default Signup;
