import React from "react";
import { CheckIcon } from "@heroicons/react/20/solid";

const includedFeaturesFree = [
  "Task List",
  "Simple Calendar View",
  "Basic Reminders",
  "Single Device Sync",
  "Task Priority",
];
const includedFeaturesPaid = [
  "Everything In Basic Plan",
  "Advanced Calendar View",
  "Multi-Device Sync",
  "Advanced Reminders",
  "Task Analytics",
  "Integration",
  "Collaboration",
  "Task Backup",
  "Templates",
  "Subtasks",
  "Labels & Tags",
  "File Attachments",
  "Smart Scheduling",
  "Goals & Milestones",
  "Time Tracking",
  "Priority Support",
  "End-to-End Encryption",
];

const Pricing = () => {
  return (
    <div className="bg-white py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl  font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple, Timeless Investment
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Dive into the ChronoCraft journey. With our lifetime Pro access,
            gain evolving tools that elevate your productivity, every step of
            the way.
          </p>
        </div>
        <div className="mx-auto mt-16  justify-evenly  sm:mt-20 lg:mx-0 lg:flex ">
          {/* <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              Lifetime membership
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque
              amet indis perferendis blanditiis repellendus etur quidem
              assumenda.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                What’s included
              </h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div> */}
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full  lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-4xl font-semibold text-white">Basic</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-6xl font-bold tracking-tight text-white">
                    $0
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-white">
                    USD
                  </span>
                </p>
                <a
                  href="#"
                  className="mt-10 block w-full rounded-md bg-indigo-50 px-3 py-2 text-center text-sm font-semibold text-indigo-900 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  GET FREE VERSION
                </a>
                {/* <p className="mt-6 text-xs leading-5 text-gray-600">
                  Seamless billing with detailed invoices for easy tracking and
                  reimbursement.
                </p> */}
                <div className="mt-10 items-center">
                  {includedFeaturesFree.map((feature) => (
                    <li key={feature} className="flex gap-x-3  mt-2 text-white">
                      <CheckIcon
                        className="h-6 w-5 flex-none text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full  lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gradient-to-tr from-indigo-800 to-gray-800 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-4xl font-semibold text-white">Pro</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-6xl font-bold tracking-tight text-white">
                    $49
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-white">
                    USD
                  </span>
                </p>
                <a
                  href="#"
                  className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get Pro Version
                </a>
                {/* <p className="mt-6 text-xs leading-5 text-gray-600">
                  Seamless billing with detailed invoices for easy tracking and
                  reimbursement.
                </p> */}
                <div className="mt-10 items-center ">
                  {includedFeaturesPaid.map((feature) => (
                    <li key={feature} className="flex gap-x-3  mt-2 text-white">
                      <CheckIcon
                        className="h-6 w-5 flex-none text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
