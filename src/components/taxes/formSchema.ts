export const schema: any = {
  menuId: 16,
  postUrl: "/taxes",
  buttonName: "Taxes",
  sheetTitle: "Add New Tax",
  sheetDescription: "",
  fields: [
    {
      label: "Name",
      name: "name",
      type: "text",
      required: true,
      error: "Tax Name is required",
      validations: [
        {
          min: 3,
          message: "Should have min 3 characters",
        },
        {
          max: 100,
          message: "Should not have more than 100 characters",
        },
      ],
    },
    {
      label: "Description",
      name: "description",
      type: "text",
      required: false,
      error: "",
      validations: [],
    },

    {
      label: "Tax percentage",
      name: "percentage",
      type: "number",
      required: true,
      error: "Amount field is required",
      validations: [
        {
          min: 1,
          message: "Should have min 1 characters",
        },
        {
          max: 2,
          message: "Should not have more than 100 characters",
        },
      ],
    },
    {
      label: "Country",
      name: "country",
      type: "select",
      optionsAPI: "/countries",
      required: false,
      error: "",
      validations: [],
    },
    {
      label: "Is Inactive",
      name: "isInactive",
      type: "checkbox",
      required: false,
      defaultValue: false,
      error: "",
      validations: [],
    },
  ],
};
