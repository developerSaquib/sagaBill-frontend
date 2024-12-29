/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
import getData from "@/api/getData.api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useFetchDataContext } from "@/components/context/fetchTableDataContext";
import { format } from "date-fns";
import { getDatesByDateRange } from "../Utility/DateRange";

interface AccordionProps {
  onSubmitFn: (data: any) => void;
  MappingSchema: any;
  buttonLoader?: boolean;
  editButtonLoader?: boolean;
}
export function ReportFilterAccordion({
  onSubmitFn,
  MappingSchema,
}: AccordionProps): JSX.Element {
  const { resetFormData, reportsFieldData, setReportsFieldData } =
    useFetchDataContext();

  //Custom On change function for Dynamic Filter fields
  const onIdSelectChange = (id: number) => {
    if (id) {
      const data: any = MappingSchema[id];
      setReportsFieldData(data);
    } else {
      setReportsFieldData({});
    }
  };

  // Zod validation schema based on field validations
  const validationSchema = z.object(
    reportsFieldData?.fields
      ?.filter((field: any) => !field.isHidden)
      ?.reduce((acc: any, field: any) => {
        if (!field.isHidden) {
        }
        let validator: any;

        if (field.type === "checkbox") {
          validator = z.boolean();
          if (field.required) {
            validator = validator.refine((val: any) => val === true, {
              message: field.error || "This field is required",
            });
          }
        } else {
          validator = z.string();
          if (field?.required) {
            validator = validator?.min(1, field.error);
          }
          field?.validations?.forEach((rule: any) => {
            if (rule.min !== undefined) {
              validator = validator?.min(rule.min, rule.message);
            }
            if (rule.max !== undefined) {
              validator = validator?.max(rule.max, rule.message);
            }
          });
        }

        acc[field.name] = validator;
        return acc;
      }, {} as Record<string, z.ZodType<any>>)
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    getValues,
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  // Reset form entries after submission of data successfully
  useEffect(() => {
    reset();
  }, [reset, resetFormData]);

  // Options for dropdown field
  const [dropdownOptions, setDropdownOptions] = useState<Record<string, any[]>>(
    {}
  );

  useEffect(() => {
    // Function to fetch dropdown options from the API
    const fetchOptions = async (
      fieldName: string,
      apiUrl: string,
      filter: any
    ) => {
      const finalFilter = filter || {};
      try {
        const response = await getData(apiUrl, finalFilter);
        setDropdownOptions((prev: any) => ({
          ...prev,
          [fieldName]: response.data,
        }));
      } catch (error) {
      }
    };

    // Loop through form fields to load options as needed
    reportsFieldData?.fields
      ?.filter((field: any) => !field.isHidden)
      ?.forEach((field: any) => {
        if (field.type === "select" && !field.options) {
          // Pass the field's name and API endpoint to fetchOptions
          fetchOptions(field.name, field.optionsAPI, field.filter);
        }
      });
  }, [reportsFieldData.fields]);

  //UseEfeect for setting current value in date field
  useEffect(() => {
    const nameTypeMapping: any = {};
    reportsFieldData?.fields
      ?.filter((field: any) => !field.isHidden)
      .forEach((element: any) => {
        nameTypeMapping[element?.name] = element.type;
      });
    reportsFieldData?.fields?.map((field: any) => {
      if (field.defaultValue) {
        setValue(field.name, `${field.defaultValue}`);
      }
    });
    Object.entries(nameTypeMapping).forEach(([key]) => {
      if (nameTypeMapping[key] === "date") {
        setValue(key, format(new Date(), "yyyy-MM-dd"));
      }
    });
  }, [setValue, reportsFieldData?.fields]);

  //********** date range logic start */
  const [dateRange, setDateRange] = useState([]);
  const onDateRangeSelect = (event: any) => {
    const [start, end] = getDatesByDateRange(event);
    setValue("fromDate", start);
    setValue("toDate", end);
  };

  useEffect(() => {
    const init = async () => {
      const filter = {
        fields: {
          name: true,
          id: true,
        },
      };
      const response = await getData("/date-range-types", filter);
      setDateRange(response.data);
    };
    init();
  }, []);
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <span className="font-mono">Select Filters</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <form
              onSubmit={handleSubmit(onSubmitFn)}
              className="col-span-2 grid grid-cols-4 gap-4 mt-5"
            >
              <div>
                <Label className="text-left font-serif">
                  Select Report Type
                </Label>
                <select
                  className="p-2 border border-gray-300 rounded w-full font-serif h-9.5 text-sm mt-1"
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    onIdSelectChange(Number(selectedId));
                  }}
                >
                  <option value="">-- Select an option --</option>
                  <option value={10}>Stock Report</option>
                  <option value={11}>Profit and Loss</option>
                  <option value={12}>Sale Report</option>
                  <option value={13}>Service Sale Revenue</option>
                  <option value={14}>Item Sale Revenue</option>
                </select>
              </div>
              <div>
                <Label className="text-left font-serif">
                  Select Date Range
                </Label>
                <select
                  className="p-2 border border-gray-300 rounded w-full font-serif h-9.5 text-sm mt-1"
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    onDateRangeSelect(Number(selectedId));
                  }}
                >
                  <option value="">-- Select an option --</option>
                  {dateRange.map((val: any) => {
                    return <option value={val.id}>{val.name}</option>;
                  })}
                </select>
              </div>

              {/* <div className="mt-1">
                <Label className="text-left font-serif">From Date</Label>
                <input
                  type="date"
                  disabled={true}
                  className="p-2 border border-gray-300 rounded w-full font-serif h-9 text-sm"
                  value={fromDate}
                />
              </div> */}

              {/* <div className="mt-1">
                <Label className="text-left font-serif">To Date &emsp;</Label>
                <input
                  type="date"
                  disabled={true}
                  className="p-2 border border-gray-300 rounded w-full font-serif h-9 text-sm"
                  value={toDate}
                />
              </div> */}
              {reportsFieldData?.fields
                ?.filter((field: any) => !field.isHidden)
                ?.map((field: any) => (
                  <div
                    className="grid grid-rows-1 gap-2"
                    key={field?.name}
                    style={{ marginBottom: "1rem" }}
                  >
                    {field.type !== "checkbox" ? (
                      <Label
                        htmlFor={field?.name}
                        className="text-left font-serif"
                      >
                        {field.label}
                      </Label>
                    ) : null}

                    <Controller
                      name={field.name}
                      control={control}
                      defaultValue={
                        field.type === "checkbox"
                          ? field.defaultValue || false
                          : ""
                      }
                      render={({ field: controllerField }) => {
                        if (field.type === "select") {
                          controllerField.value = field.defaultValue;
                          return (
                            <select
                              {...controllerField}
                              className="p-2 border border-gray-300 rounded w-full font-serif h-9.5 text-sm"
                              disabled={field.readOnly}
                              {...(field.readOnly && {
                                value: `${field.defaultValue}`,
                              })}
                              onChange={(e) => {
                                controllerField.onChange(e);
                                if (
                                  field.setExtraValues &&
                                  field?.extraValuesToSet &&
                                  field?.takeValue
                                ) {
                                  field?.extraValuesToSet.map(
                                    (valName: any) => {
                                      setValue(
                                        valName,
                                        dropdownOptions[field.name].find(
                                          (val) => val.id == e.target.value
                                        )[`${field?.takeValue}`]
                                      );
                                    }
                                  );
                                }
                              }}
                            >
                              <option value="">-- Select an option --</option>
                              {(dropdownOptions[field.name] || []).map(
                                (option) => (
                                  <option
                                    key={option.id}
                                    value={option.id}
                                    data-tax-perc={option?.percentage}
                                  >
                                    {option.name}
                                  </option>
                                )
                              )}
                            </select>
                          );
                        } else if (field.type === "checkbox") {
                          return (
                            <div className="flex items-center space-x-2">
                              <Label
                                htmlFor={field.name}
                                className="text-left font-serif"
                              >
                                {field.label}
                              </Label>
                              <Switch
                                checked={!!controllerField?.value}
                                onCheckedChange={(checked: any) =>
                                  controllerField.onChange(checked)
                                }
                              />
                            </div>
                          );
                        } else if (field.type === "date") {
                          return <Input type="date" {...controllerField} />;
                        } else {
                          return (
                            <Input
                              className="col-span-3"
                              {...controllerField}
                              type={field.type}
                              readOnly={field.readOnly}
                              onChange={(e) => {
                                controllerField.onChange(e);
                                if (
                                  field.isDependent &&
                                  field.reflectTo &&
                                  field?.cb &&
                                  field.reflectedFrom
                                ) {
                                  const outPut = field?.cb(
                                    e.target.value,
                                    getValues(field.reflectedFrom)
                                  );
                                  setValue(field.reflectTo, String(outPut));
                                }
                              }}
                            />
                          );
                        }
                      }}
                    />
                    <div className="h-4">
                      {errors[field.name] && (
                        <p style={{ color: "orangered", fontSize: "13px" }}>
                          {errors[field.name]?.message?.toString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              {reportsFieldData && Object.keys(reportsFieldData).length > 0 ? (
                <div className="grid col-span-4 flex justify-end mr-5">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-serif"
                  >
                    Get Report Data
                  </Button>
                </div>
              ) : null}
            </form>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
