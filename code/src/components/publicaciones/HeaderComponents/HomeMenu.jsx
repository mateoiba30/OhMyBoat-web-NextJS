// components/BasicMenu.jsx
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Home, MapPinned, Milestone} from 'lucide-react';
import Link from 'next/link';

export default function HomeMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Home height={20} width={20} />
      </Button>
      <Menu
        id="home-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link href="/viewPosts">
        <MenuItem onClick={handleClose} className="text-sm"> <Milestone  height={20} width={20} className='mr-2' />Ver publicaciones</MenuItem>
        </Link>
        <Link href="/view-sedes">
        <MenuItem onClick={handleClose} className="text-sm"> <MapPinned height={20} width={20} className='mr-2' />Ver sedes</MenuItem>
        </Link>
        
      </Menu>
    </div>
  );
}
