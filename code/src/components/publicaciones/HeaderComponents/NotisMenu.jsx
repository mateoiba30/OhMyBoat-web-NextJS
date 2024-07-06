import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Bell,CircleAlert,CircleCheck } from 'lucide-react';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Badge from '@mui/material/Badge';
import { NotifSeen, seeNotis } from '../../../../actions/notifications';
import { useRouter } from 'next/navigation';

const NotisMenu = ({ notificacionesArray, userId, unseenNotisNumber }) => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [notis, setNotis] = useState(unseenNotisNumber > 0 ? unseenNotisNumber : 0);

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifSeen = async (notifId) => {
    await NotifSeen(notifId);
    if (notis > 0) {
      setNotis(notis - 1);
    }
    router.refresh()
  }

  const handleRedirect = () => {
    router.push('/profile/notifications')
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="relative">
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="focus:outline-none"
      >
        <Badge badgeContent={notis} color="primary">
          <Bell height={20} width={20} />
        </Badge>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          style: {
            maxHeight: '72vh', // Limita la altura máxima
            width: '300px', // Establece el ancho del menú
          },
        }}
      >
        <ScrollArea className="w-full rounded-md border shadow-lg">
          <div className="p-4 bg-white rounded-lg">
            <Link href="/profile/notifications">
              <h1 className="text-sm font-semibold text-center text-blue-500 hover:text-blue-700 cursor-pointer mb-2">
                Ver historial de notificaciones
              </h1>
            </Link>
            <Separator className="my-2" />
            {notificacionesArray.length === 0 ? (
              <h4 className="text-sm font-semibold leading-none text-center text-gray-700">
                No hay notificaciones nuevas por el momento
              </h4>
            ) : null }
            {notificacionesArray.slice((notificacionesArray.length-10),notificacionesArray.length).reverse().map((notif) => 
              (
              <div key={notif.id} className="my-2">
                { notif.seen === false && (
                    <div
                    className='hover:bg-slate-200 rounded-md transition duration-300 p-2 cursor-pointer'
                    onClick={() => handleNotifSeen(notif.id)} // Updated here
                  >
                    <div className='flex'>
                      <span className="text-sm font-semibold text-gray-800">{notif.title}</span>
                        <CircleAlert size={20} className="text-blue-400 ml-2" />
                    </div>
                    <div className="text-sm text-gray-800">{notif.description}</div>

                  </div>
                )}
                { notif.seen === true && (
                  <div
                  className='bg-muted rounded-md transition duration-300 p-2s p-2'
                >
                  <div className='flex'>
                    <span className="text-sm font-semibold text-gray-800">{notif.title}</span>
                    <CircleCheck width={20} height={20} className="text-slate-400 ml-2" />
                  </div>
                  <div className="text-sm text-gray-800">{notif.description}</div>

                </div>
                )}

              
              </div>
            ))}
          </div>
        </ScrollArea>
      </Menu>
    </div>
  );
}

export default NotisMenu;
