import { Datagrid, DateField, EditButton, List, TextField } from 'react-admin';
import dateFormat from '../dateFormat';

export const SettingsList = () => (
    <List sort={{ field: 'id', order: 'DESC' }} perPage={25}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="type" />
            <DateField source="created_on" options={dateFormat} showTime />
            <DateField source="updated_on" options={dateFormat} showTime />
            <EditButton />
        </Datagrid>
    </List>
);
