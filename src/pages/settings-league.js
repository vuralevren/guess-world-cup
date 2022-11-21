import Input from "../components/inputs/input";

export default function SettingsLeague() {
  return (
    <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
      <form action="#" method="POST">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                League
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  label="Name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
              </div>
              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Icon
                </label>
                <div className="mt-1 flex items-center">
                  <span className="inline-block bg-gray-100 rounded-full overflow-hidden h-12 w-12">
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <button
                    type="button"
                    className="ml-5 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Change
                  </button>
                </div>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <Input
                  label="Password"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <Input
                  label="Invitation Code"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm cursor-pointer"
                  value="asds"
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="bg-pink-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
