import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    collection,
    getDocs,
    query,
    orderBy,
    deleteDoc,
    doc,
    updateDoc,
    setDoc
} from "firebase/firestore";
import {
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";
import { db, storage } from "../../firebase/config";

const PanelAdmin = () => {
    const [mascotas, setMascotas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editando, setEditando] = useState(null);
    const [agregando, setAgregando] = useState(false);
    const [archivoImagen, setArchivoImagen] = useState(null);
    const [busqueda, setBusqueda] = useState("");
    const [filtroRaza, setFiltroRaza] = useState("todos");

    const formularioVacio = {
        title: "",
        raza: "",
        descrip: "",
        sobre: "",
        image: ""
    };

    const [formulario, setFormulario] = useState(formularioVacio);

    useEffect(() => {
        cargarMascotas();
    }, []);

    const cargarMascotas = async () => {
        try {
        const q = query(collection(db, "mascotas"), orderBy("id", "asc"));
        const querySnapshot = await getDocs(q);

        const listaMascotas = querySnapshot.docs.map((documento) => ({
            firebaseId: documento.id,
            ...documento.data()
        }));

        setMascotas(listaMascotas);
        } catch (error) {
        console.error("Error cargando mascotas:", error);
        }

        setLoading(false);
    };

    const manejarCambio = (e) => {
        setFormulario({
        ...formulario,
        [e.target.name]: e.target.value
        });
    };

    const manejarImagen = (e) => {
        if (e.target.files[0]) {
        setArchivoImagen(e.target.files[0]);
        }
    };

    const subirImagenStorage = async (id) => {
        if (!archivoImagen) {
        return formulario.image;
        }

        const nombreArchivo = `${Date.now()}-${archivoImagen.name}`;
        const rutaImagen = `mascotas/admin/${id}/${nombreArchivo}`;
        const storageRef = ref(storage, rutaImagen);

        await uploadBytes(storageRef, archivoImagen);

        return await getDownloadURL(storageRef);
    };

    const abrirAgregar = () => {
        setAgregando(true);
        setEditando(null);
        setArchivoImagen(null);
        setFormulario(formularioVacio);

        setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
    };

    const abrirEditar = (mascota) => {
        setEditando(mascota.id);
        setAgregando(false);
        setArchivoImagen(null);

        setFormulario({
        title: mascota.title || "",
        raza: mascota.raza || "",
        descrip: mascota.descrip || "",
        sobre: mascota.sobre || "",
        image: mascota.image || ""
        });

        setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
    };

    const cancelarFormulario = () => {
        setEditando(null);
        setAgregando(false);
        setArchivoImagen(null);
        setFormulario(formularioVacio);
    };

    const obtenerNuevoId = () => {
        if (mascotas.length === 0) return 1;
        return Math.max(...mascotas.map((mascota) => Number(mascota.id))) + 1;
    };

    const agregarMascota = async () => {
        if (!formulario.title || !formulario.raza || !formulario.descrip || !formulario.sobre) {
        alert("Completa todos los campos");
        return;
        }

        if (!archivoImagen) {
        alert("Selecciona una imagen");
        return;
        }

        try {
        const nuevoId = obtenerNuevoId();
        const nuevoCid = 10000 + nuevoId;
        const nuevaUrlImagen = await subirImagenStorage(nuevoId);

        const nuevaMascota = {
            id: nuevoId,
            cid: nuevoCid,
            title: formulario.title,
            raza: formulario.raza,
            descrip: formulario.descrip,
            sobre: formulario.sobre,
            image: nuevaUrlImagen
        };

        await setDoc(doc(db, "mascotas", String(nuevoId)), nuevaMascota);

        setMascotas([...mascotas, nuevaMascota].sort((a, b) => a.id - b.id));

        alert("Mascota agregada correctamente");
        cancelarFormulario();
        } catch (error) {
        console.error("Error al agregar:", error);
        alert("Error al agregar mascota");
        }
    };

    const guardarEdicion = async (id) => {
        try {
        const nuevaUrlImagen = await subirImagenStorage(id);

        const datosActualizados = {
            title: formulario.title,
            raza: formulario.raza,
            descrip: formulario.descrip,
            sobre: formulario.sobre,
            image: nuevaUrlImagen
        };

        await updateDoc(doc(db, "mascotas", String(id)), datosActualizados);

        setMascotas(
            mascotas.map((mascota) =>
            mascota.id === id
                ? { ...mascota, ...datosActualizados }
                : mascota
            )
        );

        alert("Mascota actualizada");
        cancelarFormulario();
        } catch (error) {
        console.error("Error al editar:", error);
        alert("Error al editar mascota");
        }
    };

    const eliminarMascota = async (id) => {
        const confirmar = window.confirm("¿Deseas eliminar esta mascota?");
        if (!confirmar) return;

        try {
        await deleteDoc(doc(db, "mascotas", String(id)));
        setMascotas(mascotas.filter((mascota) => mascota.id !== id));
        alert("Mascota eliminada");
        } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Error al eliminar mascota");
        }
    };

    const mascotasFiltradas = mascotas.filter((mascota) => {
        const coincideNombre = mascota.title
        .toLowerCase()
        .includes(busqueda.toLowerCase());

        const coincideRaza =
        filtroRaza === "todos" || mascota.raza === filtroRaza;

        return coincideNombre && coincideRaza;
    });

    return (
        <div className="admin-page">
        <div className="admin-topbar">
            <h2>🐾 PawFriend Admin</h2>

            <div className="admin-topbar-actions">
            <Link to="/">
                <button className="admin-btn admin-btn-secondary">
                Back to Website
                </button>
            </Link>

            <button
                className="admin-btn admin-btn-danger"
                onClick={() => {
                localStorage.removeItem("adminAuth");
                window.location.href = "/Administrar";
                }}
            >
                Logout
            </button>
            </div>
        </div>

        <div className="admin-panel">
            <div className="admin-header-row">
            <div>
                <h1>Pet Management</h1>
                <p>Manage PawFriend rescued pets.</p>
            </div>

            <button className="admin-btn" onClick={abrirAgregar}>
                Add Pet
            </button>
            </div>

            <div className="admin-filters">
            <input
                className="admin-input"
                type="text"
                placeholder="Search by name..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            <select
                className="admin-select"
                value={filtroRaza}
                onChange={(e) => setFiltroRaza(e.target.value)}
            >
                <option value="todos">All</option>
                <option value="dog">Dogs</option>
                <option value="cat">Cats</option>
            </select>
            </div>

            {(editando || agregando) && (
            <div className="admin-form">
                <h3>
                {agregando
                    ? "Add New Pet"
                    : `Editing Pet ID: ${editando}`}
                </h3>

                <div className="admin-form-grid">
                <input
                    className="admin-input"
                    type="text"
                    name="title"
                    placeholder="Name"
                    value={formulario.title}
                    onChange={manejarCambio}
                />

                <select
                    className="admin-select"
                    name="raza"
                    value={formulario.raza}
                    onChange={manejarCambio}
                >
                    <option value="">Select type</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                </select>

                <input
                    className="admin-input admin-form-full"
                    type="text"
                    name="descrip"
                    placeholder="Short description"
                    value={formulario.descrip}
                    onChange={manejarCambio}
                />

                <textarea
                    className="admin-textarea admin-form-full"
                    name="sobre"
                    placeholder="Long description"
                    value={formulario.sobre}
                    onChange={manejarCambio}
                    rows="5"
                />

                {!agregando && formulario.image && (
                    <div className="admin-form-full">
                    <p>Current image:</p>
                    <img
                        src={formulario.image}
                        alt="preview"
                        className="admin-preview"
                    />
                    </div>
                )}

                <div className="admin-form-full">
                    <input
                    type="file"
                    accept="image/*"
                    onChange={manejarImagen}
                    />

                    <p className="admin-help-text">
                        {agregando
                            ? "Select an image for the new pet."
                            : "If you do not select a new image, the current one will be kept."}
                    </p>
                </div>
                </div>

                <div className="admin-form-buttons">
                    <button
                        className="admin-btn"
                        onClick={() =>
                        agregando ? agregarMascota() : guardarEdicion(editando)
                        }
                    >
                        {agregando ? "Save Pet" : "Save Changes"}
                    </button>

                    <button
                        className="admin-btn admin-btn-secondary"
                        onClick={cancelarFormulario}
                    >
                        Cancel
                    </button>
                </div>
            </div>
            )}

            {loading ? (
            <p>Loading pets...</p>
            ) : mascotasFiltradas.length === 0 ? (
            <p className="admin-empty">No pets found.</p>
            ) : (
            <div className="admin-table-container">
                <table className="admin-table">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {mascotasFiltradas.map((mascota) => (
                    <tr key={mascota.id}>
                        <td>{mascota.id}</td>

                        <td>
                        <img
                            src={mascota.image}
                            alt={mascota.title}
                            className="admin-img"
                        />
                        </td>

                        <td>{mascota.title}</td>
                        <td>{mascota.raza}</td>
                        <td>{mascota.descrip}</td>

                        <td>
                        <button
                            className="admin-btn"
                            onClick={() => abrirEditar(mascota)}
                        >
                            Edit
                        </button>

                        <button
                            className="admin-btn admin-btn-danger"
                            onClick={() => eliminarMascota(mascota.id)}
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </div>
        </div>
    );
};

export default PanelAdmin;