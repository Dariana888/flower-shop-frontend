import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

// ==============================
// TOKEN INTERCEPTOR
// ==============================

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ==============================
// DOWNLOAD FILE
// ==============================

export const downloadFile = async (url) => {

    try {

        const response = await api.get(url, {
            responseType: "blob"
        });

        let filename = "invoice.pdf";

        const disposition = response.headers["content-disposition"];

        if (disposition) {
            const match = disposition.match(/filename="?([^"]+)"?/);

            if (match) {
                filename = match[1];
            }
        }

        const blob = new Blob(
            [response.data],
            { type: "application/pdf" }
        );

        const fileURL = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = fileURL;
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        link.remove();

        window.URL.revokeObjectURL(fileURL);

    } catch (error) {

        console.error(error);

        alert(
            error.response?.data?.detail ||
            "Cannot download invoice"
        );
    }
};

// ==============================
// EXPORT API
// ==============================

export default api;
