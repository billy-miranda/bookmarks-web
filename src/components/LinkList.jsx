import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import LinkItem from './LinkItem';

export default function LinkList({ links, onEdit, onDeleted }) {
  if (!links?.length) {
    return (
      <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="text.secondary">No bookmarks yet. Add one above.</Typography>
      </Paper>
    );
  }
  return (
    <Stack component="ul" spacing={1.5} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {links.map((link) => (
        <li key={link.id}>
          <LinkItem link={link} onEdit={onEdit} onDeleted={onDeleted} />
        </li>
      ))}
    </Stack>
  );
}
