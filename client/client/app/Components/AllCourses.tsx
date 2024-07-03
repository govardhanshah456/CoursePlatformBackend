import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid"
import { Box, Button } from "@mui/material"
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { useTheme } from 'next-themes'
import { useDeleteCourseMutation, useGetAllCoursesQuery } from '@/redux/features/course/courseApi'
import Loader from './Loader'
import { format } from "timeago.js"
import toast from 'react-hot-toast'
import Link from 'next/link'
type Props = {}

const AllCourses = (props: Props) => {
    const { theme, setTheme } = useTheme();
    const [courseId, setCourseId] = useState('')
    const [deleteCourse, { isSuccess, error: deleteCourseError }] = useDeleteCourseMutation()
    const handleCourseDelete = async (id: string) => {
        console.log(id)
        await deleteCourse(id);
    }
    useEffect(() => {
        if (isSuccess) {
            refetch()
            toast.success("Deleted COurse");
        }
        if (deleteCourseError && "data" in deleteCourseError) {
            toast.error((deleteCourseError as any)?.data?.message || "Some Error Occured While Deleting Course")
        }
    }, [])
    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'title', headerName: 'Course Title', flex: 1 },
        { field: 'ratings', headerName: 'Ratings', flex: 0.5 },
        { field: 'purchased', headerName: 'Purchased', flex: 0.5 },
        { field: 'created_at', headerName: 'Created At', flex: 0.5 },
        {
            field: " ",
            headerName: "Edit",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <div style={{ marginTop: "15px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Link href={`/admin/edit-course/${params.row.id}`}>
                            <AiOutlineEdit className='dark:text-white text-black' size={20} />
                        </Link>
                    </div>
                )
            }
        },
        {
            field: "  ",
            headerName: "Delete",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button onClick={() => { console.log(params.row); setCourseId(params.row.id); handleCourseDelete(params.row.id) }}>
                            <AiOutlineDelete className='dark:text-white text-black' size={20} />
                        </Button>
                    </>
                )
            }
        }
    ]
    const { isLoading, data, error, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true })
    const rows: any[] = [];
    data?.course?.forEach((row: any) => {
        const element = {
            id: row._id,
            title: row.name,
            ratings: row.ratings,
            purchased: row.purchased,
            created_at: format(row.createdAt)
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
                                <DataGrid checkboxSelection rows={rows} columns={columns} />
                            </Box>
                        </Box>
                    )
            }

        </div>
    )
}

export default AllCourses