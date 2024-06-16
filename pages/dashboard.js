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
import { verifyToken } from "./utils/auth";
import nookies from "nookies";
import JobHunt from "./components/jobHunt";
import NewsFeed from "./components/news";
export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/authform",
        permanent: false,
      },
    };
  }
  const tokenValid = verifyToken(token);
  if (!tokenValid) {
    return {
      redirect: {
        destination: "/authform",
        permanent: false,
      },
    };
  }
  return { props: {} };
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Placeholder components for each tab's content
const WelcomeContent = () => (
  <div>
    <h1>Welcome Content</h1>
  </div>
);
const JobHuntContent = () => (
  <div>
    <JobHunt />
  </div>
);
const OpportunitiesContent = () => <div>Opportunities Content</div>;
const NewsContent = () => (
  <div>
    <NewsFeed />
  </div>
);
const CommunityContent = () => <div>Community Content</div>;
const ResourcesContent = () => <div>Resources Content</div>;
const FeedbackContent = () => <div>Feedback Content</div>;

const navigation = [
  { name: "Welcome", icon: HomeIcon },
  { name: "Job Hunt", icon: FolderIcon },
  { name: "Opportunities", icon: DocumentDuplicateIcon },
  { name: "News", icon: DocumentDuplicateIcon },
  { name: "Community", icon: ChartPieIcon },
  { name: "Resources", icon: ChartPieIcon },
  { name: "Feedback", icon: Cog6ToothIcon },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Welcome");

  const renderContent = () => {
    switch (activeTab) {
      case "Welcome":
        return <WelcomeContent />;
      case "Job Hunt":
        return <JobHuntContent />;
      case "Opportunities":
        return <OpportunitiesContent />;
      case "News":
        return <NewsContent />;
      case "Community":
        return <CommunityContent />;
      case "Resources":
        return <ResourcesContent />;
      case "Feedback":
        return <FeedbackContent />;
      default:
        return <WelcomeContent />;
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
