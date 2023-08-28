import Link from "next/link";
import { Domain, DomainVerificationStatusProps } from "@/types";
import LoadingSpinner from "@/components/loadingSpinner";
import Chart from "@/components/Chart";
import { capitalize, truncate } from "@/utils/helpers";
import { ExternalLink } from "lucide-react";
import Button from "@/components/Button";
import CheckCircleFill from "@/components/CheckCircleFill";
import AlertCircleFill from "@/components/AlertCircleFill";
import XCircleFill from "@/components/XCircleFill";
import DomainConfiguration from "@/components/DomainConfiguration";

export default function DomainCard({ domain }: { domain: Domain }) {
  const data: {
    status: DomainVerificationStatusProps;
    response: any;
  } = {
    status: domain.status,
    response: {
      domainJson: {
        apexName: "test.com",
        name: "www.test.com",
        verification: [
          {
            type: "TXT",
            domain: "www.test.com",
            value: "test",
          },
          {
            type: "CNAME",
            domain: "www.test.com",
            value: "test",
          },
        ],
      },
    },
  };

  const target = "google.com";
  const type = "rewrite";

  return (
    <div className="flex flex-col space-y-3 rounded-lg border border-gray-200 bg-white px-5 py-8 sm:px-10">
      <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:space-x-4">
        <div className="flex items-center space-x-2">
          <a
            href={`http://${domain.domain}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2"
          >
            <p className="text-lg font-medium text-gray-900">{domain.domain}</p>
            <ExternalLink className="h-5 w-5" />
          </a>
          <Link
            href={domain._id}
            className="flex items-center space-x-1 rounded-md bg-gray-100 px-2 py-0.5 transition-all duration-75 hover:scale-105 active:scale-100"
          >
            <Chart className="h-4 w-4" />
            <p className="text-sm">
              {domain.clickCount}{" "}
              <span className="ml-1 hidden sm:inline-block">clicks</span>
            </p>
          </Link>
          {domain.isPrimary && (
            <span className="rounded-full bg-blue-500 px-3 py-0.5 text-xs text-white">
              Primary Domain
            </span>
          )}
        </div>
        <div className="flex space-x-3">
          <Button variant="light">Refresh</Button>
          <Button variant="light">Edit</Button>
        </div>
      </div>
      <div className="flex h-10 flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-5 sm:space-y-0">
        <div className="flex items-center space-x-2">
          {domain.status ? (
            domain.status === "Valid Configuration" ? (
              <CheckCircleFill className="h-6 w-6 text-blue-500" />
            ) : domain.status === "Pending Verification" ? (
              <AlertCircleFill className="h-6 w-6 text-yellow-500" />
            ) : (
              <XCircleFill className="h-6 w-6 text-red-500" />
            )
          ) : (
            <LoadingSpinner className="mr-1 h-5 w-5" />
          )}
          <p className="text-sm text-gray-500">{domain.status}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <p className="text-sm text-gray-500">
              {target ? `${capitalize(type)}s to` : `No ${type} configured`}
            </p>
            {target && (
              <a
                href={target}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-gray-600"
              >
                {truncate(
                  target.replace(/^(?:https?:\/\/)?(?:www\.)?/i, ""),
                  24,
                )}
              </a>
            )}
          </div>
        </div>
      </div>
      {domain.status && domain.status !== "Valid Configuration" && (
        <DomainConfiguration data={data} />
      )}
    </div>
  );
}
