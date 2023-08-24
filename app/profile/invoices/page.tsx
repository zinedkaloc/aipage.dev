import { fetchInvoices } from "@/utils/auth";
import { moneyFormat, stripePrice } from "@/utils/helpers";
import Button from "@/components/Button";

export default async function InvoicesPage() {
  const invoices = await fetchInvoices();

  return (
    <section className="w-full px-6 py-6 bg-gray-50 h-full flex-1 flex flex-col">
      <div className="mx-auto w-full sm:max-w-screen-2xl sm:px-2.5 lg:px-20 space-y-4">
        <div>
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Invoices
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Check the invoices for your purchases.
          </p>
        </div>
        <div className="flex gap-2 flex-col">
          {invoices?.map((invoice) => (
            <div
              key={invoice.id}
              className="bg-white border-gray-200 shadow-sm rounded-lg border p-4"
            >
              <div className="flex items-center">
                <dl className="flex-1 grid sm:grid-cols-2 gap-2 md:grid-cols-4">
                  <div>
                    <dt className="font-medium text-gray-900">Product Name</dt>
                    <dd className="mt-1 text-gray-500">
                      {invoice.lines.data[0]?.price?.nickname ?? "Unknown"}{" "}
                      Credits
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
                <div className="flex gap-1 flex-col sm:flex-row items-center justify-center">
                  <a href={invoice.hosted_invoice_url} target="_blank">
                    <Button>View Invoice</Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
