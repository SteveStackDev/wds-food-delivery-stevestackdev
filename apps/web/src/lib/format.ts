const vndFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

/** Định dạng tiền Việt, ví dụ 55000 -> "55.000 ₫" */
export function formatVND(amount: number): string {
  return vndFormatter.format(amount);
}
