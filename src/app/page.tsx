import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
<>
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Discover the Truth with <span className="text-blue-500">FactCheck</span>
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          Post facts, vote on their authenticity, and join a community dedicated to verifying the truth.
        </p>

        <Link
          className={buttonVariants({
            size: "lg",
            className: "mt-5",
          })}
          href="/get-started"
        >
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </MaxWidthWrapper>

      <div className="mx-auto mt-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Join the Fact-Checking Revolution
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Help the community by voting on the accuracy of facts or posting your own. Every vote counts!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center justify-center px-6 lg:px-8 mb-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">Vote on Facts</h3>
            <p className="text-lg text-gray-700">
              See facts posted by others and vote on their accuracy. Your vote helps improve the reliability of information.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">Post Your Own Facts</h3>
            <p className="text-lg text-gray-700">
              Have a fact to share? Post it and see how the community rates its authenticity.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
