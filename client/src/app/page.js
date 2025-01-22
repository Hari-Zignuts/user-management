import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col">

      <header className="bg-gradient-to-r from-indigo-600 to-indigo-800 w-full py-6 shadow-md">
        <h1 className="text-white text-4xl font-extrabold text-center">Users List @ZigNuts</h1>
      </header>


      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12">

        <section className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Welcome to UsersList</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover user details, manage their profiles, and explore advanced functionalities built with Next.js.
          </p>
          <Link href="/users">
            <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-medium py-3 px-8 rounded-full shadow-md transition-all">
              Explore Users
            </button>
          </Link>
        </section>


        <section className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full text-gray-800">
          <h3 className="text-2xl font-bold mb-6 text-center">Project Features</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Proper state management with Like button</li>
            <li>Edit user details with a modal pop-up</li>
            <li>Remove specific users (frontend only)</li>
            <li>Reflect edited data in the list using state management</li>
            <li>
              Fetch user data from this
              <a href="https://jsonplaceholder.typicode.com/users" className="text-indigo-500 underline ml-2">https://jsonplaceholder.typicode.com/users</a>
            </li>
            <li>
              Fetch user avatars from this
              <a href="https://robohash.org" className="text-indigo-500 underline ml-2">https://robohash.org</a>
            </li>
            <li><strong>Additional Feature:</strong> Add new users</li>
            <li><strong>Additional Feature:</strong> Landing page with Next.js router</li>
          </ul>
          <p className="mt-6 text-center text-gray-600">
            Explore all features by navigating to the Users page.
          </p>
        </section>
      </main>

      <footer className="bg-gray-900 py-6 text-center text-white mt-auto">
        <p>© 2024 UsersList. All rights reserved.</p>
      </footer>
    </div>

  );
}
