import React, { useEffect, useState } from 'react'
import { styles } from '../Styles/styles'
import { useUpdatePasswordMutation } from '@/redux/features/user/userApi'
import toast from 'react-hot-toast'
type Props = {

}
const ChangePassword: React.FC<Props> = ({ }) => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation()
  const passwordHandler = () => {
    if (newPassword !== oldPassword) {
      toast.error("Password Does Not Match.");
    }
    updatePassword({
      oldPassword,
      newPassword
    })
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success("Password Updated Successfully");
    }
    if (error) {
      const message = (error as any)?.data?.message || "Unknown Error Occured";
      toast.error(message)
    }
  })
  return (
    <div className='w-full pl-7 px-2 800px:px-5 800px:pl-8'>
      <h1 className='block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-[#fff] pb-2'>
        Change Password
      </h1>
      <div className='w-full'>
        <form onSubmit={passwordHandler} className='flex flex-col items-center'>
          <div className='w-[100%] 800px:w-[60%] mt-5'>
            <label className='block pb-2'>Old Password</label>
            <input type='password' className={`${styles.input} !w-[95%] mb-4 800px:mb-0 dark:text-white text-black`} required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          </div>
          <div className='w-[100%] 800px:w-[60%] mt-5'>
            <label className='block pb-2'>New Password</label>
            <input type='password' className={`${styles.input} !w-[95%] mb-4 800px:mb-0 dark:text-white text-black`} required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div className='w-[100%] 800px:w-[60%] mt-5'>
            <label className='block pb-2'>Confirm Password</label>
            <input type='password' className={`${styles.input} !w-[95%] mb-4 800px:mb-0 dark:text-white text-black`} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <input type='submit' value={'Update'} required className='w-[95%] h-[40%] border border-[#37a39a] text-center text-black dark:text-[#fff] rounded-[3px] mt-8 cursor-pointer' />
        </form>
      </div>
    </div>
  )
}

export default ChangePassword