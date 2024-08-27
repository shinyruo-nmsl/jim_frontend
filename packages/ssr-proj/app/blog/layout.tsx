import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-700">
      <Header />
      {children}
    </div>
  );
}
