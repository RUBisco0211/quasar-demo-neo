import { ref } from 'vue';
import { QTableProps } from 'quasar';

export default function useTablePagination(options: {
  rowsPerPage: number;
  reloadCallBack: (
    pagination?: QTableProps['pagination']
  ) => void | Promise<void>;
}) {
  const { rowsPerPage, reloadCallBack } = options;
  const pagination = ref<QTableProps['pagination']>({
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage,
    rowsNumber: 0,
  });
  const onRequest = (props: QTableProps) => {
    const { page, rowsPerPage, rowsNumber, sortBy, descending } =
      props.pagination!;
    pagination.value!.sortBy = sortBy;
    pagination.value!.descending = descending;
    pagination.value!.page = page;
    pagination.value!.rowsPerPage =
      rowsPerPage === 0 ? rowsNumber : rowsPerPage;
    reloadCallBack(pagination.value);
  };
  return {
    pagination,
    onRequest,
  };
}
