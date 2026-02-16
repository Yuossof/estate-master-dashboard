import React from "react";
import Card from "@/components/ui/Card";

const columns = [
  {
    label: "#",
  },
  {
    label: "NAME",
  },

  {
    label: "JOB",
  },
  {
    label: "Description",
  },
];
const rows = [
  {
    id: 1,
    name: "Mark Otto",
    job: "Front End Developer",
    desc: "@mdo",
  },
  {
    id: 2,
    name: "Jacob Thornton	",
    job: "Ui/ux Designer",
    desc: "@fat",
  },
  {
    id: 3,
    name: "Mark Otto",
    job: "Front End Developer",
    desc: "@twitter",
  },
  {
    id: 4,
    name: "Larry the	",
    job: "	Office Assistant I",
    desc: "@mdo",
  },
];
const BasicTablePage = () => {
  return (
    <div className=" space-y-5">
      <Card title="basic table" noborder>
        <div className="overflow-x-auto ">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-gray-100 table-fixed dark:divide-gray-700">
                <thead className=" border-t border-gray-100 dark:border-gray-800">
                  <tr>
                    {columns.map((column, i) => (
                      <th key={i} scope="col" className=" table-th ">
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100 dark:bg-[var(--surface-card)] dark:divide-gray-700">
                  {rows.map((row, i) => (
                    <tr key={i}>
                      <td className="table-td">{row.id}</td>
                      <td className="table-td">{row.name}</td>
                      <td className="table-td ">{row.job}</td>
                      <td className="table-td ">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
      <Card title="Table Head" noborder>
        <div className="overflow-x-auto ">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-gray-100 table-fixed dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-[var(--surface-elevated)]">
                  <tr>
                    {columns.map((column, i) => (
                      <th key={i} scope="col" className=" table-th ">
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100 dark:bg-[var(--surface-card)] dark:divide-gray-700">
                  {rows.map((row, i) => (
                    <tr key={i}>
                      <td className="table-td">{row.id}</td>
                      <td className="table-td">{row.name}</td>
                      <td className="table-td ">{row.job}</td>
                      <td className="table-td ">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Borderless Table" noborder>
        <div className="overflow-x-auto ">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full ">
                <thead className="">
                  <tr>
                    {columns.map((column, i) => (
                      <th key={i} scope="col" className=" table-th ">
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-[var(--surface-card)] ">
                  {rows.map((row, i) => (
                    <tr key={i}>
                      <td className="table-td">{row.id}</td>
                      <td className="table-td">{row.name}</td>
                      <td className="table-td ">{row.job}</td>
                      <td className="table-td ">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
      <Card title="Striped Rows" noborder>
        <div className="overflow-x-auto ">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-gray-100 table-fixed dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-[var(--surface-elevated)]">
                  <tr>
                    {columns.map((column, i) => (
                      <th key={i} scope="col" className=" table-th ">
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100 dark:bg-[var(--surface-card)] dark:divide-gray-700">
                  {rows.map((row, i) => (
                    <tr
                      key={i}
                      className=" even:bg-gray-100 dark:even:bg-gray-700"
                    >
                      <td className="table-td">{row.id}</td>
                      <td className="table-td">{row.name}</td>
                      <td className="table-td ">{row.job}</td>
                      <td className="table-td ">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
      <Card title="Hover Table" noborder>
        <div className="overflow-x-auto ">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-gray-100 table-fixed dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-[var(--surface-elevated)]">
                  <tr>
                    {columns.map((column, i) => (
                      <th key={i} scope="col" className=" table-th ">
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100 dark:bg-[var(--surface-card)] dark:divide-gray-700">
                  {rows.map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-100 dark:hover:bg-[var(--surface-hover)] hover:bg-opacity-20"
                    >
                      <td className="table-td">{row.id}</td>
                      <td className="table-td">{row.name}</td>
                      <td className="table-td ">{row.job}</td>
                      <td className="table-td ">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BasicTablePage;
