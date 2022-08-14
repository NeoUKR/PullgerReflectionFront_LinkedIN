import { paramCase } from 'change-case';
import React, { useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@/routes/paths';
// hooks
import useTabs from '@/hooks/useTabs';
import useSettings from '@/hooks/useSettings';
import useTable, { getComparator, emptyRows } from '@/hooks/useTable';
import useLocales from '@/hooks/useLocales';

import { UserManager } from '@/@types/user';
// _mock_
// import { _companiesList } from '@/_mock/_companies';
// layouts
import Layout from '@/layouts';
// components
import Page from '@/components/Page';
import Iconify from '@/components/Iconify';
import Scrollbar from '@/components/Scrollbar';
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '@/components/table';
// sections
import { CompaniesTableToolbar, CompaniesTableRow } from '@/sections/@dashboard/companies/list';
import { companiesList, companiesGetStatusShow } from '@/fetchDATA/companies'
// ----------------------------------------------------------------------
import { API_SERVER } from '@/config'

const STATUS_OPTIONS = ['suitable', 'unsuitable', 'none'];

const ROLE_OPTIONS = [
  'all',
  'ux designer',
  'full stack designer',
  'backend developer',
  'project manager',
  'leader',
  'ui designer',
  'ui/ux designer',
  'front end developer',
  'full stack developer',
];

// ----------------------------------------------------------------------

UserList.getLayout = function getLayout(page:any) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

import _mock from '@/_mock';
// import { randomNumberRange, randomInArray } from '@/_mock/funcs';

export default function UserList() {
  const { translate } = useLocales();

  const TABLE_HEAD = [
    { id: 'name', label: translate('companies.list.tableHead.Name'), align: 'left' },
    { id: 'company', label: 'Company', align: 'left' },
    // { id: 'role', label: 'Role', align: 'left' },
    // { id: 'isVerified', label: 'Verified', align: 'center' },
    { id: 'status', label: 'Status', align: 'left' },
    { id: '' },
  ]
  

  // const TABLE_HEAD = ;

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettings();

  const { push } = useRouter();

  const [tableData, setTableData] = useState<any[]>([]);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = (id: string) => {
    const deleteRow = tableData.filter(( row : any ) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleDeleteRows = (selected: string[]) => {
    const deleteRows = tableData.filter(( row : any ) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id: string) => {
    push(PATH_DASHBOARD.user.edit(paramCase(id)));
  };

  const handleOpenProfile = (uuid: string) => {
    push(PATH_DASHBOARD.companies.profile(paramCase(uuid)));
  }

  const handleOpenLI = (id: string) => {
    window.open('https://www.linkedin.com/company/'+id, '_blank');
  }

  const handleOpenLIsale = (id: string) => {
    window.open('https://www.linkedin.com/sales/company/'+id, '_blank');
  }

  const handleSetSuitableParam = async ( inIndex:any, inUUID:any, inStatus:any) => {
    try {
      const urlRequest = `${API_SERVER}/api/companies/sendCompliesStatus/${inUUID}`
      
      console.log('URL Request:' , urlRequest)
      console.log('Param:' , inStatus)

      const params = { status: inStatus }

      const response = await fetch(urlRequest, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
      });

      console.log('response:' , response)

      if (response.status === 200) {
        tableData[inIndex].status = companiesGetStatusShow(inStatus)
        setSelected([]);
        setTableData(tableData);
      } else {
        console.log(response)
      }

    } catch(err) {
      console.log(err)
    }
  }

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  useEffect(() => {
    const fetchURL = `${API_SERVER}/ping`
    companiesList(setTableData)
  }, [])
  
  return (
    <Page title="Companies: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Companies List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Companies', href: PATH_DASHBOARD.companies.root },
            { name: 'List' },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.user.new} passHref>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                {translate('companies.newButton')}New User
              </Button>
            </NextLink>
          }
        />

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onChangeFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab disableRipple key={tab} label={tab} value={tab} />
            ))}
          </Tabs>

          <Divider />

          <CompaniesTableToolbar
            filterName={filterName}
            filterRole={filterRole}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            optionsRole={ROLE_OPTIONS}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                  actions={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row:any) => (
                    <CompaniesTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onOpenProfile={() => handleOpenProfile(row.uuid)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onSetSuitable={() => handleSetSuitableParam(row.index, row.uuid, true)}
                      onSetUnsuitable={() => handleSetSuitableParam(row.index, row.uuid, false)}
                      onSetUnknownSuitable={() => handleSetSuitableParam(row.index, row.uuid, null)}
                      onOpenLI={() => handleOpenLI(row.id)}
                      onOpenLIsale={() => handleOpenLIsale(row.id)}
                      onEditRow={() => handleEditRow(row.name)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filterName,
  filterStatus,
  filterRole,
}: {
  tableData: UserManager[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterStatus: string;
  filterRole: string;
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item: Record<string, any>) =>
        item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'all') {
    tableData = tableData.filter((item: Record<string, any>) => item.status === filterStatus);
  }

  if (filterRole !== 'all') {
    tableData = tableData.filter((item: Record<string, any>) => item.role === filterRole);
  }

  return tableData;
}