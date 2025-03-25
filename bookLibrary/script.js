let paginationState = {
  totalPages: 0,
  currentPage: 1,
  currentPageItems: 10,
  totalItems: 0,
  previousPage: false,
  nextPage: true,
};

const booksDiv = document.getElementById("books-div");
const prevPageButton = document.getElementById("prev");
const nextPageButton = document.getElementById("next");
const pageNum = document.getElementById("pageNo");

// Function for fetching all the books
const fetchAllBooks = async () => {
  const url = `https://api.freeapi.app/api/v1/public/books?page=${paginationState.currentPage}&limit=${paginationState.currentPageItems}`;
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const response = await fetch(url, options);
    const { data } = await response.json();
    if (data) {
      setPaginationData(data);
      renderBooksToHtml(data?.data);
    }
  } catch (error) {
    console.error(error, "Error fetching the books");
  }
};

const setPaginationData = (data) => {
  const { page, limit, totalPages, totalItems, nextPage, previousPage } = data;
  paginationState.currentPage = page;
  paginationState.currentPageItems = limit;
  paginationState.nextPage = nextPage;
  paginationState.previousPage = previousPage;
  paginationState.totalItems = totalItems;
  paginationState.totalPages = totalPages;
    console.log(previousPage, "prev");
    pageNum.innerHTML = page;

  if (!previousPage) {
    prevPageButton.disabled = true;
  } else {
      prevPageButton.disabled = false;
    }
    if (!nextPage) {
        nextPageButton.disabled = true;
    } else {
        nextPageButton.disabled = false;
    }
    
};

const renderBooksToHtml = (data) => {
  booksDiv.innerHTML = "";
  data?.map((book) => {
    const { volumeInfo } = book;
    console.log(volumeInfo);

    const bookCard = document.createElement("div");
    bookCard.className = "book-card";

    bookCard.innerHTML = `
        <img src="${volumeInfo?.imageLinks?.smallThumbnail}" alt="${volumeInfo?.title}">
        <p class="book-title">${volumeInfo?.title}</p>
        <p class="book-publisher">${volumeInfo?.publisher}</p>
        <p class="book-publish-date">${volumeInfo?.publishedDate}</p>
        
        `;

    bookCard.addEventListener("click", () => {
      window.open(volumeInfo?.infoLink);
    });
    booksDiv.append(bookCard);
  });
};

const goToPrevPage = () => {
    if (paginationState.currentPage >1) {
        paginationState.currentPage--;
        fetchAllBooks();
    }
}
const goToNextPage = () => {
     if (paginationState.currentPage < paginationState.totalPages) {
         paginationState.currentPage++;
         fetchAllBooks();
     }
}


fetchAllBooks();
