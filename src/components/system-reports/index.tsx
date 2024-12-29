/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactLoader from "../../components/ui/sharedComponents/ReactLoader";
// Import toaster for success or error msg popup

import { Toaster } from "react-hot-toast";
import { ReportFilterAccordion } from "@/components/ui/sharedComponents/ReportFilterAccordion";
import useSystemReports from "@/components/system-reports/hooks/useSystemReports";
import { ReportDataTable } from "../ui/sharedComponents/ReportDataTable";
import { FetchDataProvider } from "@/components/context/fetchTableDataContext";

export default function SystemReport(): JSX.Element {
  return (
    <FetchDataProvider>
      <SystemReportData />
    </FetchDataProvider>
  );
}

function SystemReportData(): JSX.Element {
  const { columns, handleSubmitFilterDetails, MappingSchema, data, loading } =
    useSystemReports();

  return (
    <>
      <div className="container mx-auto py-10 flex flex-col">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="grid gap-4 grid-cols-2 px-2">
          <ReactLoader loading={loading} />
          <p
            className="mb-5 text-lg font-normal uppercase"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            System Reports
          </p>
        </div>

        {/* Div for filter Accordion */}
        <div className="mb-5 ml-3">
          <ReportFilterAccordion
            onSubmitFn={handleSubmitFilterDetails}
            MappingSchema={MappingSchema}
          />
        </div>

        {/* Div for data table */}
        <div className="row mt-2 pr-4">
          <ReportDataTable columns={columns} data={data as any} />
        </div>
      </div>
    </>
  );
}
