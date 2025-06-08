import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import AddJobDialog from '../components/AddJobDialog';
import JobCard from '../components/JobCard';
import { useJobs } from '../context/JobsContext';


const Dashboard: React.FC = () => {
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const theme = useTheme();
  const { jobs, loading, error, addJob } = useJobs();

  const handleAddJob = async (jobData: any) => {
    try {
      await addJob(jobData);
      setIsAddJobOpen(false);
    } catch (error) {
      console.error('Failed to add job:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            JobTrackr
          </Typography>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <FilterListIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Grid container spacing={3}>
          {/* Header Section */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                color: 'white',
              }}
            >
              <Box>
                <Typography variant="h4" gutterBottom>
                  Job Dashboard
                </Typography>
                <Typography variant="subtitle1">
                  Track and manage your job applications
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setIsAddJobOpen(true)}
                sx={{
                  backgroundColor: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                Add New Job
              </Button>
            </Paper>
          </Grid>

          {/* Stats Section */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {['Saved', 'Applied', 'Interviewing', 'Offers'].map((status) => (
                <Grid item xs={12} sm={6} md={3} key={status}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 140,
                      background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                      color: 'white',
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {status}
                    </Typography>
                    <Typography variant="h4">
                      {jobs.filter(job => job.status.toLowerCase() === status.toLowerCase()).length}
                    </Typography>
                    <Typography variant="subtitle2">Jobs</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Job List Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recent Jobs
              </Typography>
              <Grid container spacing={2}>
                {jobs.map((job) => (
                  <Grid item xs={12} md={6} lg={4} key={job.id}>
                    <JobCard job={job} />
                  </Grid>
                ))}
                {jobs.length === 0 && (
                  <Grid item xs={12}>
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                      <Typography variant="h6" color="text.secondary">
                        No jobs found. Add your first job!
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <AddJobDialog
        open={isAddJobOpen}
        onClose={() => setIsAddJobOpen(false)}
        onSubmit={handleAddJob}
      />
    </Box>
  );
};

export default Dashboard; 