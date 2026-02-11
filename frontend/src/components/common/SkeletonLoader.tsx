"use client";


export const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FC] p-4 sm:p-6 lg:p-10 animate-pulse">
      <div className="max-w-[1400px] mx-auto space-y-10">

        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="h-4 w-48 bg-gray-200 rounded-full" />
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-gray-200 rounded-[1.5rem]" />
              <div className="space-y-2">
                <div className="h-10 w-64 bg-gray-200 rounded-xl" />
                <div className="h-4 w-40 bg-gray-100 rounded-full" />
              </div>
            </div>
          </div>
          <div className="h-14 w-48 bg-gray-200 rounded-2xl" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-[2.5rem] border border-gray-100 p-8 space-y-8 shadow-sm">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl" />
                <div className="w-20 h-6 bg-gray-50 rounded-full" />
              </div>
              <div className="space-y-3">
                <div className="h-6 w-3/4 bg-gray-200 rounded-lg" />
                <div className="h-4 w-1/2 bg-gray-100 rounded-full" />
              </div>
              <div className="pt-6 border-t border-gray-50 flex gap-3">
                <div className="flex-1 h-12 bg-gray-50 rounded-xl" />
                <div className="w-12 h-12 bg-gray-50 rounded-xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Large Card Skeleton */}
        <div className="bg-white rounded-[3rem] border border-gray-100 p-10 h-80 flex flex-col justify-center items-center space-y-4 shadow-sm">
          <div className="w-20 h-20 bg-gray-50 rounded-full" />
          <div className="h-6 w-48 bg-gray-100 rounded-lg" />
          <div className="h-4 w-32 bg-gray-50 rounded-full" />
        </div>

      </div>
    </div>
  );
};

export const TableSkeleton = () => (
  <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 space-y-10 animate-pulse">
    <div className="flex justify-between items-center">
      <div className="h-6 w-48 bg-gray-200 rounded-lg" />
      <div className="h-6 w-24 bg-gray-100 rounded-lg" />
    </div>
    <div className="space-y-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="h-16 w-full bg-gray-50 rounded-2xl" />
      ))}
    </div>
  </div>
);

export const GridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="bg-white rounded-[2.5rem] border border-gray-100 p-8 space-y-8">
        <div className="w-14 h-14 bg-gray-100 rounded-2xl" />
        <div className="space-y-3">
          <div className="h-6 w-3/4 bg-gray-200 rounded-lg" />
          <div className="h-4 w-1/2 bg-gray-100 rounded-full" />
        </div>
        <div className="pt-6 border-t border-gray-50 h-14 bg-gray-50/50 rounded-xl" />
      </div>
    ))}
  </div>
);

export const MappingSkeleton = () => (
  <div className="flex flex-col lg:flex-row gap-8 min-h-[600px] animate-pulse">
    <div className="flex-1 bg-white rounded-[2.5rem] border border-gray-100 p-8 space-y-6">
      <div className="h-12 w-full bg-gray-50 rounded-2xl" />
      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="h-20 w-full bg-gray-50/50 rounded-2xl" />
        ))}
      </div>
    </div>
    <div className="w-full lg:w-[480px] bg-white rounded-[2.5rem] border border-gray-100 p-8 space-y-8">
      <div className="h-10 w-32 bg-gray-100 rounded-lg" />
      <div className="h-14 w-full bg-gray-50 rounded-2xl" />
      <div className="aspect-video w-full bg-gray-50 rounded-[2.5rem]" />
      <div className="space-y-4">
        <div className="h-4 w-full bg-gray-100 rounded-full" />
        <div className="h-4 w-2/3 bg-gray-100 rounded-full" />
      </div>
      <div className="h-14 w-full bg-gray-200 rounded-2xl mt-auto" />
    </div>
  </div>
);
