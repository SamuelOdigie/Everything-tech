import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  FolderIcon,
  HomeIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Placeholder components for each tab's content
const DashboardContent = () => (
  <div>
    <h1>Dashboard Content</h1>
  </div>
);
const ExpensesContent = () => <div>Expenses Content</div>;
const RevenueContent = () => <div>Revenue Content</div>;
const CashFlowContent = () => <div>Cash Flow Content</div>;
const TaxesContent = () => <div>Taxes Content</div>;
const CustomContent = () => <div>Custom Content</div>;
const SettingsContent = () => <div>Settings Content</div>;
const FeedBackContent = () => <div>Feedback Content</div>;

const navigation = [
  { name: "Dashboard", icon: HomeIcon },
  { name: "Expenses", icon: FolderIcon },
  { name: "Revenue", icon: DocumentDuplicateIcon },
  { name: "Cash Flow", icon: ChartPieIcon },
  { name: "Taxes", icon: Cog6ToothIcon },
  { name: "Custom", icon: Cog6ToothIcon },
  { name: "Settings", icon: ChartPieIcon },
  { name: "Feedback", icon: Cog6ToothIcon },
];

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardContent />;
      case "Expenses":
        return <ExpensesContent />;
      case "Revenue":
        return <RevenueContent />;
      case "Cash Flow":
        return <CashFlowContent />;
      case "Taxes":
        return <TaxesContent />;
      case "Custom":
        return <CustomContent />;
      case "Settings":
        return <SettingsContent />;
      case "Feedback":
        return <FeedBackContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                    <nav className="mt-5 px-2 space-y-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href="#"
                          className={classNames(
                            item.name === activeTab
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab(item.name);
                          }}
                        >
                          <item.icon
                            className="mr-4 flex-shrink-0 h-6 w-6 text-gray-400"
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="flex min-h-screen">
          <div className=" min-h-screen bg-gray-800 text-white hidden lg:flex lg:flex-shrink-0">
            <div className="h-full flex flex-col w-64">
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className=" h-full flex flex-col flex-grow bg-gray-800 pt-5 pb-4 overflow-y-auto">
                <nav className="mt-5 flex-1 px-2 space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href="#"
                      className={classNames(
                        item.name === activeTab
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab(item.name);
                      }}
                    >
                      <item.icon
                        className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
            <div className="lg:hidden">
              <button
                type="button"
                className="p-1 text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
              {/* Main content */}
              <div className="">
                <div className="mx-auto  ">
                  {/* Replace with your content */}
                  {renderContent()}
                  {/* /End replace */}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
