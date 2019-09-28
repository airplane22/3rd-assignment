window.onload = async () => {
	const app = document.querySelector("#app");
	const loading = document.createElement("p");
	loading.innerText = "Loading...";
	app.appendChild(loading);
	const cardContainer = document.createElement("div");
	cardContainer.classList.add('cardContainer');
	app.appendChild(cardContainer);
	const main = async () => {
		const {
			data: {
				data: { movies: data }
			}
		} = await axios.get(
			"https://yts.lt/api/v2/list_movies.json?sort_by=download_count"
		);
		console.log(data);
        data.forEach(function (moviedata) {
            const listCard = document.createElement("div");
            listCard.classList.add('listCard');

            const imgCol = document.createElement("div");
            imgCol.classList.add('imgCol');
            const detailCol = document.createElement("div");
            detailCol.classList.add('detailCol');

            const listTitle = document.createElement("h1");
            const listImg = document.createElement("img");
            const listDesc = document.createElement("p");
            const listGenres = document.createElement("div");
            listGenres.classList.add('listGenres');


            listTitle.innerText = moviedata.title;
            listImg.src = moviedata.large_cover_image;
            moviedata.genres.forEach((item) => {
                const genreSpan = document.createElement("span");
                genreSpan.innerText = `${item}`;
                listGenres.append(genreSpan);
            });
            listDesc.innerText = moviedata.summary.slice(0,25) + '...';

            imgCol.appendChild(listImg);
            detailCol.appendChild(listTitle);
            detailCol.appendChild(listGenres);
            detailCol.appendChild(listDesc);

            listCard.appendChild(imgCol);
            listCard.appendChild(detailCol);
            cardContainer.appendChild(listCard);


            listCard.style.cursor = 'pointer';
            listCard.onclick = function() {
                listCard.style.backgroundColor = "dodgerblue";
                location.href = "index.html?id="+moviedata.id;
            };
        });

		app.removeChild(loading);
	};
	await main();
};
