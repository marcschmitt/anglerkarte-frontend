import React, { Fragment, useContext } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, XIcon } from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";
import StateContext from "../contexts/StateContext";
import { useRef } from "react";
import { useGetFishes } from "../api/services/fishes";

function FishingLaws() {
  let completeButtonRef = useRef(null);

  const { fishingLaws } = useContext(StateContext);
  const { showFishingLawsModal } = useContext(StateContext);

  const { data: fishes, isSuccess } = useGetFishes();

  return (
    <>
      <Transition appear show={fishingLaws} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[999] overflow-hidden"
          // className="fixed inset-0 z-[999] overflow-y-auto"
          onClose={() => showFishingLawsModal()} // needed to remove showFishingLawsModal() because of bug
          initialFocus={completeButtonRef}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl sm:shadow-xl h-[calc(100vh_-_150px)] rounded-2xl">
                <Dialog.Title as="div" className="relative">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Fischereigesetze
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    nach Landesfischereiverordnung §17 u. §20, 2018
                  </p>
                  <button
                    className="absolute top-0 sm:top-1 right-2 focus:outline-none"
                    onClick={() => showFishingLawsModal()}
                    ref={completeButtonRef}
                  >
                    <XIcon className="w-5 h-5 text-primary-500" />
                  </button>
                </Dialog.Title>
                <div className="mt-4">
                  <Disclosure defaultOpen>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg text-primary-900 bg-primary-100 hover:bg-primary-200 focus:outline-none">
                          <span>Mindestmaße & Artenschonzeiten</span>
                          <ChevronUpIcon
                            className={`${
                              open ? "transform rotate-180" : ""
                            } w-5 h-5 text-primary-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 overflow-y-scroll text-sm text-gray-500 max-h-80">
                          <dl>
                            {isSuccess &&
                              fishes.data.map(
                                (fish, index) =>
                                  !fish.attributes.fishing_ban && (
                                    <div
                                      className="px-4 py-5 odd:bg-white even:bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                                      key={fish.id}
                                    >
                                      <dt className="text-sm font-medium text-gray-500 sm:col-span-2">
                                        {fish.attributes.name}
                                        <br />
                                        <span className="text-xs">
                                          {fish.attributes.latin_name}
                                        </span>
                                        <br />
                                        {fish.attributes.closed_season && (
                                          <span className="text-xs">
                                            Schonzeit:{" "}
                                            {fish.attributes.closed_season}
                                          </span>
                                        )}
                                      </dt>
                                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                                        {fish.attributes.minimum_size}cm
                                      </dd>
                                    </div>
                                  )
                              )}
                          </dl>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg text-primary-900 bg-primary-100 hover:bg-primary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75">
                          <span>Fangverbote</span>
                          <ChevronUpIcon
                            className={`${
                              open ? "transform rotate-180" : ""
                            } w-5 h-5 text-primary-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 overflow-y-scroll text-sm text-gray-500 max-h-80">
                          <dl>
                            {isSuccess &&
                              fishes.data.map(
                                (fish) =>
                                  fish.attributes.fishing_ban && (
                                    <div
                                      className="px-4 py-5 odd:bg-white even:bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                                      key={fish.id}
                                    >
                                      <dt className="text-sm font-medium text-gray-500 sm:col-span-2">
                                        {fish.attributes.name}
                                        <br />
                                        <span className="text-xs">
                                          {fish.attributes.latin_name}
                                        </span>
                                      </dt>
                                    </div>
                                  )
                              )}
                          </dl>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default FishingLaws;
