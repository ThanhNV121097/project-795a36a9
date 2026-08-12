export default function HomePage() {
  return (
    <main className="min-h-screen bg-appBackground px-4 py-10 text-slate-900">
      <section className="mx-auto max-w-2xl rounded-3xl bg-surface p-6 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-medium text-primary">Todo List App v4</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Today&apos;s tasks</h1>
        <p className="mt-3 text-slate-600">Todo features land in story PRs. Scaffold verifies app shell, styles, and build.</p>
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
          Task list loading, empty, saved, and error states live here.
        </div>
      </section>
    </main>
  );
}
