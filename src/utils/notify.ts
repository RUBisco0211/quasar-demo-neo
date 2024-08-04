import { Notify } from 'quasar';
export default {
  successSingle: (msg: string, caption?: string) =>
    Notify.create({ type: 'successSingle', message: msg, caption }),
  successMultiple: (msg: string, caption?: string) =>
    Notify.create({ type: 'successMultiple', message: msg, caption }),
  error: (msg: string, caption?: string) =>
    Notify.create({ type: 'error', message: msg, caption }),
  warning: (msg: string, caption?: string) =>
    Notify.create({ type: 'warning', message: msg, caption }),
  loading: (msg: string, caption?: string) =>
    Notify.create({ type: 'loading', message: msg, caption }),
};
