import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#fafafa] sm:bg-slate-50 text-slate-800 font-sans selection:bg-blue-500 selection:text-white pb-12">
      <div className="fixed top-0 left-0 right-0 z-50 p-3 sm:p-6 flex justify-center pointer-events-none pb-2 sm:pb-4 bg-gradient-to-b from-slate-50 to-transparent">
        <div className="pointer-events-auto w-full max-w-5xl">
          <Sidebar />
        </div>
      </div>
      <div className="pt-24 sm:pt-32 w-full px-3 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}