import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { api } from '../api/client';

export default function LinkForm({ link = null, onSaved, onCancel }) {
  const [url, setUrl] = useState(link?.url ?? '');
  const [title, setTitle] = useState(link?.title ?? '');
  const [tags, setTags] = useState(Array.isArray(link?.tags) ? link.tags.join(', ') : (link?.tags ? String(link.tags) : ''));
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (link) {
      setUrl(link.url ?? '');
      setTitle(link.title ?? '');
      setTags(Array.isArray(link.tags) ? link.tags.join(', ') : (link.tags ? String(link.tags) : ''));
    }
  }, [link]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!url.trim()) {
      setError('URL is required');
      return;
    }
    setSaving(true);
    try {
      const tagArr = tags.split(',').map((t) => t.trim()).filter(Boolean);
      if (link) {
        await api.links.update(link.id, { url: url.trim(), title: title.trim() || undefined, tags: tagArr });
      } else {
        await api.links.create(url.trim(), title.trim() || undefined, tagArr);
      }
      onSaved?.();
      if (!link) {
        setUrl('');
        setTitle('');
        setTags('');
      }
    } catch (err) {
      setError(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="URL"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
          required
          fullWidth
          size="small"
        />
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Optional title"
          fullWidth
          size="small"
        />
        <TextField
          label="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="dev, tutorial"
          fullWidth
          size="small"
        />
        <Stack direction="row" spacing={1}>
          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? 'Saving…' : (link ? 'Update' : 'Add bookmark')}
          </Button>
          {onCancel && (
            <Button type="button" variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
