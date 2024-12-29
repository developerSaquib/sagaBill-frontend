/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import {
  // MoreHorizontal,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
import { useFetchDataContext } from "../../context/fetchTableDataContext";
import MappingSchema from "../schemaMapping";
import getData from "@/api/getData.api";
import dayjs from "dayjs";

// Type defination for columns header
export type ColumnHeaderType = {
  id: string;
  status: "pending" | "processing" | "success" | "failed";
  name: string;
  taxAmount: number;
  amount: number;
  isInactive: number;
  sortBy?: string;
};

//interface for Column Data
interface ServicesData {
  id: string;
  name: string;
  taxAmount: number;
  amount: number;
  isInactive: number;
  createdDate: string;
  modifiedDate: string;
}

const useSystemReprots = () => {
  const [tableData, setTableData] = useState<ServicesData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { isRefresh, reportsFieldData } = useFetchDataContext();

  //Column defination
  const columns: ColumnDef<ColumnHeaderType>[] = [
    ...(reportsFieldData?.tableHeader?.map((val: any) => ({
      accessorKey: val?.accessorKey,
      header: ({ column }: any) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
        >
          {val?.header}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    })) || []),
  ];

  //Handle Submit filter details
  const handleSubmitFilterDetails = async (data: any) => {
    try {
      if (reportsFieldData?.filterCb) {
        Object.keys(data).map((val: string) => {
          if (["toDate", "fromDate"].includes(val)) {
            if (val === "fromDate") {
              const fromdate = new Date(data[val]);
              const date1 = dayjs(fromdate).startOf("day");
              data[val] = date1.toISOString();
            }
            if (val === "toDate") {
              const fromdate = new Date(data[val]);
              const date1 = dayjs(fromdate);
              data[val] = date1.toISOString();
            }
          }
        });
        const filter = reportsFieldData?.filterCb(data);
        setLoading(true);
        const response = await getData(reportsFieldData.URL, filter);
        setTableData(response.data);
        setLoading(false);
      } else {
        setLoading(false);
        setTableData([]);
        throw "Callback Not Present!";
      }
    } catch (error) {}
  };

  //API for table data
  const fetchTableData = async () => {
    try {
      setLoading(true);
      // let response: any = [];
      // let response: any = await getData(dynamicFormSchema.postUrl);
      // response = response?.data?.map((item: any) => {
      //   const originalDate = new Date(item.birthDate);
      //   const day = String(originalDate.getUTCDate()).padStart(2, "0");
      //   const month = String(originalDate.getUTCMonth() + 1).padStart(2, "0");
      //   const year = originalDate.getUTCFullYear();

      //   //Birthdate in DD/MM/YYYY format
      //   item.birthdateUpdated = `${day}/${month}/${year}`;
      //   //Status in Active/Not Active
      //   item.isInactiveUpdated =
      //     item.isInactive === 1 ? "Active" : "Not Active";
      //   return item;
      // });
      // setTableData(response);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [isRefresh]);

  return {
    columns,
    data: tableData,
    loading,
    showAlert,
    setShowAlert,
    handleSubmitFilterDetails,
    MappingSchema,
  };
};

export default useSystemReprots;
