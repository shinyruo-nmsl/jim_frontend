import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-0 left-0 h-full w-full flex flex-col items-center">
      <div className="flex-none w-full h-fit">
        <Header />
      </div>
      <div className="flex-auto w-full overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
