import { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import NotesCard from "../../components/notesCard";
import { useNotes } from "../../context/notesContext";

const Home = () => {
  const { title, text, notes, dispatchState } = useNotes();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const onTitleChange = (e) => {
    dispatchState({
      type: "TITLE",
      payload: e.target.value,
    });
  };

  const onTextChange = (e) => {
    dispatchState({
      type: "TEXT",
      payload: e.target.value,
    });
  };

  const onAddClick = () => {
    dispatchState({ type: "ADD_NOTE" });
    dispatchState({ type: "CLEAR" });
  };

  const pinnedNotes = notes?.filter((note) => note.isPinned);
  const otherNotes = notes?.filter((note) => !note.isPinned);

  return (
    <>
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex min-h-screen">
        {/* Sidebar Drawer & Static */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-10 bg-gray-50 mt-2 lg:mt-0">
          {/* Note Input */}
          <div className="flex justify-center mb-10">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-4 border border-gray-300 flex flex-col gap-3">
              <input
                value={title}
                onChange={onTitleChange}
                placeholder="Enter Title"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <textarea
                value={text}
                onChange={onTextChange}
                placeholder="Enter Note"
                className="w-full h-28 px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex justify-end mt-2">
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg disabled:bg-indigo-300"
                  onClick={onAddClick}
                  disabled={title.length === 0}
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>

          {/* Notes Display */}
          <div className="flex flex-col gap-12">
            {pinnedNotes.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
                  📌 Pinned Notes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pinnedNotes.map(({ id, title, text, isPinned }) => (
                    <NotesCard
                      key={id}
                      id={id}
                      title={title}
                      text={text}
                      isPinned={isPinned}
                    />
                  ))}
                </div>
              </div>
            )}

            <div>
              {pinnedNotes.length > 0 && (
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                  🗂️ Other Notes
                </h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherNotes.length > 0 ? (
                  otherNotes.map(({ id, title, text, isPinned }) => (
                    <NotesCard
                      key={id}
                      id={id}
                      title={title}
                      text={text}
                      isPinned={isPinned}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 italic">No notes yet.</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
