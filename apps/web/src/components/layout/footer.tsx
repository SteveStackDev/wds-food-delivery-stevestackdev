/** Footer dùng chung cho mọi trang. Server Component, không có tương tác. */
export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p className="font-medium text-foreground">Food Delivery</p>
        <p>Bài tập Frontend: Next.js, Tailwind CSS, shadcn/ui, Zustand, React Hook Form, Zod.</p>
      </div>
    </footer>
  );
}
