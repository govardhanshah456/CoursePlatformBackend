import React from 'react'
import { DataGrid } from "@mui/x-data-grid"
import { Box, Button } from "@mui/material"
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { useTheme } from 'next-themes'
import { useGetAllCoursesQuery } from '@/redux/features/course/courseApi'
import Loader from './Loader'
import { format } from "timeago.js"
import { useGetAllUsersQuery } from '@/redux/features/user/userApi'
type Props = {
    isAdmin?: boolean
}

const AllCourses = ({ isAdmin }: Props) => {
    const { theme, setTheme } = useTheme();
    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'name', headerName: 'Name', flex: 0.5 },
        { field: 'email', headerName: 'Email', flex: 0.5 },
        { field: 'role', headerName: 'Role', flex: 0.5 },
        { field: 'courses', headerName: 'Purchased Courses', flex: 0.5 },
        {
            field: "",
            headerName: "Delete",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button>
                            <AiOutlineDelete className='dark:text-white text-black' size={20} />
                        </Button>
                    </>
                )
            }
        }
    ]
    const { isLoading, data, error } = useGetAllUsersQuery({})
    const rows: any[] = [];
    let NewData = data.users;
    if (isAdmin) {
        NewData = NewData.filter((user: any) => user.role === 'admin')
    }
    NewData?.forEach((row: any) => {
        const element = {
            id: row._id,
            name: row.name,
            email: row.email,
            role: row.role,
            courses: row.courses.length
        }
        rows.push(element)
    })
    return (
        <div className='mt-[120px]'>
            {
                isLoading ?
                    <Loader />
                    : (
                        <Box m="20px">
                            <Box m="8px 0 0 0" height={"80vh"} sx={{
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
                                    borderBottom: theme === "dark" ? '1px solid #ffffff30 !important' : "1px solid #ccc !important"
                                },
                                "& .MuiTablePagination-root": {
                                    color: theme === "dark" ? "#fff" : "#000"
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
                                <DataGrid checkboxSelection rows={rows} columns={columns} />
                            </Box>
                        </Box>
                    )
            }

        </div>
    )
}

export default AllCourses