import Link from "next/link";
import Button from "@/components/Button";

export default async function NotFound() {
  return (
    <section className="bg-white fixed inset-0">
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div>
          <p className="text-2xl font-medium text-blue-500">404 NOT FOUND</p>
          <h1 className="mt-3 text-3xl font-semibold text-gray-800 md:text-4xl">
            We can’t find that page
          </h1>
          <p className="mt-4 text-gray-500">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <Link href="/profile/projects">
              <Button variant="pill">Go to projects</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
