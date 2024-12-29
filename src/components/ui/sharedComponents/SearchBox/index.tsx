/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "../../dialog";
import { useNavigate } from "react-router-dom";

interface SearchTableProps {
  items: any[];
  itemsPerPage: number;
  onRowDoubleClick: Function;
  searchBoxSchema: { [key: string]: { name: string; cb: Function } };
  setSearchText: any;
  setOpen: any;
  open: any;
  selectedData: any[];
  isSaleItem?: boolean;
  isPurchaseItem?: boolean;
}

const SearchBoxTable: React.FC<SearchTableProps> = ({
  items,
  itemsPerPage,
  onRowDoubleClick,
  searchBoxSchema,
  setSearchText,
  setOpen,
  open,
  selectedData,
  isSaleItem,
  isPurchaseItem,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [warningText, setWarningText] = useState<any>("false");
  const [isStockLimit, setisStockLimit] = useState(false);
  useEffect(() => {
    const filtered =
      items &&
      items?.filter((item) =>
        item.name.toLowerCase()?.includes(searchQuery.toLowerCase())
      );
    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to first page on new search
  }, [searchQuery, items]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems?.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<any>(false);
  const handleOnRowDoubleClick = (item: any) => {
    if (!selectedData.map((val) => val?.service?.id).includes(item?.id)) {
      if (item?.inStock?.quantity > 0 || !isSaleItem || isPurchaseItem) {
        onRowDoubleClick(item), setSearchText(item.name), setOpen(!open);
      } else {
        setModalOpen(!modalOpen);
        setWarningText(
          `${item.name} is currently out of stock. Please check back later. `
        );
        setisStockLimit(true);
      }
    } else {
      setModalOpen(!modalOpen);
      setWarningText(`${item.name} Already Added please check !`);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
      <Dialog
        open={modalOpen}
        onOpenChange={() => {
          setisStockLimit(false);
          setModalOpen(!modalOpen);
        }}
      >
        <DialogContent className="sm:max-w-[580px]">
          {warningText}
          {isStockLimit ? (
            <span
              className="text-green-500 w-1/4 cursor-pointer hover:text-green-700"
              onClick={() => {
                navigate("/purchase-items");
              }}
            >
              Purchase Items
            </span>
          ) : (
            ""
          )}
        </DialogContent>
      </Dialog>
      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search items..."
        className="border border-gray-300 rounded p-2 w-full text-sm mb-4"
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-sm border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              {Object.values(searchBoxSchema).map((key: any, index1: any) => {
                return (
                  <th key={index1} className="p-3 text-left">
                    {key.name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item: any) => (
                <tr
                  key={item.id}
                  className="border-t cursor-pointer hover:bg-gray-100"
                  onDoubleClick={() => {
                    handleOnRowDoubleClick(item);
                  }}
                >
                  {Object.keys(searchBoxSchema).map((key: any, index2: any) => {
                    return (
                      <td key={index2} className="p-3">
                        {key === "available" &&
                        !searchBoxSchema[key]?.cb(item) ? (
                          <span className="text-red-600 font-bold">
                            {searchBoxSchema[key]?.cb(item) || 0}
                          </span>
                        ) : (
                          searchBoxSchema[key]?.cb(item)
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-xs text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBoxTable;
