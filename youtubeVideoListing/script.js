const ytVideosContainer = document.getElementById("video-container");

const fetchVideoData = async () => {
  const url = "https://api.freeapi.app/api/v1/public/youtube/videos";
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
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

fetchVideoData();
