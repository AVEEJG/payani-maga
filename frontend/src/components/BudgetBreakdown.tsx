const BudgetBreakdownSkeleton = () => {
  return (
    <div className="w-full rounded-lg shadow-md p-4 animate-pulse">
      <div className="h-6 bg-gray-200 rounded-md w-1/2 mb-4"></div>
      <div className="flex flex-col space-y-2">
        <div className="h-4 bg-gray-200 rounded-md w-full"></div>
        <div className="h-4 bg-gray-200 rounded-md w-full"></div>
        <div className="h-4 bg-gray-200 rounded-md w-full"></div>
      </div>
    </div>
  );
};

export default BudgetBreakdownSkeleton;