import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute';
import MarathonsPage from '../pages/MarathonsPage';
import MarathonDetailsPage from '../pages/MarathonDetailsPage';
import MarathonRegisterPage from '../pages/MarathonRegisterPage';
import MyMarathonListPage from '../pages/MyMarathonListPage';

import DashboardLayout from '../layout/DashboardLayout';
import AddMarathon from '../pages/AddMarathon';
import MyApplyListPage from '../pages/MyApplyListPage';
import NotFound from '../pages/NotFound';
import MyProfile from '../pages/myProfile/MyProfile';
import UpdateProfile from '../pages/myProfile/UpdateProfile';
import ForgotPassword from '../components/ForgotPassword';





const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <NotFound></NotFound>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "forgot-password",
                element: <ForgotPassword></ForgotPassword>
            },
            {
                path: "/my-profile",
                element: (
                    <PrivateRoute>
                        <MyProfile></MyProfile>
                    </PrivateRoute>
                ),
            },
            {
                path: "/update-profile",
                element: (
                    <PrivateRoute>
                        <UpdateProfile></UpdateProfile>
                    </PrivateRoute>
                ),
            },
            {
                path: "/marathons",
                element:
                    <PrivateRoute>
                        <MarathonsPage></MarathonsPage>
                    </PrivateRoute>


            },
            {
                path: "/marathons/:id",
                element:
                    <PrivateRoute>
                        <MarathonDetailsPage></MarathonDetailsPage>
                    </PrivateRoute>
            },
            {
                path: "/marathons/:id/register",
                element: (
                    <PrivateRoute>
                        <MarathonRegisterPage></MarathonRegisterPage>
                    </PrivateRoute>
                ),
            },
            // {
            //     path: "/add-marathon",
            //     element: <PrivateRoute><AddMarathon /></PrivateRoute>
            // },
            /* -------- DASHBOARD লেআউট -------- */
            {
                path: "/dashboard",
                element: (
                    <PrivateRoute>
                        <DashboardLayout></DashboardLayout>
                    </PrivateRoute>
                ),
                children: [
                    // Sidebarlink ➕ AddMarathon
                    {
                        path: "add-marathon",
                        element: <AddMarathon></AddMarathon>
                    },

                    // Sidebarlink 📋 My Marathon List
                    {
                        path: "my-marathons",
                        element: <MyMarathonListPage></MyMarathonListPage>
                    },

                    // Sidebarlink 📝 My Apply List
                    {
                        path: "my-applications",
                        element: <MyApplyListPage></MyApplyListPage>
                    },

                    // Default route → /dashboard  (optional)
                    {
                        index: true,
                        element: <AddMarathon></AddMarathon>
                    },
                ],
            },
            // {
            //     path: "/dashboard/MyMarathonListPage",
            //     element:
            //         <PrivateRoute>
            //             <MyMarathonListPage></MyMarathonListPage>
            //         </PrivateRoute>
            // },
            // {
            //     path: "/dashboard/my-applies",
            //     element: <PrivateRoute>
            //         <MyApplyListPage></MyApplyListPage>
            //     </PrivateRoute>
            // },


        ],
    },
]);

export default router;