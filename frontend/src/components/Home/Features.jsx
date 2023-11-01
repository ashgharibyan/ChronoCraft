import React from "react";

const Features = () => {
  return (
    <div className="flex-wrap my-10 items-center justify-center gap-8 text-center sm:flex">
      <div className="w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-12 h-12 mx-auto text-white bg-indigo-500 rounded-md">
            <svg
              width={20}
              height={20}
              fill="currentColor"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 8c-1.5 0-2.3 1.4-1.9 2.5l-3.6 3.6c-.3-.1-.7-.1-1 0l-2.6-2.6c.4-1.1-.4-2.5-1.9-2.5-1.4 0-2.3 1.4-1.9 2.5L3.5 16c-1.1-.3-2.5.5-2.5 2 0 1.1.9 2 2 2 1.4 0 2.3-1.4 1.9-2.5l4.5-4.6c.3.1.7.1 1 0l2.6 2.6c-.3 1 .5 2.5 2 2.5s2.3-1.4 1.9-2.5l3.6-3.6c1.1.3 2.5-.5 2.5-1.9 0-1.1-.9-2-2-2m-6 1l.9-2.1L18 6l-2.1-.9L15 3l-.9 2.1L12 6l2.1.9L15 9M3.5 11L4 9l2-.5L4 8l-.5-2L3 8l-2 .5L3 9l.5 2z" />{" "}
            </svg>
          </div>
        </div>

        <h3 className="py-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
          Timeline Tapestry
        </h3>
        <p className="py-4 text-gray-500 text-md dark:text-gray-300">
          Visualize your tasks and accomplishments as threads in the day's
          fabric.
        </p>
      </div>
      <div className="w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 sm:mt-16 md:mt-20 lg:mt-24 dark:bg-gray-800">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-12 h-12 mx-auto text-white bg-indigo-500 rounded-md">
            <svg
              width={20}
              height={20}
              fill="currentColor"
              className="w-6 h-6"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 3a5 5 0 11-4.546 2.914.5.5 0 00-.908-.417A6 6 0 108 2v1z"
              />
              <path d="M8 4.466V.534a.25.25 0 00-.41-.192L5.23 2.308a.25.25 0 000 .384l2.36 1.966A.25.25 0 008 4.466z" />{" "}
            </svg>
          </div>
        </div>
        <h3 className="py-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
          Past Recall
        </h3>
        <p className="py-4 text-gray-500 text-md dark:text-gray-300">
          Reflect on past tasks, learn and plan forward.
        </p>
      </div>
      <div className="w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-12 h-12 mx-auto text-white bg-indigo-500 rounded-md">
            <svg
              width={20}
              height={20}
              fill="currentColor"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.998 1.465a.347.347 0 00-.24.103L.102 11.215a.334.334 0 000 .48l9.152 9.135a.318.318 0 00.24.106.344.344 0 00.238-.106l1.37-1.385a.334.334 0 000-.48L3.93 11.79a.468.468 0 010-.664l9.078-9.078a.345.345 0 00.072-.377.336.336 0 00-.312-.207h-2.77zm4.531 1.592a.349.349 0 00-.24.105l-1.393 1.393a.334.334 0 000 .48l7.172 7.182a.468.468 0 01.137.328c0 .12-.049.24-.137.328l-9.078 9.078a.345.345 0 00-.072.377c.04.096.144.207.313.207v-.008H14a.338.338 0 00.24-.095l9.656-9.655a.315.315 0 00.104-.24.347.347 0 00-.103-.24L14.77 3.162a.317.317 0 00-.24-.105zm-3.095 3.156a.224.224 0 00-.211.238c.144 2.218-2.643 2.764-2.643 6.246v.024c0 2.121 1.603 3.842 3.58 3.842 1.978 0 3.578-1.72 3.578-3.842v-.024c0-.984-.368-1.922-.744-2.627-.072-.136-.29-.087-.266.041.673 2.995-1.015 4.851-1.015 2.545 0-3.93-1.394-5.716-2.131-6.388a.207.207 0 00-.148-.055z" />
            </svg>
          </div>
        </div>
        <h3 className="py-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
          Future Forge
        </h3>
        <p className="py-4 text-gray-500 text-md dark:text-gray-300">
          Shape tomorrow's tasks today, and stay ahead.
        </p>
      </div>
    </div>
  );
};

export default Features;
