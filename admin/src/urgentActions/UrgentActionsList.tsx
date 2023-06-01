import {
    BooleanField,
    Datagrid,
    DateField,
    EditButton,
    List,
    NumberField,
    TextField,
    FunctionField,
} from 'react-admin';
import dateFormat from '../dateFormat';
import PreviewLink from './PreviewLink';

export const UrgentActionsList = () => (
    <List sort={{ field: 'last_edition_date', order: 'DESC' }} perPage={25}>
        <Datagrid>
            <TextField source="title" />
            <TextField source="campaign_code" label="Campaign Code" />
            <TextField source="origin_code" label="Origin Code" />
            <DateField
                source="last_edition_date"
                label="Last Updated"
                options={dateFormat}
                showTime
            />
            <BooleanField source="is_default" label="Set As Default" />
            <NumberField source="response_count" label="Compteur participation" />
            <FunctionField
                label="Compteur mailto"
                render={(record: any) => {
                        if (record.mailto_count) {
                            return `${record.mailto_count} dont ${record.mailto_errors} erreurs.`
                        } else {
                            return 'données absentes'
                        }
                    }  
                }
            />
            <TextField source="call_to_action.interpelation_mode" label="Type participation" />
            <EditButton />
            <PreviewLink />
        </Datagrid>
    </List>
);
