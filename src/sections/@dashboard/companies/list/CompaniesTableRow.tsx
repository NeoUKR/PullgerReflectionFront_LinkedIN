import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { IconButton, Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem, Button } from '@mui/material';
// components
import Label from '@/components/Label';
import Iconify from '@/components/Iconify';
import { TableMoreMenu } from '@/components/table';
import { AnyAction } from 'redux';

// ----------------------------------------------------------------------

type Props = {
  row: AnyAction,
  selected: boolean,
  onEditRow: VoidFunction,
  onSelectRow: VoidFunction,
  onDeleteRow: VoidFunction,
  onOpenProfile: VoidFunction,
  onOpenLI: VoidFunction,
  onOpenLIsale: VoidFunction,
  onSetSuitable: VoidFunction,
  onSetUnsuitable: VoidFunction,
  onSetUnknownSuitable: VoidFunction,
};

export default function CompaniesTableRow(
  { row, 
    selected, 
    onOpenProfile, 
    onOpenLI, 
    onOpenLIsale, 
    onSetSuitable, 
    onSetUnsuitable, 
    onSetUnknownSuitable, 
    onEditRow, 
    onSelectRow, 
    onDeleteRow 

  }:Props) {
  const theme = useTheme();

  const { name, avatarUrl, company, role, isVerified, status } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = ( event: React.MouseEvent<HTMLElement> ) => {
    setOpenMenuActions( event.currentTarget );
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow 
      hover 
      selected={selected}
      >

      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} />
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
      </TableCell>

      <TableCell align="left">{company}</TableCell>

      {/* <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {role}
      </TableCell> */}

      {/* <TableCell align="center">
        <Iconify
          icon={isVerified ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
          sx={{
            width: 20,
            height: 20,
            color: 'success.main',
            ...(!isVerified && { color: 'warning.main' }),
          }}
        />
      </TableCell> */}

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          // color={(status === 'unsuitable' && 'error') || (status === 'suitable' && 'success') || 'none'}
          color={(status === 'unsuitable' && 'error') || (status === 'suitable' && 'success') || ('warning')}
          sx={{ textTransform: 'capitalize' }}
        >
          {status}
        </Label>
      </TableCell>

      <TableCell align="right">
        <Button onClick={onOpenLI}>LI</Button>
        <Button onClick={onOpenLIsale}>LI Sale</Button>
        <IconButton
            size="small"
            onClick={onOpenProfile}
            sx={{
              mx: 0.75
            }}
          >
          <Iconify icon={'la:eye-solid'} width={24} height={24} />
        </IconButton>

        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onSetSuitable();
                  handleCloseMenu();
                }}
                sx={{ color: '#a2cf6e' }}
              >
                <Iconify icon={'eva:checkmark-circle-2-outline'} />
                Suitable
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onSetUnsuitable();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:close-circle-outline'} />
                Unsuitable
              </MenuItem>     
              <MenuItem
                onClick={() => {
                  onSetUnknownSuitable();
                  handleCloseMenu();
                }}
                sx={{ color: '#B78103' }}
              >
                <Iconify icon={'la:question-circle'} />
                Unknown
              </MenuItem>     
              {/* <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:question-mark-circle-outline'} />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                E2dit
              </MenuItem> */}
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
