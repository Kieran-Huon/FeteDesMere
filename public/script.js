document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  const starSky = document.getElementById('starSky');
  const music = document.getElementById('bgMusic');
  const toggleBtn = document.getElementById('toggleMusic');
  const popup = document.getElementById('popup');
  const popupClose = document.getElementById('popupClose');
  const popupMedia = document.getElementById('popupMedia');
  const popupText = document.getElementById('popupText');

  // Clic sur bouton surprise
  document.getElementById('revealBtn').addEventListener('click', () => {
    gallery.classList.remove('hidden');
    starSky.classList.remove('hidden');
    music.play();

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  });

  // Toggle musique
  toggleBtn.addEventListener('click', () => {
    if (music.paused) {
      music.play();
      toggleBtn.textContent = '🔊';
    } else {
      music.pause();
      toggleBtn.textContent = '🔇';
    }
  });

  // Répartition souvenirs
  const memories = [
    // 10 images
    ...Array.from({ length: 12 }, (_, i) => ({
      type: 'image',
      src: `images/image${i + 1}.jpg`,
      message: `Souvenir #${i + 1} 📸`
    })),
    // 2 vidéos
    // {
    //   type: 'video',
    //   src: 'images/video1.mp4',
    //   message: 'Un instant magique 🎥'
    // },
    // {
    //   type: 'video',
    //   src: 'media/video2.mp4',
    //   message: 'Un autre moment précieux 🎬'
    // }
  ];

  // Génération des étoiles en cœur
  const total = memories.length;
  for (let i = 0; i < total; i++) {
    const angle = i * (Math.PI * 2) / total;
    const x = 16 * Math.pow(Math.sin(angle), 3);
    const y = -(
      13 * Math.cos(angle) -
      5 * Math.cos(2 * angle) -
      2 * Math.cos(3 * angle) -
      Math.cos(4 * angle)
    );

    const { type, src, message } = memories[i];

    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${50 + x * 2}%`;
    star.style.top = `${50 + y * 2}%`;
    star.dataset.type = type;
    star.dataset.src = src;
    star.dataset.message = message;

    // Gestion clic étoile
    star.addEventListener('click', () => {
      popupMedia.innerHTML = '';
      popupText.textContent = message;

      if (type === 'image') {
        const img = document.createElement('img');
        img.src = src;
        img.alt = message;
        img.style.maxWidth = '100%';
        popupMedia.appendChild(img);
      } else if (type === 'video') {
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.style.maxWidth = '100%';
        popupMedia.appendChild(video);
      }

      popup.classList.remove('hidden');
    });

    starSky.appendChild(star);
  }

  // Fermeture popup
  popupClose.addEventListener('click', () => {
    popup.classList.add('hidden');
    popupMedia.innerHTML = '';
  });
});
