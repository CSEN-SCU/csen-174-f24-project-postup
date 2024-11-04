"use client";

import React from 'react';
import { auth } from "../utils/firebase";
import { useRouter } from 'next/navigation';
import { signInWithCustomToken } from 'firebase/auth';

const SignInPage: React.FC = () => {
    const router = useRouter();

    return (
        <div className="flex justify-center items-center h-screen">
            <button className="px-5 py-2 text-lg bg-blue-500 text-white rounded">
                Sign in with Google
            </button>
        </div>
    );
};

export default SignInPage;
