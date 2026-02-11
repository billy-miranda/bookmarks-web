import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { api } from '../api/client';
import LinkForm from '../components/LinkForm';
import LinkList from '../components/LinkList';

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tag, setTag] = useState('');
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchLinks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (tag.trim()) params.tag = tag.trim();
      if (q.trim()) params.q = q.trim();
      const data = await api.links.list(params);
      setLinks(data);
    } catch (err) {
      setError(err.message || 'Failed to load bookmarks');
    } finally {
      setLoading(false);
    }
  }, [tag, q]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const handleSaved = () => {
    setEditing(null);
    setShowForm(false);
    fetchLinks();
  };

  const handleDeleted = () => {
    fetchLinks();
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        My bookmarks
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 2 }}>
        <TextField
          size="small"
          placeholder="Search title or URL"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          sx={{ minWidth: 180, flex: 1 }}
        />
        <TextField
          size="small"
          placeholder="Filter by tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          sx={{ minWidth: 140, flex: 1 }}
        />
      </Stack>

      {!showForm && !editing && (
        <Button variant="contained" onClick={() => setShowForm(true)} sx={{ mb: 2 }}>
          + Add bookmark
        </Button>
      )}

      {(showForm || editing) && (
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>
            {editing ? 'Edit bookmark' : 'New bookmark'}
          </Typography>
          <LinkForm
            link={editing}
            onSaved={handleSaved}
            onCancel={editing ? () => setEditing(null) : () => setShowForm(false)}
          />
        </Paper>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <LinkList links={links} onEdit={setEditing} onDeleted={handleDeleted} />
      )}
    </Box>
  );
}
