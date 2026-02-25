/* eslint-disable react-hooks/incompatible-library */
import React from 'react'
import { Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { logoutUserAPI, updateUserAPI } from '~/redux/user/userSlice'

function SecurityTab() {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const [openConfirm, setOpenConfirm] = React.useState(false)
  const [pendingData, setPendingData] = React.useState(null)

  const onSubmit = (data) => {
    setPendingData(data)
    setOpenConfirm(true)
  }

  const handleConfirm = () => {
    if (pendingData?.newPassword !== pendingData?.confirmPassword) {
      toast.error('Passwords do not match.')
      return
    }
    toast.promise(
      dispatch(updateUserAPI({
        currentPassword: pendingData?.currentPassword,
        newPassword: pendingData?.newPassword
      })),
      { pending: 'Updating...' }
    ).then(res => {
      if (!res.error){
        toast.success('Successfully changed your password, please login again!');
        dispatch(logoutUserAPI(false));
      } 
    })
    setOpenConfirm(false)
    setPendingData(null)
  }

  const handleCancel = () => {
    setOpenConfirm(false)
    setPendingData(null)
  }

  return (
    <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 520 }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
          Security settings
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 420, mx: 'auto' }}>
          <TextField
            fullWidth
            type="password"
            label="Current password"
            size="small"
            sx={{ mb: 2 }}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword?.message}
            {...register('currentPassword', { required: 'Current password is required' })}
          />

          <TextField
            fullWidth
            type="password"
            label="New password"
            size="small"
            sx={{ mb: 2 }}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            {...register('newPassword', {
              required: 'New password is required',
              minLength: { value: 6, message: 'Minimum 6 characters' }
            })}
          />

          <TextField
            fullWidth
            type="password"
            label="Confirm new password"
            size="small"
            sx={{ mb: 2 }}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Please confirm your new password',
              validate: (value) =>
                value === watch('newPassword') || 'Passwords do not match'
            })}
          />

          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Save changes
          </Button>
        </Box>
      </Box>
      <Dialog open={openConfirm} onClose={handleCancel}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>Do you want to change?</DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>No</Button>
          <Button onClick={handleConfirm} variant="contained">Yes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default SecurityTab