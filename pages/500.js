export default function Custom500() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-gray-900 text-2xl font-semibold mb-10">
          404 | Opps! Terjadi Masalah Pada Server
        </h1>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-indigo-600 rounded-md shadow-lg"
        >
          Kembali
        </button>
      </div>
    </>
  );
}
