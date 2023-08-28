import { fetchInvoices } from "@/utils/auth";
import { moneyFormat, stripePrice } from "@/utils/helpers";
import Button from "@/components/Button";
import { FileText } from "lucide-react";
import { Invoice } from "@/types";

export default async function InvoicesPage() {
  const invoices = await fetchInvoices();

  const hasInvoices = invoices?.length > 0;

  return (
    <section className="w-full px-6 py-6 bg-gray-50 h-full flex-1 flex flex-col">
      <div className="mx-auto w-full sm:max-w-screen-2xl sm:px-2.5 lg:px-20 space-y-4">
        {hasInvoices && (
          <div>
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Invoices
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Check the invoices for your purchases.
            </p>
          </div>
        )}
        {!hasInvoices ? (
          <div className="flex flex-1 flex-col items-center justify-center rounded-md border border-gray-200 bg-white py-12">
            <h2 className="z-10 text-xl font-semibold text-gray-700">
              You don't have any invoices yet!
            </h2>
            <img
              alt="No domains yet"
              loading="lazy"
              width={500}
              className="pointer-events-none blur-0"
              src="/no-project.png"
            />
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <DesktopTable invoices={invoices} />
            </div>
            <div className="block md:hidden">
              <MobileTable invoices={invoices} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function DesktopTable({ invoices }: { invoices: Invoice[] }) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Order date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total amount
                  </th>
                  <th scope="col" className="relative px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {invoice.lines.data[0]?.price?.nickname ?? "Unknown"}{" "}
                      Credits
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(invoice.created * 1000).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {invoice.status.toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {moneyFormat(stripePrice(invoice.total))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end w-full">
                        <a
                          href={invoice.hosted_invoice_url}
                          className="block w-full sm:w-auto"
                          target="_blank"
                        >
                          <Button
                            disabled={!invoice.hosted_invoice_url}
                            className="w-full sm:w-auto gap-2 [&:not(:hover)]:text-gray-500"
                          >
                            <FileText className="h-4 w-4" />
                            View Invoice
                          </Button>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileTable({ invoices }: { invoices: Invoice[] }) {
  return (
    <div className="flex gap-2 flex-col">
      {invoices?.map((invoice) => (
        <div
          key={invoice.id}
          className="bg-white border-gray-200 shadow-sm rounded-lg border p-4"
        >
          <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row">
            <dl className="flex-1 grid sm:grid-cols-2 gap-2 md:grid-cols-4">
              <div>
                <dt className="font-medium text-gray-900">Product Name</dt>
                <dd className="mt-1 text-gray-500">
                  {invoice.lines.data[0]?.price?.nickname ?? "Unknown"} Credits
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Order date</dt>
                <dd className="mt-1 text-gray-500">
                  <time dateTime={invoice.created.toString()}>
                    {new Date(invoice.created * 1000).toLocaleDateString()}
                  </time>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Order status</dt>
                <dd className="mt-1 font-medium text-gray-500">
                  {invoice.status}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Total amount</dt>
                <dd className="mt-1 font-medium text-gray-500">
                  {moneyFormat(stripePrice(invoice.total))}
                </dd>
              </div>
            </dl>
            <div className="flex gap-1 sm:items-center justify-center">
              <a
                href={invoice.hosted_invoice_url}
                className="block w-full sm:w-auto"
                target="_blank"
              >
                <Button className="w-full sm:w-auto gap-2 [&:not(:hover)]:text-gray-500">
                  <FileText className="h-4 w-4" />
                  View Invoice
                </Button>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
