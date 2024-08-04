import { boot } from 'quasar/wrappers';
import { Notify } from 'quasar';

export default boot(() => {
    Notify.registerType('successSingle', {
        color: 'positive',
        icon: 'eva-checkmark-outline',
        textColor: 'white',
        position: 'top',
    });
    Notify.registerType('successMultiple', {
        color: 'positive',
        icon: 'eva-done-all-outline',
        textColor: 'white',
        position: 'top',
    });
    Notify.registerType('error', {
        color: 'negative',
        icon: 'eva-alert-triangle-outline',
        textColor: 'white',
        position: 'top',
    });
    Notify.registerType('warning', {
        color: 'warning',
        icon: 'eva-alert-circle-outline',
        textColor: 'white',
        position: 'top',
    });
    Notify.registerType('loading', {
        color: 'primary',
        icon: 'eva-loader-outline',
        textColor: 'white',
        position: 'top',
        spinner: true,
    });
});
