import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid"
import { Box, Button, Input, Modal } from "@mui/material"
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { useTheme } from 'next-themes'
import { useGetAllCoursesQuery } from '@/redux/features/course/courseApi'
import Loader from './Loader'
import { format } from "timeago.js"
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation } from '@/redux/features/user/userApi'
import { styles } from '../Styles/styles'
import toast from 'react-hot-toast'
type Props = {
    isAdmin?: boolean
}

const AllUsers = ({ isAdmin }: Props) => {
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
                        <Button onClick={() => handleDelete(params.row.id)}>
                            <AiOutlineDelete className='dark:text-white text-black' size={20} />
                        </Button>
                    </>
                )
            }
        }
    ]
    const handleDelete = async (id: string) => {
        await deleteUser(id);
    }

    const [updateUserRole, { error: updateRoleError, isSuccess }] = useUpdateUserRoleMutation({})
    const [deleteUser, { error: deleteUserError, isSuccess: isUserDeleteSuccess }] = useDeleteUserMutation({})
    useEffect(() => {
        if (isUserDeleteSuccess) {
            toast.success("User Deletion Successfull.");
        }
        if (deleteUserError && 'data' in deleteUserError) {
            toast.error((deleteUserError as any)?.data?.message || 'Error Occured While Deleting User');
        }
    }, [isUserDeleteSuccess, deleteUserError])
    const { isLoading, data, error } = useGetAllUsersQuery({})
    console.log(data)
    const rows: any[] = [];
    let NewData = data?.user;
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
    const [active, setActive] = useState(false)
    const [email, setEmail] = useState('')
    const handleSubmit = () => {

    }
    return (
        <div className='mt-[120px]'>
            {
                isLoading ?
                    <Loader />
                    : (
                        <Box m="20px">
                            {isAdmin ? <div className="w-full flex justify-end">
                                <div className={`${styles.button} !w-[200px] dark:bg-[#57c7a3] !h-[35px] dark:border dark:border-[#fff]`} onClick={() => setActive(!active)}>
                                    Add New Member
                                </div>
                            </div> : null}
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
                            {
                                active && (
                                    <Modal open={active} onClose={() => setActive(!active)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                                        <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                            <h1 className={`${styles.title}`}>Add New Member</h1>
                                            <div className='mt-4'>
                                                <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className={`${styles.input}`} placeholder='Enter Email...' />
                                                <select name="" id="" className={`${styles.input} !mt-6`}>
                                                    <option value="admin">Admin</option>
                                                    <option value="user">User</option>
                                                </select>
                                                <br />
                                                <div className={`${styles.button} my-6 !h-[30px]`} onClick={handleSubmit}>
                                                    Submit
                                                </div>
                                            </div>
                                        </Box>
                                    </Modal>
                                )
                            }
                        </Box>
                    )
            }

        </div>
    )
}

export default AllUsers