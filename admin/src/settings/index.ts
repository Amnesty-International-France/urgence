import SettingsIcon from '@mui/icons-material/Settings';
import { SettingsCreate } from './SettingsCreate';
import { SettingsEdit } from './SettingsEdit';
import { SettingsList } from './SettingsList';

const settings = {
    name: 'Setting',
    options: { label: 'Settings' },
    icon: SettingsIcon,
    list: SettingsList,
    edit: SettingsEdit,
    create: SettingsCreate,
};

export default settings;
