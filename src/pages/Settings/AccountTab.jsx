import styled from '@emotion/styled'
import { Box, Button, Stack, TextField, Typography, Avatar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { selectCurrentUser, updateUserAPI } from '~/redux/user/userSlice'
import { singleFileValidator } from '~/utils/validators'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

function AccountTab() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [openConfirm, setOpenConfirm] = React.useState(false)
  const [pendingData, setPendingData] = React.useState(null)
  const initialGeneralForm = {
    displayName: currentUser?.display_name || ''
  };
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: initialGeneralForm
  });

  const submitChangeGeneralInfomation = (data) => {
    if (data.displayName === currentUser?.display_name) {
      toast.info('No changes detected.');
      return;
    }
    setPendingData(data);
    setOpenConfirm(true);
  }

  const handleConfirm = () => {
    if (pendingData){
      toast.promise(
        dispatch(updateUserAPI({ display_name: pendingData.displayName })),
        { pending: 'Updating...' }
      ).then(res => {
        if(!res.error) toast.success('User updated successfully')
      })
    }
    setOpenConfirm(false)
    setPendingData(null)
  }

  const handleCancel = () => {
    setOpenConfirm(false)
    setPendingData(null)
  }

  const uploadAvatar = (e) => {
    const file = e.target?.files?.[0];
    const error = singleFileValidator(file);
    if(error){
      toast.error(error);
      return;
    }
    const reqData = new FormData()
    reqData.append('avatar', file);
    // TODO: call API to upload avatar
    toast.success('Avatar uploaded (mock).');
  }

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Account settings</Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
        <Avatar
          sx={{ width: 80, height: 80 }}
          src={currentUser?.avatar_url || ''}
          alt={currentUser?.display_name || 'User'}
        />
        <Button variant="outlined" component="label">
          Upload avatar
          <VisuallyHiddenInput type="file" accept="image/*" onChange={uploadAvatar} />
        </Button>
      </Stack>

      <Box component="form" onSubmit={handleSubmit(submitChangeGeneralInfomation)} sx={{ mt: 3, maxWidth: 420 }}>
        <TextField
          fullWidth
          label="Display name"
          size="small"
          error={!!errors.displayName}
          helperText={errors.displayName?.message}
          {...register('displayName', {
            required: 'Display name is required',
            minLength: { value: 2, message: 'Minimum 2 characters' }
          })}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={isSubmitting}
        >
          Save changes
        </Button>
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

export default AccountTab