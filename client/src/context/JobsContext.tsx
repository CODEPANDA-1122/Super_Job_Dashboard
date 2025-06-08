import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary: string;
  description: string;
  status: 'saved' | 'applied' | 'interviewing' | 'offer' | 'rejected';
  applicationDate: Date;
  isFavorite: boolean;
}

interface JobsContextType {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  addJob: (job: Omit<Job, 'id' | 'applicationDate'>) => Promise<void>;
  updateJob: (id: string, updates: Partial<Job>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  filterJobs: (filters: Partial<Job>) => Job[];
  searchJobs: (query: string) => Job[];
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const JobsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addJob = useCallback(async (jobData: Omit<Job, 'id' | 'applicationDate'>) => {
    try {
      setLoading(true);
      const newJob: Job = {
        ...jobData,
        id: Math.random().toString(36).substr(2, 9),
        applicationDate: new Date(),
      };
      setJobs(prev => [...prev, newJob]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add job');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateJob = useCallback(async (id: string, updates: Partial<Job>) => {
    try {
      setLoading(true);
      setJobs(prev => prev.map(job => 
        job.id === id ? { ...job, ...updates } : job
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update job');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteJob = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setJobs(prev => prev.filter(job => job.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete job');
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleFavorite = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setJobs(prev => prev.map(job =>
        job.id === id ? { ...job, isFavorite: !job.isFavorite } : job
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle favorite');
    } finally {
      setLoading(false);
    }
  }, []);

  const filterJobs = useCallback((filters: Partial<Job>) => {
    return jobs.filter(job => {
      return Object.entries(filters).every(([key, value]) => {
        if (key === 'isFavorite') {
          return job.isFavorite === value;
        }
        return job[key as keyof Job] === value;
      });
    });
  }, [jobs]);

  const searchJobs = useCallback((query: string) => {
    const searchTerm = query.toLowerCase();
    return jobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm) ||
      job.company.toLowerCase().includes(searchTerm) ||
      job.location.toLowerCase().includes(searchTerm) ||
      job.description.toLowerCase().includes(searchTerm)
    );
  }, [jobs]);

  const value = {
    jobs,
    loading,
    error,
    addJob,
    updateJob,
    deleteJob,
    toggleFavorite,
    filterJobs,
    searchJobs,
  };

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
};

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
}; 