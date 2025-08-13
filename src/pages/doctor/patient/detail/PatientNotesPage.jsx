import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getNotes,
  deleteNote,
  createNote,
  updateNote,
} from "@src/services/notesService";
import { useDispatch } from "react-redux";
import { showModal, closeModal } from "@src/redux/reducers/modalReducer";
import Input from "@src/components/form/Input";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from "@src/context/ThemeContext";
import { getFontStyle } from "@src/utils/theme";

const PatientNotesPage = () => {
  const { theme } = useTheme();
  const [page, setPage] = React.useState(1);

  const { patientId } = useParams();
  const dispatch = useDispatch();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["notes", page, patientId],
    queryFn: () => getNotes({ page, patient_id: patientId }),
    select: (response) => ({
      notes: response.results || response.data || response,
      pagination: {
        page: response.page || page,
        totalPages: response.total_pages || response.totalPages || 1,
        totalCount: response.count || response.totalCount || 0,
      },
    }),
    enabled: !!patientId,
  });

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      await deleteNote(noteId);
      refetch();
      toast.success("Note deleted successfully");
    } catch (err) {
      console.error("Error deleting note:", err);
      toast.error("Failed to delete note");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= data?.pagination.totalPages) {
      setPage(newPage);
    }
  };

  const handleOpenModal = (note = null) => {
    const isEdit = note !== null;
    dispatch(
      showModal({
        id: isEdit ? "editNoteModal" : "addNoteModal",
        title: isEdit ? "Edit Note" : "Add Note",
        content: <FormModal note={note} isEdit={isEdit} />,
      })
    );
  };

  const FormModal = ({ note = null, isEdit = false }) => {
    const formik = useFormik({
      initialValues: {
        subjective: note?.subjective || "",
        cc: note?.cc || "",
        allergies: note?.allergies || "",
        vitals: note?.vitals || "",
        plan: note?.plan || "",
      },
      onSubmit: async (values) => {
        if (!patientId) {
          toast.error("Patient ID is required");
          return;
        }

        const payload = {
          patient: patientId,
          ...values,
        };

        try {
          let response;
          if (isEdit) {
            response = await updateNote(note.id, payload);
            toast.success("Note updated successfully");
          } else {
            response = await createNote(payload);
            toast.success("Note created successfully");
          }

          dispatch(closeModal(isEdit ? "editNoteModal" : "addNoteModal"));
          refetch();
          formik.resetForm();
        } catch (error) {
          console.error(
            `Error ${isEdit ? "updating" : "creating"} note:`,
            error
          );

          if (error.response?.data?.detail?.patient) {
            toast.error(
              `Patient with ID ${patientId} does not exist. Please check the patient ID.`
            );
          } else {
            toast.error(
              error.response?.data?.message ||
              `Failed to ${isEdit ? "update" : "create"} note`
            );
          }
        }
      },
    });

    return (
      <div className="mt-2 px-4 pt-3 pb-4 sm:pb-4">
        <form
          id={isEdit ? "editNotesForm" : "addNotesForm"}
          className="space-y-4"
          onSubmit={formik.handleSubmit}
        >
          <div>
            <label
              htmlFor="subjective"
              className="block text-sm font-medium text-gray-700"
              style={getFontStyle(theme, "body2")}
            >
              Subjective
            </label>
            <Input
              id="subjective"
              name="subjective"
              onChange={(e) =>
                formik.setFieldValue("subjective", e.target.value)
              }
              value={formik.values.subjective}
              placeholder="Enter Subjective"
              required
              style={getFontStyle(theme, "body1")}
            />
          </div>
          <div>
            <label
              htmlFor="cc"
              className="block text-sm font-medium text-gray-700"
              style={getFontStyle(theme, "body2")}
            >
              Chief Complaint (CC)
            </label>
            <Input
              id="cc"
              name="cc"
              onChange={(e) => formik.setFieldValue("cc", e.target.value)}
              value={formik.values.cc}
              placeholder="Enter Chief Complaint (CC)"
              required
              style={getFontStyle(theme, "body1")}
            />
          </div>
          <div>
            <label
              htmlFor="allergies"
              className="block text-sm font-medium text-gray-700"
              style={getFontStyle(theme, "body2")}
            >
              Allergies
            </label>
            <Input
              id="allergies"
              name="allergies"
              onChange={(e) =>
                formik.setFieldValue("allergies", e.target.value)
              }
              value={formik.values.allergies}
              placeholder="Enter Allergies"
              style={getFontStyle(theme, "body1")}
            />
          </div>
          <div>
            <label
              htmlFor="vitals"
              className="block text-sm font-medium text-gray-700"
              style={getFontStyle(theme, "body2")}
            >
              Vitals
            </label>
            <Input
              id="vitals"
              name="vitals"
              onChange={(e) => formik.setFieldValue("vitals", e.target.value)}
              value={formik.values.vitals}
              placeholder="Enter Vitals"
              required
              style={getFontStyle(theme, "body1")}
            />
          </div>
          <div>
            <label
              htmlFor="plan"
              className="block text-sm font-medium text-gray-700"
              style={getFontStyle(theme, "body2")}
            >
              Plan
            </label>
            <Input
              id="plan"
              name="plan"
              onChange={(e) => formik.setFieldValue("plan", e.target.value)}
              value={formik.values.plan}
              placeholder="Enter Plan"
              required
              style={getFontStyle(theme, "body1")}
            />
          </div>
          <div className="flex justify-end">
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() =>
                  dispatch(
                    closeModal(isEdit ? "editNoteModal" : "addNoteModal")
                  )
                }
                className="bg-danger text-white px-4 py-2 rounded-full"
                style={getFontStyle(theme, "body2")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-all duration-150"
                style={getFontStyle(theme, "body2")}
              >
                {isEdit ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  if (!patientId) {
    return (
      <div className="bg-white shadow-md rounded-2xl p-8 text-center">
        <p className="text-red-500" style={getFontStyle(theme, "body1")}>
          Patient ID not found. Please check the URL.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-2xl pb-4">
      <div
        className="flex justify-between p-4 border-b-2 rounded-t-2xl bg-grey bg-opacity-[0.4] shadow shadow-b"
        style={getFontStyle(theme, "subHeading")}
      >
        <h2
          className="text-lg font-medium"
          style={getFontStyle(theme, "subHeading")}
        >
          All Notes
        </h2>
        <div className="text-end inline-block">
          <button
            className="bg-primary text-white rounded-full text-nowrap px-3 py-2"
            type="button"
            style={getFontStyle(theme, "body2")}
            onClick={() => handleOpenModal()}
          >
            + Add Notes
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2" style={getFontStyle(theme, "body1")}>
            Loading notes...
          </p>
        </div>
      )}

      {isError && (
        <div className="p-4 text-center">
          <p className="text-red-500" style={getFontStyle(theme, "body1")}>
            {error?.message || "Failed to fetch notes"}
          </p>
          <button
            className="mt-2 bg-primary text-white px-4 py-2 rounded"
            onClick={() => refetch()}
            style={getFontStyle(theme, "body2")}
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white overflow-x-auto text-nowrap">
            <thead>
              <tr style={getFontStyle(theme, "body2")}>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Subjective{" "}
                  <i className="material-icons align-middle">arrow_drop_down</i>
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  CC
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Allergies
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Vitals
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Plan
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Date &amp; Time
                </th>
                <th className="py-2 px-4 border-b text-start font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className="text-body"
              style={getFontStyle(theme, "body1")}
            >
              {!data?.notes?.length ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">
                    No notes found
                  </td>
                </tr>
              ) : (
                data.notes.map((note) => (
                  <tr key={note.id}>
                    <td className="py-2 px-4 border-b">
                      {note.subjective || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b">{note.cc || "N/A"}</td>
                    <td className="py-2 px-4 border-b">
                      <span
                        className={`px-2 py-1 border rounded-full ${note.allergies === "None"
                            ? "border-info text-info"
                            : "border-danger text-danger"
                          }`}
                        style={getFontStyle(theme, "body2")}
                      >
                        {note.allergies || "None"}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {note.vitals || "Normal"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span
                        className={`${note.plan === "Done"
                            ? "text-success"
                            : note.plan === "Rejected"
                              ? "text-danger"
                              : "text-info"
                          }`}
                        style={getFontStyle(theme, "body2")}
                      >
                        {note.plan || "In Progress"}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {note.created_at
                        ? new Date(note.created_at).toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="text-blue-500 hover:underline mr-2"
                        type="button"
                        style={getFontStyle(theme, "body2")}
                        onClick={() => handleOpenModal(note)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        type="button"
                        style={getFontStyle(theme, "body2")}
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {data?.notes?.length > 0 && (
            <div className="flex justify-end items-center mt-4 mx-4">
              <div
                className="space-x-1"
                style={getFontStyle(theme, "body2")}
              >
                <span>Page</span>
                <button
                  className="px-4 border border-muted rounded-full text-muted hover:bg-muted hover:text-white transition-all duration-150"
                  style={getFontStyle(theme, "body2")}
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1}
                >
                  {page}
                </button>
                <span>of {data.pagination.totalPages}</span>
                {page < data.pagination.totalPages && (
                  <button
                    className="px-4 border border-muted rounded-full text-muted hover:bg-muted hover:text-white transition-all duration-150"
                    style={getFontStyle(theme, "body2")}
                    onClick={() => handlePageChange(page + 1)}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientNotesPage;
