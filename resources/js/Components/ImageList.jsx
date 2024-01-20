import React from "react";

const isImage = ({ props }) => {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {props.data
                    ? props.data.map((image, i) => {
                          return (
                              <div className="rounded overflow-hidden shadow-lg flex flex-col">
                                  <a href="#"></a>
                                  <div className="relative">
                                      <a href="#">
                                          <img
                                              className="w-full"
                                              src={
                                                  `http://localhost:8000/uploads/` +
                                                  image.image_path
                                              }
                                              alt="Sunset in the mountains"
                                          />
                                          <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                                      </a>
                                  </div>
                                  <div className="px-6 py-4 mb-auto">
                                      <a
                                          href="#"
                                          className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
                                      >
                                          {image.image_name}
                                      </a>
                                      <p className="text-gray-500 text-sm">
                                          {image.image_description}
                                      </p>
                                  </div>
                                  <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                                      <span
                                          href="#"
                                          className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
                                      >
                                          <a
                                              className="flex items-center no-underline hover:underline text-black"
                                              href="#"
                                          >
                                              <img
                                                  alt="Placeholder"
                                                  className="block rounded-full"
                                                  src="https://picsum.photos/32/32/?random"
                                              />

                                              <span className="ml-2">
                                                  Author : {image.name}
                                              </span>
                                          </a>
                                      </span>

                                      <span
                                          href="#"
                                          className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
                                      >
                                          <span className="ml-1">
                                              Upload : {image.created_at}
                                          </span>
                                      </span>
                                  </div>
                              </div>
                          );
                      })
                    : null}
            </div>
        </>
    );
};

const isNotImage = () => {
    return <div className="row">Tidak Ada Data</div>;
};

const ImageList = ({ props }) => {
    return <>{props.data ? isImage({ props }) : isNotImage({ props })}</>;
};

export default ImageList;
