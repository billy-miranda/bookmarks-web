import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { api } from '../api/client';

export default function LinkItem({ link, onEdit, onDeleted }) {
  const [deleting, setDeleting] = useState(false);

  const tags = Array.isArray(link.tags)
    ? link.tags
    : link.tags
      ? String(link.tags)
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

  const handleDelete = async () => {
    if (!confirm('Delete this bookmark?')) return;
    setDeleting(true);
    try {
      await api.links.delete(link.id);
      onDeleted?.();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card variant="outlined" sx={{ '&:hover': { boxShadow: 1 } }}>
      <CardContent sx={{ '&:last-child': { pb: 1 } }}>
        <Link
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{ wordBreak: 'break-all', fontWeight: 500 }}
        >
          {link.url}
        </Link>
        {link.title && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {link.title}
          </Typography>
        )}
        {tags.length > 0 && (
          <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {tags.map((t) => (
              <Chip key={t} label={t} size="small" variant="outlined" />
            ))}
          </Box>
        )}
      </CardContent>
      <CardActions sx={{ pt: 0, px: 1.5, pb: 1 }}>
        <Button size="small" onClick={() => onEdit(link)}>
          Edit
        </Button>
        <Button size="small" color="error" onClick={handleDelete} disabled={deleting}>
          {deleting ? '…' : 'Delete'}
        </Button>
      </CardActions>
    </Card>
  );
}
