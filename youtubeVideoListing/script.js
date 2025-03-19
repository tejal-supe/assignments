const ytVideosContainer = document.getElementById("video-container");
const noDataAvailable = document.getElementById("no-data");

const fetchVideoData = async () => {
  const url = "https://api.freeapi.app/api/v1/public/youtube/videos";
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    renderDataToHtml(data?.data?.data);
  } catch (error) {
    console.error(error);
  }
};

const renderDataToHtml = (data) => {
  ytVideosContainer.innerHTML = "";
  data?.map((youtube) => {
    const container = document.createElement("div");
    container.className = "card";
    container.innerHTML = `
     <img src="${youtube.items.snippet.thumbnails.standard.url}" alt="${youtube.items.snippet.title}" class="video-thumbnail">
      <div class="video-info">
        <h3 class="video-title">${youtube.items.snippet.title}</h3>
        <p class="video-channel">${youtube.items.snippet.channelTitle}</p>
      </div>
        `;
    container.addEventListener("click", () =>
      window.open(`https://www.youtube.com/watch?v=${youtube.items.id}`)
    );

    ytVideosContainer.append(container);
  });
};


const searchVideos = (value) => {
    const videoCards = document.querySelectorAll(".card");
    videoCards.forEach(card => {
        const title = card
          .querySelector(".video-title")
          .textContent.toLowerCase();
      
        if (title.includes(value) ) {
            card.style.display = "block";
            noDataAvailable.style.display = "none";
        } else {
            card.style.display = "none";
            noDataAvailable.style.display="block"
            
        }
    })
    
}
fetchVideoData();
