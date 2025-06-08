import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Job } from '../context/JobsContext';

interface AddJobDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (job: Omit<Job, 'id' | 'applicationDate'>) => Promise<void>;
}

const validationSchema = yup.object({
  title: yup.string().required('Job title is required'),
  company: yup.string().required('Company name is required'),
  location: yup.string().required('Location is required'),
  type: yup.string().oneOf(['full-time', 'part-time', 'contract', 'internship']).required('Job type is required'),
  salary: yup.string().required('Salary is required'),
  description: yup.string().required('Description is required'),
  status: yup.string().oneOf(['saved', 'applied', 'interviewing', 'offer', 'rejected']).required('Status is required'),
});

const AddJobDialog: React.FC<AddJobDialogProps> = ({ open, onClose, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      company: '',
      location: '',
      type: 'full-time' as Job['type'],
      salary: '',
      description: '',
      status: 'saved' as Job['status'],
      isFavorite: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await onSubmit(values);
        formik.resetForm();
        onClose();
      } catch (error) {
        // Error handling is done in the parent component
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Add New Job</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Job Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="company"
                name="company"
                label="Company"
                value={formik.values.company}
                onChange={formik.handleChange}
                error={formik.touched.company && Boolean(formik.errors.company)}
                helperText={formik.touched.company && formik.errors.company}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="location"
                name="location"
                label="Location"
                value={formik.values.location}
                onChange={formik.handleChange}
                error={formik.touched.location && Boolean(formik.errors.location)}
                helperText={formik.touched.location && formik.errors.location}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Job Type</InputLabel>
                <Select
                  id="type"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                  label="Job Type"
                >
                  <MenuItem value="full-time">Full Time</MenuItem>
                  <MenuItem value="part-time">Part Time</MenuItem>
                  <MenuItem value="contract">Contract</MenuItem>
                  <MenuItem value="internship">Internship</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="salary"
                name="salary"
                label="Salary"
                value={formik.values.salary}
                onChange={formik.handleChange}
                error={formik.touched.salary && Boolean(formik.errors.salary)}
                helperText={formik.touched.salary && formik.errors.salary}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  id="status"
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  label="Status"
                >
                  <MenuItem value="saved">Saved</MenuItem>
                  <MenuItem value="applied">Applied</MenuItem>
                  <MenuItem value="interviewing">Interviewing</MenuItem>
                  <MenuItem value="offer">Offer</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Add Job
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddJobDialog; 