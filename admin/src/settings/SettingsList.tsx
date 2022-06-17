import { Datagrid, DateField, EditButton, List, TextField } from 'react-admin';

export const SettingsList = () => (
    <List sort={{ field: 'id', order: 'DESC' }} perPage={25}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="type" />
            <DateField source="created_on" showTime />
            <DateField source="updated_on" showTime />
            <EditButton />
        </Datagrid>
    </List>
);
