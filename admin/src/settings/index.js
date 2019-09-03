import SettingsIcon from '@material-ui/icons/Settings';

import SettingsList from './SettingsList';
import SettingsCreate from './SettingsCreate';
import SettingsEdit from './SettingsEdit';

export default {
    name: 'Settings',
    icon: SettingsIcon,
    list: SettingsList,
    create: SettingsCreate,
    edit: SettingsEdit,
};
