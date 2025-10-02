import React from "react";
import Icon from "@/components/shared/ui/Icon";

const SearchBox = () => {
  return (
    <button className="flex items-center xl:text-sm text-lg xl:text-gray-400 text-gray-800 dark:text-gray-300 px-1 space-x-3 rtl:space-x-reverse">
      <Icon icon="heroicons:magnifying-glass-20-solid" className="w-5 h-5" />
      <span className="xl:inline-block hidden">Search... </span>
    </button>
  );
};

export default SearchBox;
