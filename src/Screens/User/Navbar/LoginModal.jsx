import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import LoginMidleware from "../../Components/Login/LoginMidleware";

export function LoginModal(isOpen, closeModal) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="w-full  relative z-[1000] "
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-hidden">
          <div className="flex h-[88vh] mt-14 items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[25%] max-2xl:w-[35%] max-xl:w-[40%] max-lg:w-[55%] max-md:w-[65%] max-sm:w-full transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                <LoginMidleware Close={closeModal} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
