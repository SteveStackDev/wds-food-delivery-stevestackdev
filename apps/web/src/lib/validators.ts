/**
 * Số điện thoại di động Việt Nam: bắt đầu bằng 0 hoặc +84,
 * theo sau là đầu số 3/5/7/8/9 và 8 chữ số. Ví dụ hợp lệ: 0901234567, +84901234567.
 */
export const VN_PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
