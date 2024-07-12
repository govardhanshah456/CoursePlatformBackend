import { useGetAllCoursesQuery } from '@/redux/features/course/courseApi';
import { useGetAllOrdersQuery } from '@/redux/features/orders/ordersApi';
import { useGetAllUsersQuery } from '@/redux/features/user/userApi';
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { AiOutlineMail } from 'react-icons/ai';
import Loader from './Loader';
import { Box, Toolbar } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

type Props = {
    isDashboard?: boolean;
}

const AllInvoices = ({ isDashboard }: Props) => {
    //   const {theme,setTheme} = useTheme();
    const { isLoading, data } = useGetAllOrdersQuery({})
    const { data: usersData } = useGetAllUsersQuery({});
    const { data: courseData } = useGetAllCoursesQuery({});

    const [orderData, setOrderData] = useState<any>([]);

    useEffect(() => {
        if (data) {
            const temp = data?.orders?.map((item: any) => {
                const user = usersData?.users?.find((user: any) => user._id === item.user._id)
                const course = courseData?.course?.find((course: any) => course._id === item.course._id)
                return {
                    ...item,
                    userName: user?.name,
                    userEmail: user?.email,
                    title: course?.name,
                    price: "$" + course?.price
                }
            })
            setOrderData(temp)
        }
    }, [courseData?.course, data, usersData?.users])

    const columns: any = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "username", headerName: "Name", flex: isDashboard ? .6 : .5 },
        ...(isDashboard ? [] : [{
            field: "userEmail",
            headerName: "Email",
            flex: 1,
        }, {
            field: "title",
            headerName: "Course Title",
            flex: 1,
        },]),
        { field: "price", headerName: "Price", flex: 0.5 },
        ...(isDashboard ? [{
            field: "created_at",
            headerName: "Created At",
            flex: 0.5
        }] : [
            {
                field: " ",
                headerName: "Email",
                flex: 0.2,
                renderCell: (params: any) => {
                    return (
                        <a href={`mailto:${params.row.userEmail}`}>
                            <AiOutlineMail
                                className="dark:text-white text-black"
                                size={20}
                            />
                        </a>
                    );
                },
            },
        ])
    ];
    const { theme } = useTheme();
    const rows = [
        {
            id: 1,
            username: "John Doe",
            userEmail: "john.doe@example.com",
            title: "Introduction to Web Development",
            price: 49.99,
            created_at: "2023-07-15T10:30:00Z",
            isDashboard: false
        },
        {
            id: 2,
            username: "Jane Smith",
            userEmail: "jane.smith@example.com",
            title: "Advanced JavaScript Techniques",
            price: 79.99,
            created_at: "2023-07-16T14:45:00Z",
            isDashboard: true
        },
        {
            id: 3,
            username: "Bob Johnson",
            userEmail: "bob.johnson@example.com",
            title: "Data Science Fundamentals",
            price: 99.99,
            created_at: "2023-07-17T09:15:00Z",
            isDashboard: false
        },
        {
            id: 4,
            username: "Alice Brown",
            userEmail: "alice.brown@example.com",
            title: "Mobile App Development with React Native",
            price: 89.99,
            created_at: "2023-07-18T16:20:00Z",
            isDashboard: true
        },
        {
            id: 5,
            username: "Charlie Wilson",
            userEmail: "charlie.wilson@example.com",
            title: "Machine Learning Basics",
            price: 129.99,
            created_at: "2023-07-19T11:00:00Z",
            isDashboard: false
        },
        {
            id: 6,
            username: "Eva Davis",
            userEmail: "eva.davis@example.com",
            title: "UI/UX Design Principles",
            price: 69.99,
            created_at: "2023-07-20T13:30:00Z",
            isDashboard: true
        },
        {
            id: 7,
            username: "Frank Miller",
            userEmail: "frank.miller@example.com",
            title: "Blockchain Technology Overview",
            price: 109.99,
            created_at: "2023-07-21T08:45:00Z",
            isDashboard: false
        },
        {
            id: 8,
            username: "Grace Lee",
            userEmail: "grace.lee@example.com",
            title: "Cloud Computing Essentials",
            price: 84.99,
            created_at: "2023-07-22T15:10:00Z",
            isDashboard: true
        },
        {
            id: 9,
            username: "Henry Taylor",
            userEmail: "henry.taylor@example.com",
            title: "Cybersecurity Fundamentals",
            price: 94.99,
            created_at: "2023-07-23T10:20:00Z",
            isDashboard: false
        },
        {
            id: 10,
            username: "Ivy Clark",
            userEmail: "ivy.clark@example.com",
            title: "Artificial Intelligence for Beginners",
            price: 119.99,
            created_at: "2023-07-24T12:55:00Z",
            isDashboard: true
        }
    ];
    return (
        <div className={!isDashboard ? 'mt-[120px] ' : 'mt-[0px]'}>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <Box m={isDashboard ? "0" : "40px"}>
                        <Box m={isDashboard ? "0" : "40px 0 0 0"} height={isDashboard ? "35vh" : "90vh"} overflow={"hidden"} sx={{
                            "& .MuiDataGrid-root": {
                                border: "none",
                                outline: "none"
                            },
                            "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                                color: theme === "dark" ? "#fff" : "#000"
                            },
                            "& .MuiDataGrid-sortIcon": {
                                color: theme === "dark" ? "#fff" : "#000"
                            },
                            "& .MuiDataGrid-row": {
                                color: theme === "dark" ? "#fff" : "#000",
                                borderBottom: theme === "dark" ? '1px solid #ffffff30 !important' : "1px solid #ccc !important",
                            },
                            "& .MuiTablePagination-root": {
                                color: theme === "dark" ? "#fff" : "#000"
                            },
                            "& .MuiDataGrid-cell .MuiDataGrid-cell--textLeft": {
                                display: "flex",
                                flexDirection: 'column',
                                justifyContent: 'center'
                            },
                            "& .css-yrdy0g-MuiDataGrid-columnHeaderRow": {
                                backgroundColor: theme === "dark" ? "#3e4396 !important" : "#A4A9FC !important"
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: "none"
                            },
                            "& .name-column--cell": {
                                color: theme === "dark" ? "#fff" : "#000"
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                color: theme === "dark" ? "#fff" : "#000",
                                borderBottom: "none",
                                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC"
                            },
                            "& .MuiDataGrid-virtualScroller": {
                                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0"
                            },
                            "& .MuiDataGrid-footerContainer": {
                                color: theme === "dark" ? "#fff" : "#000",
                                borderTop: "none",
                                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC"
                            },
                            "& .MuiCheckbox-root": {
                                color: theme === "dark" ? `#b7ebde !important` : `#000 important`
                            },
                            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                color: `#fff !important`
                            }
                        }}>
                            <DataGrid checkboxSelection={isDashboard ? false : true} rows={rows} columns={columns} />
                        </Box>
                    </Box>
                )
            }
        </div>
    )
}

export default AllInvoices