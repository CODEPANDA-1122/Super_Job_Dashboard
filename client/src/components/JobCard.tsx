import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Job } from '../context/JobsContext';

interface JobCardProps {
  job: Job;
  onToggleFavorite?: (id: string) => void;
  onUpdateStatus?: (id: string, status: Job['status']) => void;
  onDelete?: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  onToggleFavorite,
  onUpdateStatus,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'saved':
        return 'default';
      case 'applied':
        return 'primary';
      case 'interviewing':
        return 'info';
      case 'offer':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="div" gutterBottom>
            {job.title}
          </Typography>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.(job.id);
            }}
          >
            {job.isFavorite ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </Box>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {job.company}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {job.location}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label={job.type}
            size="small"
            variant="outlined"
          />
          <Chip
            label={job.status}
            size="small"
            color={getStatusColor(job.status)}
          />
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          {job.salary}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button size="small" color="primary">
          View Details
        </Button>
        <IconButton size="small" onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {['saved', 'applied', 'interviewing', 'offer', 'rejected'].map((status) => (
            <MenuItem
              key={status}
              onClick={() => {
                onUpdateStatus?.(job.id, status as Job['status']);
                handleMenuClose();
              }}
            >
              Mark as {status}
            </MenuItem>
          ))}
          <MenuItem
            onClick={() => {
              onDelete?.(job.id);
              handleMenuClose();
            }}
            sx={{ color: 'error.main' }}
          >
            Delete
          </MenuItem>
        </Menu>
      </CardActions>
    </Card>
  );
};

export default JobCard; 