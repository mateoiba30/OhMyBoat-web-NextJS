import Link from "next/link";

function ReportsPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="font-semibold text-lg">Reportes</h1>
        <div className="flex flex-col items-center">
          <Link href="/admin/reports/all-trades">
            <span className="text-blue-500 hover:text-blue-900 mb-4 text-lg font-semibold">Intercambios populares</span>
          </Link>
          <Link href="/admin/reports/done-trades">
            <span className="text-blue-500 hover:text-blue-900 mb-4 text-lg font-semibold">Intercambios realizados</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
