// Data untuk menyimpan album (dalam bentuk array untuk simulasi)
let albums = [];

// Seleksi elemen-elemen HTML
const galleryContainer = document.getElementById('gallery-container');
const galleryForm = document.getElementById('galleryForm');
const albumNameInput = document.getElementById('albumName');
const albumLinkInput = document.getElementById('albumLink');
const albumThumbnailInput = document.getElementById('albumThumbnail');
const albumCategoryInput = document.getElementById('albumCategory');
const searchInput = document.getElementById('searchInput');
const filterCategoryInput = document.getElementById('filterCategory');
const previewModal = document.getElementById('previewModal');
const previewImage = document.getElementById('previewImage');
const closeModal = document.querySelector('.close');

// Menambahkan album baru
galleryForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Mengambil nilai dari form
    const album = {
        name: albumNameInput.value,
        link: albumLinkInput.value,
        thumbnail: albumThumbnailInput.value || 'https://via.placeholder.com/150',
        category: albumCategoryInput.value,
    };

    // Menambahkan album ke array
    albums.push(album);

    // Reset form setelah menambahkan album
    galleryForm.reset();

    // Render ulang galeri
    renderGallery();
});

// Fungsi untuk merender galeri
function renderGallery() {
    galleryContainer.innerHTML = '';

    const filteredAlbums = filterAlbums();

    filteredAlbums.forEach((album) => {
        const albumCard = document.createElement('div');
        albumCard.classList.add('album');

        albumCard.innerHTML = `
            <img src="${album.thumbnail}" alt="${album.name}" onclick="openPreview('${album.thumbnail}')">
            <h3>${album.name}</h3>
            <a href="${album.link}" target="_blank">Lihat Album</a>
        `;

        galleryContainer.appendChild(albumCard);
    });
}

// Fungsi untuk membuka modal pratinjau gambar
function openPreview(imageSrc) {
    previewImage.src = imageSrc;
    previewModal.style.display = 'flex';
}

// Menutup modal pratinjau gambar
closeModal.addEventListener('click', () => {
    previewModal.style.display = 'none';
});

// Pencarian dan filter album
searchInput.addEventListener('input', renderGallery);
filterCategoryInput.addEventListener('change', renderGallery);

// Fungsi untuk memfilter album berdasarkan kategori dan pencarian
function filterAlbums() {
    const searchTerm = searchInput.value.toLowerCase();
    const filterCategory = filterCategoryInput.value;

    return albums.filter((album) => {
        const matchesSearch = album.name.toLowerCase().includes(searchTerm);
        const matchesCategory = filterCategory === 'all' || album.category === filterCategory;

        return matchesSearch && matchesCategory;
    });
}

// Tombol untuk mengunduh semua album (masih placeholder)
document.getElementById('downloadAll').addEventListener('click', () => {
    alert('Fitur unduh semua album akan segera tersedia!');
});

// Render galeri pertama kali
renderGallery();
