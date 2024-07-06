// components/BasicMenu.jsx
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { User,LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { CerradoDeSesion } from '../../../../actions/cerrarsession';
import { toast } from 'sonner';

export default function ProfileMenu({userId}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

  };

  const handleCloseAndLogout = async () => {
    setAnchorEl(null);
    toast.dismiss();
    const res = await CerradoDeSesion();
    toast.info("Tu sesión ha sido cerrada");
  }

  const handleConfirmation = () => {
    setAnchorEl(null);
    toast.error("Estás seguro de cerrar sesión?", {
      action: <>
      <div>
        <button onClick={handleCloseAndLogout} className='hover:text-rose-600 text-red-900'>Confirmar</button>
        <button onClick={() => {toast.dismiss();setAnchorEl(null)}} className='hover:text-rose-600 text-red-900 '>Cancelar</button>
        </div>
      </> ,
  })
  }
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <User height={20} width={20} />
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
        <Link href={`/profile`}>
        <MenuItem onClick={handleClose} className='text-sm'>
            <Settings height={20} width={20} className="mr-2" /> Ver perfil
        </MenuItem>
        </Link>
        
        <MenuItem onClick={handleConfirmation} className='text-sm'>
            <LogOut height={20} width={20} className="mr-2" /> Cerrar Sesión

        </MenuItem>
      </Menu>
    </div>
  );
}
