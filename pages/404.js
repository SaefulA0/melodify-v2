import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-gray-900 text-2xl font-semibold mb-10">
          404 | Opps! Halaman Tidak Ditemukan
        </h1>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-indigo-600 rounded-md shadow-lg"
        >
          Kembali
        </button>
      </div>
    </>
  );
}
