import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface HeaderProps {
  title: string;
}
const Header = (props: HeaderProps) => {
  const { title } = props;

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'ActiveBorder' }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
      </Toolbar>
    </>
  );
}

export default Header