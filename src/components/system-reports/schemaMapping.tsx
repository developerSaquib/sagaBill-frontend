/* eslint-disable @typescript-eslint/no-explicit-any */
const FilterSchemaMapping: Record<string, any> = {
  "10": {
    URL: "item-stock-report",
    fields: [
      {
        label: "From Date",
        name: "fromDate",
        type: "date",
        required: true,
        error: "From Date of birth is required",
        validations: [],
      },
      {
        label: "TO Date",
        name: "toDate",
        type: "date",
        required: true,
        error: "To Date of birth is required",
        validations: [],
      },
      {
        label: "Item Name",
        name: "item",
        type: "select",
        optionsAPI: "/services",
        filter: { fields: { id: true, name: true }, where: { isService: 0 } },
        required: true,
        error: "Item Name field is required",
        validations: [],
      },
    ],
    filterCb: (val: any) => {
      return {
        fields: {
          stockNumber: true,
          quantityAdded: true,
          quantityUvailable: true,
          service: true,
          createdDate: true,
        },
        where: {
          $a: {
            between: {
              createdDate: [val.fromDate, val.toDate],
            },
          },
        },
        relations: [
          {
            name: "service",
            fields: { id: true, name: true },
            where: { id: Number(val.item) },
          },
        ],
      };
    },
    tableHeader: [
      {
        header: "Stock Number",
        accessorKey: "stockNumber",
      },
      {
        header: "Item Name",
        accessorKey: "service.name",
      },
      {
        header: "Stock Added Date",
        accessorKey: "createdDate",
        type: "date",
      },
      {
        header: "Added Quantity",
        accessorKey: "quantityAdded",
      },
      {
        header: "Available Quantity",
        accessorKey: "quantityUvailable",
      },
    ],
  },
  "11": {
    URL: "/profit-loss-report",
    fields: [
      {
        label: "From Date",
        name: "fromDate",
        type: "date",
        required: true,
        error: "From Date of birth is required",
        validations: [],
      },
      {
        label: "TO Date",
        name: "toDate",
        type: "date",
        required: true,
        error: "To Date of birth is required",
        validations: [],
      },
    ],
    filterCb: (val: any) => {
      return {
        where: {
          startDate: val.fromDate,
          endDate: val.toDate,
        },
      };
    },
    tableHeader: [
      {
        header: "Stock Number",
        accessorKey: "stockNumber",
      },
      {
        header: "Sale Amount",
        accessorKey: "soldAmount",
      },
      {
        header: "Purchase Cost",
        accessorKey: "purchaseAmount",
      },
      {
        header: "Profit or Loss",
        accessorKey: "profit",
      },
    ],
  },
  "12": {
    URL: "/sale-report",
    fields: [
      {
        label: "From Date",
        name: "fromDate",
        type: "date",
        required: true,
        error: "From Date of birth is required",
        validations: [],
      },
      {
        label: "TO Date",
        name: "toDate",
        type: "date",
        required: true,
        error: "To Date of birth is required",
        validations: [],
      },
    ],
    filterCb: (val: any) => {
      return {
        where: {
          startDate: val.fromDate,
          endDate: val.toDate,
        },
      };
    },
    tableHeader: [
      {
        header: "Code",
        accessorKey: "code",
      },
      {
        header: "TXN Date",
        accessorKey: "txnDate",
      },
      {
        header: "Item Name",
        accessorKey: "serviceName",
      },
      {
        header: "Qauntity Sold",
        accessorKey: "totalQuantity",
      },
      {
        header: "Average Rate",
        accessorKey: "averageRate",
      },
      {
        header: "Unit Price",
        accessorKey: "averageUnitPrice",
      },
      {
        header: "Total Amount",
        accessorKey: "totalAmount",
      },
    ],
  },
  "13": {
    URL: "/service-sale-revenue-report",
    fields: [
      {
        label: "From Date",
        name: "fromDate",
        type: "date",
        required: true,
        error: "From Date of birth is required",
        validations: [],
      },
      {
        label: "TO Date",
        name: "toDate",
        type: "date",
        required: true,
        error: "To Date of birth is required",
        validations: [],
      },
    ],
    filterCb: (val: any) => {
      return {
        where: {
          startDate: val.fromDate,
          endDate: val.toDate,
        },
      };
    },
    tableHeader: [
      {
        header: "Service",
        accessorKey: "name",
      },
      {
        header: "Total Quantity",
        accessorKey: "totalQuantity",
      },
      {
        header: "Total Sale Amount",
        accessorKey: "totalSaleAmount",
      },
      {
        header: "Total Tax Amount",
        accessorKey: "totalTaxAmount",
      },
      {
        header: "Total Discount Amount",
        accessorKey: "totalDiscountAmount",
      },
      {
        header: "Grand Total",
        accessorKey: "grandTotal",
      },
    ],
  },
  "14": {
    URL: "/item-sale-revenue-report",
    fields: [
      {
        label: "From Date",
        name: "fromDate",
        type: "date",
        required: true,
        error: "From Date of birth is required",
        validations: [],
      },
      {
        label: "TO Date",
        name: "toDate",
        type: "date",
        required: true,
        error: "To Date of birth is required",
        validations: [],
      },
    ],
    filterCb: (val: any) => {
      return {
        where: {
          startDate: val.fromDate,
          endDate: val.toDate,
        },
      };
    },
    tableHeader: [
      {
        header: "Service",
        accessorKey: "name",
      },
      {
        header: "Total Quantity",
        accessorKey: "totalQuantity",
      },
      {
        header: "Total Sale Amount",
        accessorKey: "totalSaleAmount",
      },
      {
        header: "Total Tax Amount",
        accessorKey: "totalTaxAmount",
      },
      {
        header: "Total Discount Amount",
        accessorKey: "totalDiscountAmount",
      },
      {
        header: "Grand Total",
        accessorKey: "grandTotal",
      },
    ],
  },
};
export default FilterSchemaMapping;
