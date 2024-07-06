// components/BasicMenu.jsx
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Bell, Settings} from 'lucide-react';
import Link from 'next/link';

export default function ManagerActions() {
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
        <Settings height={20} width={20} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link href="/manager/trueques-pendientes">
          <MenuItem onClick={handleClose} className='text-sm'>Trueques pendientes</MenuItem>
        </Link>

        <Link href="/manager/trueques-revisados">
          <MenuItem onClick={handleClose} className='text-sm'>Trueques revisados</MenuItem>
        </Link>

      </Menu>
    </div>
  );
}
