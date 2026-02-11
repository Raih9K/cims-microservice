export default function TableSkeleton({ rows = 5, columns = 5 }) {
    return (
        <div className="animate-pulse">
            <table className="w-full">
                <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                    <tr>
                        {Array.from({ length: columns }).map((_, i) => (
                            <th key={i} className="py-4 px-6">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <tr key={rowIndex} className="animate-pulse">
                            {Array.from({ length: columns }).map((_, colIndex) => (
                                <td key={colIndex} className="py-4 px-6">
                                    <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full"></div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
