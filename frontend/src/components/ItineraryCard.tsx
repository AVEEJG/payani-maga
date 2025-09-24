const ItineraryCardSkeleton = () => {
  return (
    <div className="w-full rounded-lg shadow-md p-4 animate-pulse">
      <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-4"></div>
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
      </div>
    </div>
  );
};

export default ItineraryCardSkeleton;