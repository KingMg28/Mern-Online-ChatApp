const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(4).fill(null);

  return (
    <aside
      className="h-full w-12 sm:w-64 
    flex flex-col transition-all duration-200"
    >
      {" "}
      {/* Skeleton Contacts */}
      <div className=" w-full py-3 overflow-x-hidden">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-1 sm:p-2 flex items-center gap-3">
            {/* Avatar skeleton */}
            <div className="relative mx-0 sm:mx-auto">
              <div className="skeleton size-8 md:size-12 rounded-full" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden sm:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2" />
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
