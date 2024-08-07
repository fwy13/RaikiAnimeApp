import { useEffect, useState } from "react";
import getWebManga from "../logic/getWebManga";
import { typeWebSupport } from "../types/typeManga";

const TableWebManga = () => {
    const [Data, setData] = useState<typeWebSupport[]>();
    useEffect(() => {
        getWebManga({ setData: setData });
    }, []);

    return (
        <table className="min-w-full divide-y divide-gray-200 mt-2">
            <thead>
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {Data ? (
                    Data.map((el, i) => (
                        <tr key={i}>
                            <td className="px-6 py-4 whitespace-nowrap flex justify-center">
                                <img
                                    src={el.image}
                                    alt={el.name}
                                    className="size-6"
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {el.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap flex gap-1">
                                {el.support !== 0 ? (
                                    el.support === 1 ? (
                                        <div className="flex gap-2">
                                            <span className="text-success">
                                                Supported
                                            </span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-6 text-success"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                                                />
                                            </svg>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <span className="text-warning">
                                                Soon
                                            </span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-6 text-warning"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                                />
                                            </svg>
                                        </div>
                                    )
                                ) : (
                                    <div className="flex gap-2">
                                        <span className="text-error">
                                            No support
                                        </span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6 text-error"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td className="px-6 py-4">
                            <span className="loading loading-ring loading-lg"></span>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};
export default TableWebManga;
