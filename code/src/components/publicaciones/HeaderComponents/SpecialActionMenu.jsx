// components/BasicMenu.jsx
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {BookOpenCheck, Briefcase, Contact, MapPin, ShieldCheckIcon,Star,Trash2,UserPlus} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { borrarPublicaciones } from '../../../../actions/borrarPublicaciones';
import { toast } from 'sonner';
export default function SpecialActionsMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseAndDelete = async () => {
    setAnchorEl(null);
    toast.dismiss();
    const res = await borrarPublicaciones();
    if (res.success) {
        toast.success(res.success);
        router.refresh();

    }
  }

  const handleTotalConfirmation = () => {
    setAnchorEl(null);
    console.log("hola")
    toast.error("SEGURO?!", {
      action: <>
      <div>
        <button onClick={handleCloseAndDelete} className='hover:text-rose-600 mr-2 text-red-900'>Confirmar</button>
        <button onClick={() => {toast.dismiss();setAnchorEl(null) }} className='hover:text-rose-600 text-red-900 '>Cancelar</button>
        </div>
      </>
  })
  }

  const handleConfirmation = () => {
    setAnchorEl(null);
    toast.error("Estas a punto de borrar todas las publicaciones!", {
      action: <>
      <div>
        <button onClick={() => {handleTotalConfirmation();toast.dismiss()}} className='hover:text-rose-600 text-red-900'>Confirmar</button>
        <button onClick={() => {toast.dismiss();setAnchorEl(null) }} className='hover:text-rose-600 text-red-900 '>Cancelar</button>
        </div>
      </>
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
      <ShieldCheckIcon height={20} width={20} />
      </Button>
      <Menu
        id="special-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >

        <div>
        <MenuItem onClick={handleConfirmation} className="text-sm text-red-500"> <Trash2 height={20} width={20} className='mr-2' />Borrar publicaciones</MenuItem>
        <Link href="/admin/view-employees">
        <MenuItem onClick={handleClose} className="text-sm"> <Contact height={20} width={20} className='mr-2' />Ver gerentes</MenuItem>
        </Link>
        <Link href="/admin/auth/register-manager">
        <MenuItem onClick={handleClose} className="text-sm"> <UserPlus height={20} width={20} className='mr-2' />Registrar gerente</MenuItem>
        </Link>
        <Link href="/admin/create-sede">
        <MenuItem onClick={handleClose} className="text-sm"> <MapPin height={20} width={20} className='mr-2' />Crear sede</MenuItem>
        </Link>
        <Link href="/admin/posts">
        <MenuItem onClick={handleClose} className="text-sm"> <BookOpenCheck height={20} width={20} className='mr-2' />Gestionar publicaciones</MenuItem>
        </Link>
        <Link href="/admin/reviews">
        <MenuItem onClick={handleClose} className="text-sm"> <Star height={20} width={20} className='mr-2' />Ver reseñas</MenuItem>
        </Link>
        <Link href="/admin/reports">
        <MenuItem onClick={handleClose} className="text-sm"> <Briefcase height={20} width={20} className='mr-2' />Ver reportes</MenuItem>
        </Link>
        </div>
    
      </Menu>
    </div>
  );
}
