/**
 * Hiển thị tự động trong lúc trang /restaurant/[id] đang tải (Next.js bọc page
 * trong <Suspense> với file này làm fallback). Với mock data thì gần như không thấy,
 * nhưng khi gọi API thật ở Buổi 4 thì đây là bộ khung chờ cho người dùng.
 */
export default function RestaurantLoading() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="Đang tải nhà hàng">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="aspect-4/3 w-full rounded-xl bg-muted sm:w-64" />
        <div className="flex-1 space-y-3">
          <div className="h-8 w-2/3 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-1/2 rounded bg-muted" />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-30 rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  );
}
